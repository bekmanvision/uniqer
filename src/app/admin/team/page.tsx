'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
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
    if (!confirm('Удалить сотрудника?')) return

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
            <h2 className="text-lg font-semibold text-gray-900">Доступ ограничен</h2>
            <p className="text-gray-500 mt-2">
              Только администраторы могут управлять командой
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
          <h1 className="text-2xl font-bold text-gray-900">Команда</h1>
          <p className="text-sm text-gray-500">Управление доступом к CRM</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить сотрудника
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Администраторы</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Полный доступ. Вход по email и паролю.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Менеджеры</h3>
                <p className="text-sm text-gray-500 mt-1">
                  CRM доступ. Вход по паролю или Google.
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
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-sm text-gray-500">
                  <th className="px-6 py-3 font-medium">Сотрудник</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Роль</th>
                  <th className="px-6 py-3 font-medium">Добавлен</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          member.role === 'SUPER_ADMIN' ? 'bg-purple-100' : 'bg-blue-100'
                        }`}>
                          <UserCircle className={`h-5 w-5 ${
                            member.role === 'SUPER_ADMIN' ? 'text-purple-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <span className="font-medium text-gray-900">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {member.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={member.role === 'SUPER_ADMIN' ? 'warning' : 'info'}>
                        {member.role === 'SUPER_ADMIN' ? 'Администратор' : 'Менеджер'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(member.createdAt)}
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
        setError(data.error || 'Ошибка при добавлении')
      }
    } catch (err) {
      setError('Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Новый сотрудник</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="ФИО *"
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
            label="Роль *"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: 'MANAGER', label: 'Менеджер' },
              { value: 'SUPER_ADMIN', label: 'Администратор' },
            ]}
          />

          <Input
            label="Пароль *"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Минимум 6 символов"
            required
          />

          <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
            {formData.role === 'MANAGER' ? (
              <>
                <strong>Менеджер:</strong> Может войти по email/паролю или через Google.
              </>
            ) : (
              <>
                <strong>Администратор:</strong> Полный доступ к системе. Вход по email/паролю.
              </>
            )}
          </div>

          {error && (
            <div className="bg-red-50 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Добавление...' : 'Добавить'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
