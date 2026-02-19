'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Button, Card, CardContent, Select, Input, Badge } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import {
  Phone,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  GraduationCap,
  Search,
  Trash2,
  MoreVertical,
  Mail,
  Calendar,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  LayoutGrid,
  List,
  Download,
  RefreshCw,
} from 'lucide-react'

interface Student {
  id: string
  fullName: string
  phone: string
  city: string
  school: string
  grade: string
  age: number
  language: string
  direction: string
  preferredUnis: string | null
  parentName: string
  parentPhone: string
  parentPhoneBackup: string | null
  contactParent: string
  allergies: string | null
  travelExperience: boolean
  tourId: string | null
  status: string
  notes: string | null
  createdAt: string
}

const statusOrder = ['REGISTERED', 'CONFIRMED', 'PAID', 'COMPLETED', 'CANCELLED']

// Phone formatting function
function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '')
  let formatted = '+7'
  if (digits.length > 1) formatted += ' (' + digits.substring(1, 4)
  if (digits.length >= 4) formatted += ') ' + digits.substring(4, 7)
  if (digits.length >= 7) formatted += '-' + digits.substring(7, 9)
  if (digits.length >= 9) formatted += '-' + digits.substring(9, 11)
  return formatted
}

function useStatusConfig() {
  const t = useTranslations('admin.studentStatuses')
  return {
    REGISTERED: { label: t('REGISTERED'), color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: Clock },
    CONFIRMED: { label: t('CONFIRMED'), color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: CheckCircle },
    PAID: { label: t('PAID'), color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: CheckCircle },
    COMPLETED: { label: t('COMPLETED'), color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', icon: CheckCircle },
    CANCELLED: { label: t('CANCELLED'), color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: XCircle },
  } as Record<string, { label: string; color: string; bg: string; icon: React.ElementType }>
}

export default function AdminStudentsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')

  const t = useTranslations('admin')
  const tc = useTranslations('common')
  const locale = useLocale()
  const statusConfig = useStatusConfig()

  const status = searchParams.get('status') || ''
  const city = searchParams.get('city') || ''
  const grade = searchParams.get('grade') || ''
  const page = parseInt(searchParams.get('page') || '1')

  useEffect(() => {
    fetchStudents()
  }, [status, city, grade, page, searchQuery])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (status) params.set('status', status)
      if (city) params.set('city', city)
      if (grade) params.set('grade', grade)
      if (searchQuery) params.set('search', searchQuery)
      params.set('page', String(page))
      params.set('pageSize', '100')

      const res = await fetch(`/api/students?${params}`)
      const data = await res.json()
      if (data.success) {
        setStudents(data.data)
        setTotal(data.total)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.delete('page')
    router.push(`/admin/students?${params}`)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setStudents(students => students.map(s => (s.id === id ? { ...s, status: newStatus } : s)))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteStudent = async (id: string) => {
    if (!confirm(t('deleteStudentConfirm'))) return
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setStudents(students => students.filter(s => s.id !== id))
        setTotal(t => t - 1)
        setSelectedStudent(null)
      }
    } catch (error) {
      console.error('Error deleting student:', error)
    }
  }

  const getStudentsByStatus = (statusKey: string) => {
    return students.filter(s => s.status === statusKey)
  }

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('students')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('records', { count: total })}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={fetchStudents}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <div className="flex border dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 ${viewMode === 'kanban' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addStudent')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div
        className="pb-4 border-b dark:border-gray-700"
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', gap: '10px' }}
      >
        <div style={{ position: 'relative', flex: '1 1 0%', minWidth: 0 }}>
          <Search
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }}
          />
          <input
            type="text"
            placeholder={t('searchStudents')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '38px',
              paddingLeft: '38px',
              paddingRight: '12px',
              fontSize: '14px',
              borderRadius: '10px',
              border: '1px solid var(--filter-border, #e5e7eb)',
              backgroundColor: 'var(--filter-bg, #ffffff)',
              color: 'var(--filter-text, #374151)',
              outline: 'none',
            }}
            className="dark:[--filter-border:#374151] dark:[--filter-bg:#111827] dark:[--filter-text:#e5e7eb] focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>
        <select
          value={grade}
          onChange={(e) => updateFilter('grade', e.target.value)}
          style={{
            height: '38px',
            padding: '0 32px 0 12px',
            fontSize: '14px',
            borderRadius: '10px',
            border: '1px solid var(--filter-border, #e5e7eb)',
            backgroundColor: 'var(--filter-bg, #ffffff)',
            color: 'var(--filter-text, #374151)',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
            backgroundSize: '14px',
            backgroundPosition: 'right 10px center',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer',
            flexShrink: 0,
            outline: 'none',
          }}
          className="dark:[--filter-border:#374151] dark:[--filter-bg:#111827] dark:[--filter-text:#e5e7eb] focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        >
          <option value="">{t('allGrades')}</option>
          <option value="8">8 класс</option>
          <option value="9">9 класс</option>
          <option value="10">10 класс</option>
          <option value="11">11 класс</option>
          <option value="12">12 класс</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : viewMode === 'kanban' ? (
        /* Kanban View */
        <div className="flex-1 overflow-x-auto pt-4">
          <div className="flex gap-4 h-full min-w-max pb-4">
            {statusOrder.map((statusKey) => {
              const config = statusConfig[statusKey]
              const statusStudents = getStudentsByStatus(statusKey)
              const StatusIcon = config.icon

              return (
                <div key={statusKey} className="w-80 flex-shrink-0 flex flex-col">
                  {/* Column Header */}
                  <div className={`rounded-t-lg px-3 py-2 border-2 ${config.bg}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${config.color}`} />
                        <span className={`font-medium ${config.color}`}>{config.label}</span>
                      </div>
                      <span className={`text-sm font-medium ${config.color}`}>{statusStudents.length}</span>
                    </div>
                  </div>

                  {/* Column Content */}
                  <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-b-lg border-2 border-t-0 border-gray-200 dark:border-gray-700 p-2 space-y-2">
                    {statusStudents.map((student) => (
                      <StudentCard
                        key={student.id}
                        student={student}
                        onClick={() => setSelectedStudent(student)}
                        onStatusChange={updateStatus}
                      />
                    ))}
                    {statusStudents.length === 0 && (
                      <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                        {t('noStudents')}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="flex-1 overflow-auto pt-4">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
                <th className="px-4 py-3 font-medium">{t('employee')}</th>
                <th className="px-4 py-3 font-medium">{t('studentPhone')}</th>
                <th className="px-4 py-3 font-medium">{t('studentSchool')}</th>
                <th className="px-4 py-3 font-medium">{t('studentDirection')}</th>
                <th className="px-4 py-3 font-medium">{t('role')}</th>
                <th className="px-4 py-3 font-medium">{t('addedAt')}</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{student.fullName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{student.grade} класс • {student.age} лет</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{student.phone}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{student.parentName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{student.school}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{student.city}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="info">{student.direction}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[student.status].bg} ${statusConfig[student.status].color}`}>
                      {statusConfig[student.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(student.createdAt, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Student Detail Sidebar */}
      {selectedStudent && (
        <StudentDetailSidebar
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onStatusChange={updateStatus}
          onDelete={deleteStudent}
          onUpdate={(updated) => {
            setStudents(students => students.map(s => s.id === updated.id ? updated : s))
            setSelectedStudent(updated)
          }}
        />
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false)
            fetchStudents()
          }}
        />
      )}
    </div>
  )
}

// Student Card for Kanban
function StudentCard({
  student,
  onClick,
  onStatusChange,
}: {
  student: Student
  onClick: () => void
  onStatusChange: (id: string, status: string) => void
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">{student.fullName}</div>
        <Badge variant="info" className="text-[10px] px-1.5 py-0.5">{student.grade}кл</Badge>
      </div>

      <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <Phone className="h-3 w-3" />
          <span>{student.phone}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GraduationCap className="h-3 w-3" />
          <span>{student.school}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3" />
          <span>{student.city}</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t dark:border-gray-700 flex items-center justify-between">
        <span className="text-[10px] text-gray-400 dark:text-gray-500">{new Date(student.createdAt).toLocaleDateString('ru')}</span>
        <Badge variant="default" className="text-[10px]">{student.direction}</Badge>
      </div>
    </div>
  )
}

// Student Detail Sidebar
function StudentDetailSidebar({
  student,
  onClose,
  onStatusChange,
  onDelete,
  onUpdate,
}: {
  student: Student
  onClose: () => void
  onStatusChange: (id: string, status: string) => void
  onDelete: (id: string) => void
  onUpdate: (student: Student) => void
}) {
  const [notes, setNotes] = useState(student.notes || '')
  const [saving, setSaving] = useState(false)
  const t = useTranslations('admin')
  const tc = useTranslations('common')
  const locale = useLocale()
  const statusConfig = useStatusConfig()

  const saveNotes = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/students/${student.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })
      if (res.ok) {
        const data = await res.json()
        onUpdate({ ...student, notes })
      }
    } catch (error) {
      console.error('Error saving notes:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{student.fullName}</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => onDelete(student.id)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Pipeline */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">{t('role')}</label>
            <div className="flex gap-1">
              {statusOrder.slice(0, -1).map((statusKey) => {
                const config = statusConfig[statusKey]
                const isActive = student.status === statusKey
                const isPast = statusOrder.indexOf(student.status) > statusOrder.indexOf(statusKey)

                return (
                  <button
                    key={statusKey}
                    onClick={() => onStatusChange(student.id, statusKey)}
                    className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
                      isActive
                        ? `${config.bg} ${config.color} border-2`
                        : isPast
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {config.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Student Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <User className="h-4 w-4" />
              {t('studentData')}
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">{t('studentPhone')}:</span>
                <a href={`tel:${student.phone}`} className="block text-blue-600 hover:underline">{student.phone}</a>
              </div>
              <div>
                <span className="text-gray-500">{t('studentAge')}:</span>
                <p>{student.age} лет</p>
              </div>
              <div>
                <span className="text-gray-500">{t('studentGrade')}:</span>
                <p>{student.grade} класс</p>
              </div>
              <div>
                <span className="text-gray-500">{t('studentLanguage')}:</span>
                <p>{student.language}</p>
              </div>
              <div>
                <span className="text-gray-500">{t('studentCity')}:</span>
                <p>{student.city}</p>
              </div>
              <div>
                <span className="text-gray-500">{t('studentSchool')}:</span>
                <p>{student.school}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">{t('studentDirection')}:</span>
                <p><Badge variant="info">{student.direction}</Badge></p>
              </div>
              {student.preferredUnis && (
                <div className="col-span-2">
                  <span className="text-gray-500">{t('preferredUnis')}:</span>
                  <p>{student.preferredUnis}</p>
                </div>
              )}
            </div>
          </div>

          {/* Parent Info */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {t('whoIsContact')} ({student.contactParent})
            </h3>
            <div className="text-sm space-y-2">
              <div>
                <span className="text-gray-500">{t('parentFullName')}:</span>
                <p className="font-medium">{student.parentName}</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-gray-500">{t('mainPhone')}:</span>
                  <a href={`tel:${student.parentPhone}`} className="block text-blue-600 hover:underline font-medium">
                    {student.parentPhone}
                  </a>
                </div>
                {student.parentPhoneBackup && (
                  <div>
                    <span className="text-gray-500">{t('backupPhone')}:</span>
                    <a href={`tel:${student.parentPhoneBackup}`} className="block text-blue-600 hover:underline">
                      {student.parentPhoneBackup}
                    </a>
                  </div>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <a
                  href={`https://wa.me/${student.parentPhone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600"
                >
                  <Phone className="h-3 w-3" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${student.parentPhone}`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600"
                >
                  <Phone className="h-3 w-3" />
                  Позвонить
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {t('additional')}
            </h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">{t('travelExperience')}:</span>
                <span className={student.travelExperience ? 'text-green-600' : 'text-gray-400'}>
                  {student.travelExperience ? tc('yes') : tc('no')}
                </span>
              </div>
              {student.allergies && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-2 rounded">
                  <span className="font-medium">{t('allergies')}:</span> {student.allergies}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">{t('notes')}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 px-3 py-2 text-sm min-h-[100px]"
              placeholder={t('notesPlaceholder')}
            />
            <Button
              size="sm"
              className="mt-2"
              onClick={saveNotes}
              disabled={saving || notes === student.notes}
            >
              {saving ? t('saving') : t('saveNotes')}
            </Button>
          </div>

          {/* Timeline */}
          <div className="text-xs text-gray-400 dark:text-gray-500 pt-4 border-t dark:border-gray-700">
            {t('created')} {formatDate(student.createdAt, locale)}
          </div>
        </div>
      </div>
    </div>
  )
}

// Add Student Modal
function AddStudentModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+7',
    city: '',
    school: '',
    grade: '',
    age: '',
    language: 'русский',
    direction: '',
    preferredUnis: '',
    parentName: '',
    parentPhone: '+7',
    parentPhoneBackup: '',
    contactParent: 'мама',
    allergies: '',
    travelExperience: false,
    notes: '',
  })

  const t = useTranslations('admin')
  const tc = useTranslations('common')

  const handlePhoneChange = (field: 'phone' | 'parentPhone' | 'parentPhoneBackup', value: string) => {
    const formatted = formatPhoneNumber(value)
    setFormData({ ...formData, [field]: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        onSuccess()
      } else {
        const data = await res.json()
        alert(data.error || 'Error')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white dark:bg-gray-900 shadow-xl">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold dark:text-gray-100">{t('newStudent')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Data */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              {t('studentData')}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={`${t('studentFullName')} *`}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
              <Input
                label={`${t('studentPhone')} *`}
                value={formData.phone}
                onChange={(e) => handlePhoneChange('phone', e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
              />
              <Input
                label={`${t('studentCity')} *`}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
              <Input
                label={`${t('studentSchool')} *`}
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                required
              />
              <Select
                label={`${t('studentGrade')} *`}
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                options={[
                  { value: '', label: tc('search') },
                  { value: '8', label: '8 класс' },
                  { value: '9', label: '9 класс' },
                  { value: '10', label: '10 класс' },
                  { value: '11', label: '11 класс' },
                  { value: '12', label: '12 класс' },
                ]}
                required
              />
              <Input
                label={`${t('studentAge')} *`}
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
              <Select
                label={`${t('studentLanguage')} *`}
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                options={[
                  { value: 'русский', label: t('languages.russian') },
                  { value: 'казахский', label: t('languages.kazakh') },
                ]}
                required
              />
              <Select
                label={`${t('studentDirection')} *`}
                value={formData.direction}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                options={[
                  { value: '', label: tc('search') },
                  { value: 'IT', label: t('directions.it') },
                  { value: 'Инженерия', label: t('directions.engineering') },
                  { value: 'Медицина', label: t('directions.medicine') },
                  { value: 'Бизнес', label: t('directions.business') },
                  { value: 'Гуманитарные', label: t('directions.humanities') },
                  { value: 'Право', label: t('directions.law') },
                  { value: 'Другое', label: t('directions.other') },
                ]}
                required
              />
              <Input
                label={t('preferredUnis')}
                value={formData.preferredUnis}
                onChange={(e) => setFormData({ ...formData, preferredUnis: e.target.value })}
                className="sm:col-span-2"
              />
            </div>
          </div>

          {/* Parent Data */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {t('parentData')}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={`${t('parentFullName')} *`}
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                required
              />
              <Select
                label={`${t('whoIsContact')} *`}
                value={formData.contactParent}
                onChange={(e) => setFormData({ ...formData, contactParent: e.target.value })}
                options={[
                  { value: 'мама', label: t('contactParents.mom') },
                  { value: 'папа', label: t('contactParents.dad') },
                  { value: 'брат', label: t('contactParents.brother') },
                  { value: 'сестра', label: t('contactParents.sister') },
                  { value: 'бабушка', label: t('contactParents.grandma') },
                  { value: 'дедушка', label: t('contactParents.grandpa') },
                  { value: 'родственник', label: t('contactParents.relative') },
                  { value: 'опекун', label: t('contactParents.guardian') },
                ]}
                required
              />
              <Input
                label={`${t('mainPhone')} *`}
                value={formData.parentPhone}
                onChange={(e) => handlePhoneChange('parentPhone', e.target.value)}
                placeholder="+7 (___) ___-__-__"
                required
              />
              <Input
                label={t('backupPhone')}
                value={formData.parentPhoneBackup}
                onChange={(e) => handlePhoneChange('parentPhoneBackup', e.target.value)}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
          </div>

          {/* Additional */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {t('additional')}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={t('allergies')}
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                placeholder={t('allergiesPlaceholder')}
              />
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="travelExperience"
                  checked={formData.travelExperience}
                  onChange={(e) => setFormData({ ...formData, travelExperience: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-700"
                />
                <label htmlFor="travelExperience" className="text-sm text-gray-700 dark:text-gray-300">
                  {t('travelExperience')}
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t dark:border-gray-700">
            <Button type="button" variant="ghost" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t('saving') : t('addStudentBtn')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
