import React from 'react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Table,
  CheckSquare,
  Undo,
  Redo,
} from 'lucide-react'
import { Button } from '../ui/button/button'
import { Separator } from '../ui/separator'
import { cn } from '../../lib/utils'
import type { ContentToolbarProps, EditorCommand, EditorToolbarGroup } from './types'

const ContentToolbar: React.FC<ContentToolbarProps> = ({ 
  editor, 
  variant = 'fixed', 
  contentType = 'destinations',
  showAdvanced = false 
}) => {
  if (!editor) return null

  const basicCommands: EditorCommand[] = [
    {
      name: 'bold',
      label: 'Bold',
      icon: Bold,
      action: editor => editor.chain().focus().toggleBold().run(),
      isActive: editor => editor.isActive('bold'),
      shortcut: 'Ctrl+B',
    },
    {
      name: 'italic',
      label: 'Italic',
      icon: Italic,
      action: editor => editor.chain().focus().toggleItalic().run(),
      isActive: editor => editor.isActive('italic'),
      shortcut: 'Ctrl+I',
    },
    {
      name: 'underline',
      label: 'Underline',
      icon: Underline,
      action: editor => editor.chain().focus().toggleUnderline().run(),
      isActive: editor => editor.isActive('underline'),
      shortcut: 'Ctrl+U',
    },
    {
      name: 'strike',
      label: 'Strikethrough',
      icon: Strikethrough,
      action: editor => editor.chain().focus().toggleStrike().run(),
      isActive: editor => editor.isActive('strike'),
    },
  ]

  const headingCommands: EditorCommand[] = [
    {
      name: 'heading1',
      label: 'Heading 1',
      icon: Heading1,
      action: editor => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor => editor.isActive('heading', { level: 1 }),
    },
    {
      name: 'heading2',
      label: 'Heading 2',
      icon: Heading2,
      action: editor => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor => editor.isActive('heading', { level: 2 }),
    },
    {
      name: 'heading3',
      label: 'Heading 3',
      icon: Heading3,
      action: editor => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor => editor.isActive('heading', { level: 3 }),
    },
  ]

  const listCommands: EditorCommand[] = [
    {
      name: 'bulletList',
      label: 'Bullet List',
      icon: List,
      action: editor => editor.chain().focus().toggleBulletList().run(),
      isActive: editor => editor.isActive('bulletList'),
    },
    {
      name: 'orderedList',
      label: 'Numbered List',
      icon: ListOrdered,
      action: editor => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor => editor.isActive('orderedList'),
    },
    {
      name: 'taskList',
      label: 'Task List',
      icon: CheckSquare,
      action: editor => editor.chain().focus().toggleTaskList().run(),
      isActive: editor => editor.isActive('taskList'),
    },
  ]

  const formatCommands: EditorCommand[] = [
    {
      name: 'blockquote',
      label: 'Quote',
      icon: Quote,
      action: editor => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor => editor.isActive('blockquote'),
    },
    {
      name: 'code',
      label: 'Code',
      icon: Code,
      action: editor => editor.chain().focus().toggleCode().run(),
      isActive: editor => editor.isActive('code'),
    },
  ]

  const insertCommands: EditorCommand[] = [
    {
      name: 'link',
      label: 'Link',
      icon: Link,
      action: editor => {
        const url = window.prompt('Enter URL:')
        if (url) {
          editor.chain().focus().setLink({ href: url }).run()
        }
      },
      isActive: editor => editor.isActive('link'),
    },
    {
      name: 'image',
      label: 'Image',
      icon: Image,
      action: editor => {
        const url = window.prompt('Enter image URL:')
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
      },
    },
    {
      name: 'table',
      label: 'Table',
      icon: Table,
      action: editor =>
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
  ]

  const historyCommands: EditorCommand[] = [
    {
      name: 'undo',
      label: 'Undo',
      icon: Undo,
      action: editor => editor.chain().focus().undo().run(),
      isDisabled: editor => !editor.can().undo(),
      shortcut: 'Ctrl+Z',
    },
    {
      name: 'redo',
      label: 'Redo',
      icon: Redo,
      action: editor => editor.chain().focus().redo().run(),
      isDisabled: editor => !editor.can().redo(),
      shortcut: 'Ctrl+Y',
    },
  ]

  // Content-type specific toolbar configurations
  const getToolbarGroupsForContentType = (contentType: string): EditorToolbarGroup[] => {
    const baseGroups = [
      { name: 'history', commands: historyCommands },
      { name: 'basic', commands: basicCommands },
    ]

    switch (contentType) {
      case 'itinerary':
        return [
          ...baseGroups,
          { name: 'headings', commands: headingCommands },
          { name: 'lists', commands: listCommands },
          { name: 'insert', commands: insertCommands }, // Tables for schedules
          { name: 'format', commands: formatCommands },
        ]
      
      case 'budget':
        return [
          ...baseGroups,
          { name: 'headings', commands: headingCommands.slice(0, 2) }, // Only H1, H2
          { name: 'insert', commands: insertCommands }, // Tables for budget breakdowns
          { name: 'lists', commands: listCommands.slice(0, 2) }, // No task lists
        ]
      
      case 'destinations':
        return [
          ...baseGroups,
          { name: 'headings', commands: headingCommands },
          { name: 'format', commands: formatCommands },
          { name: 'lists', commands: listCommands.slice(0, 2) }, // No task lists
          { name: 'insert', commands: insertCommands.filter(cmd => cmd.name !== 'table') }, // No tables
        ]
      
      case 'activities':
        return [
          ...baseGroups,
          { name: 'headings', commands: headingCommands.slice(0, 2) },
          { name: 'lists', commands: listCommands }, // Include task lists for activity planning
          { name: 'insert', commands: insertCommands.filter(cmd => cmd.name !== 'table') },
          { name: 'format', commands: formatCommands },
        ]
      
      case 'transport':
      case 'accommodation':
      case 'documents':
        return [
          ...baseGroups,
          { name: 'headings', commands: headingCommands.slice(0, 2) },
          { name: 'lists', commands: listCommands.slice(0, 2) },
          { name: 'insert', commands: insertCommands.filter(cmd => cmd.name === 'link') }, // Only links
          { name: 'format', commands: formatCommands },
        ]
      
      default:
        return [
          ...baseGroups,
          { name: 'headings', commands: headingCommands },
          { name: 'lists', commands: listCommands },
          { name: 'format', commands: formatCommands },
          { name: 'insert', commands: insertCommands },
        ]
    }
  }

  const toolbarGroups = getToolbarGroupsForContentType(contentType)

  const renderToolbarButton = (command: EditorCommand) => {
    const Icon = command.icon
    const isActive = command.isActive?.(editor) || false
    const isDisabled = command.isDisabled?.(editor) || false

    return (
      <Button
        key={command.name}
        variant={isActive ? 'default' : 'ghost'}
        size='sm'
        onClick={() => command.action(editor)}
        disabled={isDisabled}
        title={`${command.label}${command.shortcut ? ` (${command.shortcut})` : ''}`}
        className={cn('h-8 w-8 px-0', isActive && 'bg-blue-100 text-blue-700 hover:bg-blue-200')}
      >
        <Icon className='h-4 w-4' />
      </Button>
    )
  }

  const toolbarClasses = cn(
    'flex items-center gap-1 p-2 bg-white border border-gray-200 shadow-sm',
    'rounded-t-md border-b-0', // Integrate with editor styling
    variant === 'floating' && 'fixed z-50 rounded-lg border-b',
    variant === 'bubble' && 'inline-flex rounded-lg border-b',
    variant === 'fixed' && 'sticky top-0 z-10'
  )

  const getContentTypeLabel = (type: string) => {
    const labels = {
      destinations: 'Destinations',
      itinerary: 'Itinerary',
      transport: 'Transport', 
      accommodation: 'Accommodation',
      activities: 'Activities',
      budget: 'Budget',
      documents: 'Documents'
    }
    return labels[type as keyof typeof labels] || 'Content'
  }

  return (
    <div className={toolbarClasses} role="toolbar">
      {/* Content Type Indicator */}
      <div className='flex items-center gap-2 mr-2'>
        <span className='text-xs font-medium text-gray-600 px-2 py-1 bg-gray-100 rounded'>
          {getContentTypeLabel(contentType)}
        </span>
        <Separator orientation='vertical' className='h-6' />
      </div>
      
      {/* Toolbar Groups */}
      {toolbarGroups.map((group, index) => (
        <React.Fragment key={group.name}>
          <div className='flex items-center gap-1'>{group.commands.map(renderToolbarButton)}</div>
          {index < toolbarGroups.length - 1 && (
            <Separator orientation='vertical' className='h-6 mx-1' />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ContentToolbar
