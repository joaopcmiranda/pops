import React from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import Focus from '@tiptap/extension-focus'
import { useContentEditorContext, useRegisterEditor } from './index'
import type { ContentType } from '../types'

interface UseContentEditorOptions {
  placeholder?: string
  editable?: boolean
  autoFocus?: boolean
  contentType?: ContentType
  onUpdate?: (content: string) => void
}

export const useContentEditor = (options: UseContentEditorOptions = {}) => {
  const { placeholder = 'Start writing...', editable = true, autoFocus = false, onUpdate } = options

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
        // table: false, // We'll use the separate table extension - not a valid StarterKit option
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
        },
      }),
      Typography,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
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
    content: context.content?.content || '',
    editable,
    autofocus: autoFocus,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      context.updateContent({ content: html })
      onUpdate?.(html)
    },
    editorProps: {
      attributes: {
        class: [
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
          'focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500',
        ].join(' '),
      },
    },
  })

  // Register editor with context
  useRegisterEditor(editor)

  // Update editor content when context content changes
  React.useEffect(() => {
    if (editor && context.content && editor.getHTML() !== context.content.content) {
      editor.commands.setContent(context.content.content)
    }
  }, [editor, context.content])

  return {
    editor,
    content: context.content,
    isLoading: context.isLoading,
    isSaving: context.isSaving,
    isDirty: context.isDirty,
    error: context.error,
    save: context.save,
    updateContent: context.updateContent,
  }
}
