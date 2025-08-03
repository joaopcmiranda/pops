import type { Editor } from '@tiptap/react'
import type { ContentItem } from '../../services/contentService'

export interface ContentEditorProps {
  initialContent?: string
  placeholder?: string
  editable?: boolean
  autoFocus?: boolean
  className?: string
  onUpdate?: (content: string) => void
  onSave?: (content: string) => void
  contentType?: ContentType
}

export interface ContentEditorProviderProps {
  children: React.ReactNode
  initialContent?: ContentItem | null
  category: string
  slug?: string
  onSave?: (content: ContentItem) => Promise<void>
  onError?: (error: Error) => void
  autoSave?: boolean
  autoSaveDelay?: number
}

export interface ContentEditorContextValue {
  editor: Editor | null
  content: ContentItem | null
  isLoading: boolean
  isSaving: boolean
  isDirty: boolean
  error: Error | null
  save: () => Promise<void>
  discard: () => void
  updateContent: (updates: Partial<ContentItem>) => void
}

export interface ContentToolbarProps {
  editor: Editor | null
  variant?: 'floating' | 'fixed' | 'bubble'
  showAdvanced?: boolean
  contentType?: ContentType
}

export interface ContentEditorModalProps {
  isOpen: boolean
  onClose: () => void
  contentItem?: ContentItem | null
  category: string
  slug?: string
  title?: string
  onSave?: (content: ContentItem) => Promise<void>
}

export type ContentType =
  | 'destinations'
  | 'itinerary'
  | 'transport'
  | 'accommodation'
  | 'activities'
  | 'budget'
  | 'documents'

export interface EditorCommand {
  name: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  action: (editor: Editor) => void
  isActive?: (editor: Editor) => boolean
  isDisabled?: (editor: Editor) => boolean
  shortcut?: string
}

export interface EditorToolbarGroup {
  name: string
  commands: EditorCommand[]
}

export interface ContentTemplate {
  id: string
  name: string
  description: string
  content: string
  contentType: ContentType
}
