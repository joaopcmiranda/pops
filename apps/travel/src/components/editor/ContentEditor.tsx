import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Typography } from '@tiptap/extension-typography'
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Focus } from '@tiptap/extension-focus'
import { CharacterCount } from '@tiptap/extension-character-count'
import { cn } from '@pops/ui'
import ContentToolbar from './ContentToolbar'
import { useContentEditorContext } from './hooks'
import type { ContentEditorProps } from './types'

const ContentEditor: React.FC<ContentEditorProps> = ({
  initialContent = '',
  placeholder = 'Start writing...',
  editable = true,
  autoFocus = false,
  className,
  contentType = 'destinations',
  onUpdate,
  onSave,
  autosave,
}) => {
  const context = useContentEditorContext()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
        },
        // table: false, // Use separate table extension - remove this line as table is not a valid StarterKit option
      }),
      Typography,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      // Table extensions in correct order
      TableRow,
      TableHeader,
      TableCell,
      Table.configure({
        resizable: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return `Heading ${node.attrs.level}`
          }
          return placeholder
        },
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
    ],
    content: initialContent,
    editable,
    autofocus: autoFocus,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onUpdate?.(html)

      // Update context if available
      if (context?.updateContent && context?.content) {
        context.updateContent({ content: html })
      }
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
          'prose-headings:text-gray-900 prose-headings:font-semibold',
          'prose-p:text-gray-700 prose-p:leading-relaxed',
          'prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline',
          'prose-strong:text-gray-900 prose-strong:font-semibold',
          'prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
          'prose-pre:bg-gray-900 prose-pre:text-gray-100',
          'prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-600',
          'prose-hr:border-gray-300',
          'prose-ul:list-disc prose-ol:list-decimal',
          'prose-li:text-gray-700',
          'prose-table:table-auto prose-th:text-left prose-th:font-semibold prose-td:border prose-td:border-gray-300 prose-td:px-3 prose-td:py-2',
          'min-h-[300px] px-4 py-3 bg-white rounded-b-md border-l border-r border-b border-gray-200',
          'focus-within:border-blue-500'
        ),
      },
    },
  })

  // Register editor with context
  React.useEffect(() => {
    if (context?.registerEditor) {
      context.registerEditor(editor)
    }
  }, [editor, context])

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + S to save
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault()
        if (editor && onSave) {
          onSave(editor.getHTML())
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [editor, onSave])

  if (!editor) {
    return (
      <div className={cn('w-full', className)}>
        {/* Toolbar skeleton */}
        <div className='h-12 bg-gray-100 rounded-t-md border border-gray-200 animate-pulse flex items-center px-4 gap-2'>
          <div className='h-6 w-6 bg-gray-200 rounded'></div>
          <div className='h-6 w-6 bg-gray-200 rounded'></div>
          <div className='h-6 w-6 bg-gray-200 rounded'></div>
        </div>
        {/* Editor skeleton */}
        <div className='min-h-[300px] px-4 py-3 bg-gray-50 rounded-b-md border-l border-r border-b border-gray-200 animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)} data-testid='content-editor'>
      {/* Integrated Toolbar */}
      <ContentToolbar
        editor={editor}
        variant='fixed'
        contentType={contentType}
        showAdvanced={contentType === 'itinerary' || contentType === 'budget'}
      />

      {/* Editor Content */}
      <EditorContent editor={editor} className='content-editor' />

      {/* Status Bar */}
      <div className='flex justify-between items-center px-3 py-2 bg-gray-50 border-l border-r border-b border-gray-200 rounded-b-md text-xs text-gray-500'>
        <div className='flex items-center gap-4'>
          <span>{editor.storage.characterCount?.characters() || 0} characters</span>
          <span>{editor.storage.characterCount?.words() || 0} words</span>
          {context?.isDirty && (
            <span className='text-amber-600 flex items-center gap-1'>
              <div className='w-2 h-2 bg-amber-400 rounded-full'></div>
              Unsaved changes
            </span>
          )}
          {context?.isSaving && <span className='text-blue-600'>Saving...</span>}
        </div>
        <div className='text-gray-400'>
          {autosave ? `Auto-save: ${autosave}s` : 'Press Ctrl+S to save'}
        </div>
      </div>
    </div>
  )
}

export default ContentEditor
