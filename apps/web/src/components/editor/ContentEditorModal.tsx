import React, { useState } from 'react'
import { EditorContent } from '@tiptap/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Save, X, Loader2 } from 'lucide-react'
import { ContentEditorProvider } from './ContentEditorProvider'
import { useContentEditor } from './hooks/useContentEditor'
import ContentToolbar from './ContentToolbar'
import { cn } from '../../lib/utils'
import type { ContentEditorModalProps } from './types'

interface EditorContentWrapperProps {
  onSave?: () => void
  onClose?: () => void
}

const EditorContentWrapper: React.FC<EditorContentWrapperProps> = ({ onSave, onClose }) => {
  const { editor, content, isLoading, isSaving, isDirty, error, save, updateContent } =
    useContentEditor({
      placeholder: 'Start writing your content...',
      autoFocus: true,
    })

  const [title, setTitle] = useState(content?.title || '')

  React.useEffect(() => {
    if (content?.title !== title) {
      setTitle(content?.title || '')
    }
  }, [content?.title, title])

  const handleSave = async () => {
    try {
      // Update title if changed
      if (title !== content?.title) {
        updateContent({ title })
      }

      await save()
      onSave?.()
    } catch (error) {
      console.error('Failed to save content:', error)
    }
  }

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    updateContent({ title: newTitle })
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-96'>
        <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
        <span className='ml-2 text-gray-600'>Loading editor...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-96'>
        <div className='text-center'>
          <div className='text-red-500 mb-2'>Failed to load editor</div>
          <div className='text-sm text-gray-600'>{error.message}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full'>
      {/* Title input */}
      <div className='mb-6'>
        <Label htmlFor='content-title' className='text-sm font-medium text-gray-700'>
          Title
        </Label>
        <Input
          id='content-title'
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          placeholder='Enter content title...'
          className='mt-1'
        />
      </div>

      {/* Toolbar */}
      <ContentToolbar editor={editor} variant='fixed' showAdvanced={true} />

      {/* Editor */}
      <div className='flex-1 min-h-0'>
        <div className='h-full border border-gray-200 rounded-lg overflow-hidden'>
          <EditorContent
            editor={editor}
            className={cn(
              'h-full overflow-y-auto',
              'prose prose-sm sm:prose lg:prose-lg max-w-none',
              'p-6 focus:outline-none'
            )}
          />
        </div>
      </div>

      {/* Status bar */}
      <div className='flex items-center justify-between mt-4 text-sm text-gray-500'>
        <div className='flex items-center gap-4'>
          <span>{editor?.storage.characterCount?.characters() || 0} characters</span>
          <span>{editor?.storage.characterCount?.words() || 0} words</span>
          {isDirty && <span className='text-orange-600 font-medium'>Unsaved changes</span>}
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={onClose} disabled={isSaving}>
            <X className='h-4 w-4 mr-1' />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !isDirty} size='sm'>
            {isSaving ? (
              <Loader2 className='h-4 w-4 mr-1 animate-spin' />
            ) : (
              <Save className='h-4 w-4 mr-1' />
            )}
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  isOpen,
  onClose,
  contentItem,
  category,
  slug,
  title,
  onSave,
}) => {
  const handleSave = async () => {
    // Close modal after successful save
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl h-[90vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle>
            {contentItem ? 'Edit Content' : 'Create New Content'}
            {title && ` - ${title}`}
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 min-h-0'>
          <ContentEditorProvider
            initialContent={contentItem}
            category={category}
            slug={slug}
            onSave={onSave}
            autoSave={false}
          >
            <EditorContentWrapper onSave={handleSave} onClose={onClose} />
          </ContentEditorProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ContentEditorModal
