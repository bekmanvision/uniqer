'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslations, useLocale } from 'next-intl'
import { Button, Card, CardContent, Input, Select, Badge } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import {
  Plus,
  Trash2,
  UserCircle,
  Shield,
  Users,
  Mail,
  Calendar,
} from 'lucide-react'

interface TeamMember {
  id: string
  email: string
  name: string
  role: 'SUPER_ADMIN' | 'MANAGER'
  createdAt: string
}

export default function AdminTeamPage() {
  const { data: session } = useSession()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const t = useTranslations('admin')
  const tc = useTranslations('common')
  const locale = useLocale()

  // Only SUPER_ADMIN can access this page
  const isSuperAdmin = session?.user?.role === 'SUPER_ADMIN'

  useEffect(() => {
    if (isSuperAdmin) {
      fetchMembers()
    }
  }, [isSuperAdmin])

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/team')
      const data = await res.json()
      if (data.success) {
        setMembers(data.data)
      }
    } catch (error) {
      console.error('Error fetching team:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteMember = async (id: string) => {
    if (!confirm(t('deleteEmployeeConfirm'))) return

    try {
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMembers(members.filter(m => m.id !== id))
      }
    } catch (error) {
      console.error('Error deleting member:', error)
    }
  }

  if (!isSuperAdmin) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('teamAccessRestricted')}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {t('teamAccessRestrictedDesc')}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('team')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('manageAccess')}</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('addEmployee')}
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{t('adminsCard')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('adminsCardDesc')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{t('managersCard')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('managersCardDesc')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-3 font-medium">{t('employee')}</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">{t('role')}</th>
                  <th className="px-6 py-3 font-medium">{t('addedAt')}</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          member.role === 'SUPER_ADMIN' ? 'bg-purple-100' : 'bg-blue-100'
                        }`}>
                          <UserCircle className={`h-5 w-5 ${
                            member.role === 'SUPER_ADMIN' ? 'text-purple-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="h-4 w-4" />
                        {member.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={member.role === 'SUPER_ADMIN' ? 'warning' : 'info'}>
                        {member.role === 'SUPER_ADMIN' ? t('superAdmin') : t('manager')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(member.createdAt, locale)}
                    </td>
                    <td className="px-6 py-4">
                      {member.id !== session?.user?.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMember(member.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false)
            fetchMembers()
          }}
        />
      )}
    </div>
  )
}

function AddMemberModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'MANAGER',
    password: '',
  })
  const t = useTranslations('admin')
  const tc = useTranslations('common')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success) {
        onSuccess()
      } else {
        setError(data.error || 'Error')
      }
    } catch (err) {
      setError('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-xl">
        <div className="border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold dark:text-gray-100">{t('newEmployee')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label={`${t('fullName')} *`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Иван Иванов"
            required
          />

          <Input
            label="Email *"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ivan@gmail.com"
            required
          />

          <Select
            label={`${t('role')} *`}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: 'MANAGER', label: t('manager') },
              { value: 'SUPER_ADMIN', label: t('superAdmin') },
            ]}
          />

          <Input
            label={`${t('login.password')} *`}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder={t('passwordMin')}
            required
          />

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-sm text-blue-700 dark:text-blue-400">
            {formData.role === 'MANAGER' ? (
              <>
                <strong>{t('manager')}:</strong> {t('managersCardDesc')}
              </>
            ) : (
              <>
                <strong>{t('superAdmin')}:</strong> {t('adminsCardDesc')}
              </>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t('adding') : tc('add')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
