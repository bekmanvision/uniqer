'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Button, Select, Badge, Modal } from '@/components/ui'
import { formatDate, getStatusColor } from '@/lib/utils'
import { Download, Phone, Mail, MapPin, GraduationCap, Calendar, Tag, Trash2, X } from 'lucide-react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import type { ApplicationWithTour } from '@/types'

const STATUSES = ['NEW', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const

// ─── Droppable Column ───────────────────────────────────────
function KanbanColumn({
  status,
  label,
  applications,
  onCardClick,
  colorClass,
}: {
  status: string
  label: string
  applications: ApplicationWithTour[]
  onCardClick: (app: ApplicationWithTour) => void
  colorClass: string
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status })
  const t = useTranslations('admin')

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-xl border transition-colors ${
        isOver
          ? 'border-blue-400 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/30'
          : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center gap-2 px-3 py-3">
        <span className={`h-2.5 w-2.5 rounded-full ${colorClass}`} />
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</h3>
        <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {applications.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-2 overflow-y-auto px-2 pb-2" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        {applications.length === 0 ? (
          <p className="px-2 py-8 text-center text-xs text-gray-400 dark:text-gray-500">
            {t('noApplicationsInColumn')}
          </p>
        ) : (
          applications.map((app) => (
            <DraggableCard key={app.id} app={app} onClick={() => onCardClick(app)} />
          ))
        )}
      </div>
    </div>
  )
}

// ─── Draggable Card ─────────────────────────────────────────
function DraggableCard({ app, onClick }: { app: ApplicationWithTour; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: app.id,
    data: { app },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${isDragging ? 'opacity-30' : ''}`}
    >
      <ApplicationCard app={app} onClick={onClick} />
    </div>
  )
}

// ─── Card Content (reused in DragOverlay) ───────────────────
function ApplicationCard({ app, onClick }: { app: ApplicationWithTour; onClick?: () => void }) {
  const tr = useTranslations('roles')
  const locale = useLocale()

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:border-gray-600 dark:bg-gray-900"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{app.name}</p>
        <Badge variant="default" className="shrink-0 text-[10px]">{tr(app.role)}</Badge>
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        <Phone className="mr-1 inline h-3 w-3" />
        {app.phone}
      </p>
      {app.tour && (
        <p className="mt-1 truncate text-xs text-blue-600 dark:text-blue-400">
          {app.tour.title}
        </p>
      )}
      <p className="mt-1.5 text-[10px] text-gray-400 dark:text-gray-500">
        {formatDate(app.createdAt, locale)}
      </p>
    </div>
  )
}

// ─── Detail Modal ───────────────────────────────────────────
function ApplicationDetailModal({
  app,
  onClose,
  onStatusChange,
  onDelete,
}: {
  app: ApplicationWithTour
  onClose: () => void
  onStatusChange: (id: string, status: string) => void
  onDelete: (id: string) => void
}) {
  const t = useTranslations('admin')
  const ts = useTranslations('statuses')
  const tr = useTranslations('roles')
  const locale = useLocale()
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <Modal isOpen onClose={onClose} title={t('applicationDetail')} size="lg">
      <div className="space-y-5">
        {/* Name + badges */}
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{app.name}</h2>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(app.status)}`}>
            {ts(app.status)}
          </span>
          <Badge variant="default">{tr(app.role)}</Badge>
          <Badge variant="info">{t(`applicationType_${app.type}`)}</Badge>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            {t('contactInfo')}
          </h4>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href={`tel:${app.phone}`} className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              <Phone className="h-4 w-4" /> {app.phone}
            </a>
            {app.email && (
              <a href={`mailto:${app.email}`} className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                <Mail className="h-4 w-4" /> {app.email}
              </a>
            )}
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {app.city && (
            <div>
              <span className="text-xs text-gray-400 dark:text-gray-500">{t('cityLabel')}</span>
              <p className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                <MapPin className="h-3.5 w-3.5" /> {app.city}
              </p>
            </div>
          )}
          {app.grade && (
            <div>
              <span className="text-xs text-gray-400 dark:text-gray-500">{t('gradeLabel')}</span>
              <p className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                <GraduationCap className="h-3.5 w-3.5" /> {app.grade}
              </p>
            </div>
          )}
          {app.source && (
            <div>
              <span className="text-xs text-gray-400 dark:text-gray-500">{t('sourceLabel')}</span>
              <p className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                <Tag className="h-3.5 w-3.5" /> {app.source}
              </p>
            </div>
          )}
        </div>

        {/* Tour info */}
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            {t('tourInfo')}
          </h4>
          {app.tour ? (
            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
              <p className="font-medium text-gray-900 dark:text-gray-100">{app.tour.title}</p>
              {app.tour.city && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="mr-1 inline h-3.5 w-3.5" />
                  {app.tour.city}
                </p>
              )}
              {app.tour.startDate && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="mr-1 inline h-3.5 w-3.5" />
                  {formatDate(app.tour.startDate, locale)}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500">{t('noTourLinked')}</p>
          )}
        </div>

        {/* Message */}
        {app.message && (
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
              {t('messageLabel', { message: '' }).replace(': ', '')}
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{app.message}</p>
          </div>
        )}

        {/* Dates */}
        <div className="flex gap-6 border-t border-gray-100 pt-3 text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
          <span>
            <Calendar className="mr-1 inline h-3 w-3" />
            {t('createdAtLabel')}: {formatDate(app.createdAt, locale)}
          </span>
          <span>
            {t('updatedAtLabel')}: {formatDate(app.updatedAt, locale)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
          <Select
            value={app.status}
            onChange={(e) => onStatusChange(app.id, e.target.value)}
            options={STATUSES.map((s) => ({ value: s, label: ts(s) }))}
            className="w-[180px] shrink-0"
          />

          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red-600 dark:text-red-400">{t('confirmDeleteApplication')}</span>
              <Button variant="danger" size="sm" onClick={() => onDelete(app.id)}>
                {t('deleteApplication')}
              </Button>
              <button onClick={() => setConfirmDelete(false)} className="rounded p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(true)}>
              <Trash2 className="mr-1.5 h-4 w-4" />
              {t('deleteApplication')}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

// ─── Main Page ──────────────────────────────────────────────
export default function AdminApplicationsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [applications, setApplications] = useState<ApplicationWithTour[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState<ApplicationWithTour | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const t = useTranslations('admin')
  const ts = useTranslations('statuses')
  const tc = useTranslations('common')
  const locale = useLocale()

  const role = searchParams.get('role') || ''
  const type = searchParams.get('type') || ''

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  useEffect(() => {
    fetchApplications()
  }, [role, type])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (role) params.set('role', role)
      if (type) params.set('type', type)
      params.set('pageSize', '200')

      const res = await fetch(`/api/applications?${params}`)
      const data = await res.json()
      if (data.success) {
        setApplications(data.data)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/admin/applications?${params}`)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    // Optimistic update
    setApplications((apps) =>
      apps.map((app) =>
        app.id === id ? { ...app, status: newStatus as ApplicationWithTour['status'] } : app
      )
    )
    // Also update selected modal app
    setSelectedApp((prev) =>
      prev && prev.id === id ? { ...prev, status: newStatus as ApplicationWithTour['status'] } : prev
    )

    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) {
        // Revert on failure
        fetchApplications()
      }
    } catch {
      fetchApplications()
    }
  }

  const deleteApplication = async (id: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setApplications((apps) => apps.filter((a) => a.id !== id))
        setSelectedApp(null)
      }
    } catch (error) {
      console.error('Error deleting application:', error)
    }
  }

  const exportCSV = () => {
    const params = new URLSearchParams()
    if (role) params.set('role', role)
    if (type) params.set('type', type)
    window.open(`/api/export/applications?${params}`, '_blank')
  }

  // Group applications by status
  const columns = useMemo(() => {
    const grouped: Record<string, ApplicationWithTour[]> = {}
    for (const s of STATUSES) grouped[s] = []
    for (const app of applications) {
      if (grouped[app.status]) grouped[app.status].push(app)
    }
    return grouped
  }, [applications])

  const columnColors: Record<string, string> = {
    NEW: 'bg-blue-500',
    CONTACTED: 'bg-yellow-500',
    CONFIRMED: 'bg-green-500',
    COMPLETED: 'bg-gray-400',
    CANCELLED: 'bg-red-500',
  }

  const columnLabels: Record<string, string> = {
    NEW: t('newStatus'),
    CONTACTED: t('contactedStatus'),
    CONFIRMED: t('confirmedStatus'),
    COMPLETED: t('completedStatus'),
    CANCELLED: t('cancelledStatus'),
  }

  // DnD handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over) return

    const appId = active.id as string
    const newStatus = over.id as string

    // Check if it's a valid status column
    if (!STATUSES.includes(newStatus as typeof STATUSES[number])) return

    // Find the app
    const app = applications.find((a) => a.id === appId)
    if (!app || app.status === newStatus) return

    updateStatus(appId, newStatus)
  }

  const activeApp = activeId ? applications.find((a) => a.id === activeId) : null

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('applications')}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">{tc('total', { count: applications.length })}</p>
        </div>
        <Button variant="outline" onClick={exportCSV}>
          <Download className="mr-2 h-4 w-4" />
          {t('exportCSV')}
        </Button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
        <select
          value={role}
          onChange={(e) => updateFilter('role', e.target.value)}
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
          <option value="">{t('allRoles')}</option>
          <option value="STUDENT">{t('studentsRole')}</option>
          <option value="PARENT">{t('parentsRole')}</option>
          <option value="SCHOOL">{t('schoolsRole')}</option>
          <option value="OTHER">{t('otherRole')}</option>
        </select>
        <select
          value={type}
          onChange={(e) => updateFilter('type', e.target.value)}
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
          <option value="">{t('allTypes')}</option>
          <option value="TOUR">{t('toursType')}</option>
          <option value="B2B">{t('b2bType')}</option>
          <option value="CONTACT">{t('contactsType')}</option>
        </select>
      </div>

      {/* Kanban Board */}
      {loading ? (
        <div className="mt-8 flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
            {STATUSES.map((status) => (
              <KanbanColumn
                key={status}
                status={status}
                label={columnLabels[status]}
                applications={columns[status]}
                onCardClick={setSelectedApp}
                colorClass={columnColors[status]}
              />
            ))}
          </div>

          <DragOverlay>
            {activeApp ? (
              <div className="w-72 rotate-2 opacity-90">
                <ApplicationCard app={activeApp} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* Detail Modal */}
      {selectedApp && (
        <ApplicationDetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onStatusChange={updateStatus}
          onDelete={deleteApplication}
        />
      )}
    </div>
  )
}
