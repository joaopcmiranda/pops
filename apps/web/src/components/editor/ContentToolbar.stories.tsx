import type { StoryDefault, Story } from '@storybook/react-vite'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { ContentToolbar } from './index'
import type { ContentToolbarProps } from './types'

const meta: StoryDefault<ContentToolbarProps> = {
  title: 'Editor/ContentToolbar',
  component: ContentToolbar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive formatting toolbar for the content editor with support for text formatting, headings, lists, and media insertion.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['fixed', 'floating', 'bubble'],
      description: 'Toolbar display variant',
    },
    showAdvanced: {
      control: 'boolean',
      description: 'Whether to show advanced formatting options',
    },
    contentType: {
      control: 'select',
      options: [
        'destinations',
        'itinerary',
        'transport',
        'accommodation',
        'activities',
        'budget',
        'documents',
      ],
      description: 'Content type for specialized formatting options',
    },
  },
}

export default meta

// Demo editor component that includes the toolbar
const DemoEditor: React.FC<Omit<ContentToolbarProps, 'editor'> & { initialContent?: string }> = ({
  variant = 'fixed',
  showAdvanced = true,
  contentType = 'destinations',
  initialContent = '',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
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
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[200px] px-4 py-3 bg-white rounded-md border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500',
      },
    },
  })

  return (
    <div className='max-w-4xl mx-auto'>
      <ContentToolbar
        editor={editor}
        variant={variant}
        showAdvanced={showAdvanced}
        contentType={contentType}
      />
      <div className='mt-4'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export const Default: Story<ContentToolbarProps & { initialContent?: string }> = {
  render: args => <DemoEditor {...args} />,
  args: {
    variant: 'fixed',
    showAdvanced: true,
    contentType: 'destinations',
    initialContent: `
      <h1>Travel Guide</h1>
      <p>Click on any toolbar button to see it in action. Try selecting text to see formatting options.</p>
      <p>This is a <strong>bold text</strong> and this is <em>italic text</em>. You can also add <a href="#">links</a>.</p>
      <ul>
        <li>Create bullet lists</li>
        <li>Format with different styles</li>
        <li>Add tables and more</li>
      </ul>
    `,
  },
}

export const BubbleVariant: Story<ContentToolbarProps & { initialContent?: string }> = {
  render: args => <DemoEditor {...args} />,
  args: {
    variant: 'bubble',
    showAdvanced: false,
    contentType: 'destinations',
    initialContent: `
      <p>This demo shows the bubble toolbar variant. <strong>Select this text</strong> to see the inline formatting options.</p>
      <p>The bubble toolbar appears contextually when you select text, providing a cleaner editing experience.</p>
    `,
  },
}
BubbleVariant.parameters = {
  docs: {
    description: {
      story:
        'Bubble toolbar that appears inline when text is selected, providing contextual formatting options.',
    },
  },
}

export const MinimalToolbar: Story<ContentToolbarProps & { initialContent?: string }> = {
  render: args => <DemoEditor {...args} />,
  args: {
    variant: 'fixed',
    showAdvanced: false,
    contentType: 'destinations',
    initialContent: `
      <h2>Simple Editing</h2>
      <p>This version shows the minimal toolbar with only basic formatting options.</p>
      <p>Perfect for quick edits and simple content formatting.</p>
    `,
  },
}
MinimalToolbar.parameters = {
  docs: {
    description: {
      story: 'Minimal toolbar with only essential formatting options for streamlined editing.',
    },
  },
}

export const ItineraryToolbar: Story<ContentToolbarProps & { initialContent?: string }> = {
  render: args => <DemoEditor {...args} />,
  args: {
    variant: 'fixed',
    showAdvanced: true,
    contentType: 'itinerary',
    initialContent: `
      <h1>Day 1 - City Exploration</h1>
      <h2>Morning Schedule</h2>
      <ul class="task-list">
        <li><input type="checkbox" checked> Wake up at 7:00 AM</li>
        <li><input type="checkbox"> Breakfast at hotel</li>
        <li><input type="checkbox"> Check out and head to city center</li>
      </ul>
      <h2>Budget Tracking</h2>
      <table>
        <thead>
          <tr><th>Item</th><th>Cost</th></tr>
        </thead>
        <tbody>
          <tr><td>Breakfast</td><td>$15</td></tr>
          <tr><td>Transport</td><td>$10</td></tr>
        </tbody>
      </table>
    `,
  },
}
ItineraryToolbar.parameters = {
  docs: {
    description: {
      story:
        'Toolbar configured for itinerary content with specialized options for schedules, tasks, and tables.',
    },
  },
}

export const EmptyEditor: Story<ContentToolbarProps & { initialContent?: string }> = {
  render: args => <DemoEditor {...args} />,
  args: {
    variant: 'fixed',
    showAdvanced: true,
    contentType: 'destinations',
    initialContent: '',
  },
}
EmptyEditor.parameters = {
  docs: {
    description: {
      story:
        'Toolbar with an empty editor to demonstrate the initial state and all available formatting options.',
    },
  },
}

export const AllFormattingOptions: Story<ContentToolbarProps & { initialContent?: string }> = {
  render: args => <DemoEditor {...args} />,
  args: {
    variant: 'fixed',
    showAdvanced: true,
    contentType: 'destinations',
    initialContent: `
      <h1>All Formatting Showcase</h1>
      <h2>Text Formatting</h2>
      <p>This paragraph contains <strong>bold text</strong>, <em>italic text</em>, <u>underlined text</u>, and <s>strikethrough text</s>.</p>
      
      <h2>Lists</h2>
      <h3>Bullet List</h3>
      <ul>
        <li>First item</li>
        <li>Second item with <strong>bold</strong> text</li>
        <li>Third item</li>
      </ul>
      
      <h3>Numbered List</h3>
      <ol>
        <li>Step one</li>
        <li>Step two</li>
        <li>Step three</li>
      </ol>
      
      <h3>Task List</h3>
      <ul class="task-list">
        <li><input type="checkbox" checked> Completed task</li>
        <li><input type="checkbox"> Pending task</li>
        <li><input type="checkbox"> Another pending task</li>
      </ul>
      
      <h2>Quote</h2>
      <blockquote>
        <p>This is a blockquote with some important travel advice or memorable quote from your journey.</p>
      </blockquote>
      
      <h2>Code</h2>
      <p>You can add inline <code>code snippets</code> for technical information.</p>
      
      <h2>Links</h2>
      <p>Check out this <a href="https://example.com">useful travel website</a> for more information.</p>
      
      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>Destination</th>
            <th>Duration</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Paris</td>
            <td>5 days</td>
            <td>$2,000</td>
          </tr>
          <tr>
            <td>Tokyo</td>
            <td>7 days</td>
            <td>$3,500</td>
          </tr>
        </tbody>
      </table>
    `,
  },
}
AllFormattingOptions.parameters = {
  docs: {
    description: {
      story:
        'Comprehensive demo showing all available formatting options and how they render in the editor.',
    },
  },
}
