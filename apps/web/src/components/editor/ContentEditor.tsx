import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import Focus from '@tiptap/extension-focus'
import { cn } from '../../lib/utils'
import type { ContentEditorProps } from './types'

const ContentEditor: React.FC<ContentEditorProps> = ({
  initialContent = '',
  placeholder = 'Start writing...',
  editable = true,
  autoFocus = false,
  className,
  onUpdate,
  onSave,
}) => {
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
      }),
      Typography,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
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
          'prose-table:table-auto prose-th:text-left prose-th:font-semibold',
          'min-h-[200px] px-4 py-3 bg-white rounded-md border border-gray-200',
          'focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500'
        ),
      },
    },
  })

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
      <div
        className={cn(
          'min-h-[200px] px-4 py-3 bg-gray-50 rounded-md border border-gray-200 animate-pulse',
          className
        )}
      >
        <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2'></div>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <EditorContent editor={editor} className='content-editor' />

      {/* Character count */}
      <div className='absolute bottom-2 right-2 text-xs text-gray-400'>
        {editor.storage.characterCount?.characters() || 0} characters
      </div>
    </div>
  )
}

export default ContentEditor
