import React, { useState } from 'react'
import { EditorContent } from '@tiptap/react'
import { Button } from '@pops/ui'
import { Edit3, Save, X, Loader2 } from 'lucide-react'
import { ContentEditorProvider } from './ContentEditorProvider'
import { useContentEditor } from './hooks/useContentEditor'
import ContentToolbar from './ContentToolbar'
import { cn } from '../../lib/utils'
import type { ContentItem } from '../../services/contentService'

interface InlineContentEditorProps {
  contentItem: ContentItem
  category: string
  onSave?: (content: ContentItem) => Promise<void>
  onCancel?: () => void
  className?: string
  showToolbar?: boolean
  placeholder?: string
}

interface EditorWrapperProps {
  onSave?: () => void
  onCancel?: () => void
  showToolbar?: boolean
  placeholder?: string
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({
  onSave,
  onCancel,
  showToolbar = true,
  placeholder = 'Click to start editing...',
}) => {
  const { editor, content, isLoading, isSaving, isDirty, error, save } = useContentEditor({
    placeholder,
    autoFocus: true,
  })

  const handleSave = async () => {
    try {
      await save()
      onSave?.()
    } catch (error) {
      console.error('Failed to save content:', error)
    }
  }

  const handleCancel = () => {
    if (editor) {
      // Reset content to original
      editor.commands.setContent(content?.content || '')
    }
    onCancel?.()
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <Loader2 className='h-6 w-6 animate-spin text-blue-500' />
        <span className='ml-2 text-gray-600'>Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='py-8 text-center'>
        <div className='text-red-500 mb-2'>Failed to load editor</div>
        <div className='text-sm text-gray-600'>{error.message}</div>
      </div>
    )
  }

  return (
    <div className='relative' data-testid='inline-content-editor'>
      {/* Toolbar */}
      {showToolbar && (
        <div className='mb-2'>
          <ContentToolbar editor={editor} variant='bubble' showAdvanced={false} />
        </div>
      )}

      {/* Editor */}
      <div className='relative'>
        <EditorContent
          editor={editor}
          className={cn(
            'prose prose-sm max-w-none',
            'border border-gray-200 rounded-lg p-4',
            'focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500',
            'min-h-[100px]'
          )}
        />

        {/* Action buttons */}
        <div className='flex items-center gap-2 mt-3'>
          <Button size='sm' onClick={handleSave} disabled={isSaving || !isDirty}>
            {isSaving ? (
              <Loader2 className='h-4 w-4 mr-1 animate-spin' />
            ) : (
              <Save className='h-4 w-4 mr-1' />
            )}
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button variant='outline' size='sm' onClick={handleCancel} disabled={isSaving}>
            <X className='h-4 w-4 mr-1' />
            Cancel
          </Button>
          {isDirty && <span className='text-xs text-orange-600 ml-2'>Unsaved changes</span>}
        </div>
      </div>
    </div>
  )
}

const InlineContentEditor: React.FC<InlineContentEditorProps> = ({
  contentItem,
  category,
  onSave,
  onCancel,
  className,
  showToolbar = true,
  placeholder = 'Click to start editing...',
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    onCancel?.()
  }

  if (!isEditing) {
    return (
      <div className={cn('group relative', className)}>
        {/* Display content */}
        <div
          className='prose prose-sm max-w-none cursor-pointer p-4 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors'
          onClick={handleEdit}
        >
          {contentItem.content ? (
            <div dangerouslySetInnerHTML={{ __html: contentItem.content }} />
          ) : (
            <div className='text-gray-400 italic'>{placeholder}</div>
          )}
        </div>

        {/* Edit button */}
        <Button
          size='sm'
          variant='outline'
          className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={handleEdit}
        >
          <Edit3 className='h-4 w-4 mr-1' />
          Edit
        </Button>
      </div>
    )
  }

  return (
    <div className={className}>
      <ContentEditorProvider
        initialContent={contentItem}
        category={category}
        slug={contentItem.slug}
        onSave={onSave}
        autoSave={false}
      >
        <EditorWrapper
          onSave={handleSave}
          onCancel={handleCancel}
          showToolbar={showToolbar}
          placeholder={placeholder}
        />
      </ContentEditorProvider>
    </div>
  )
}

export default InlineContentEditor
