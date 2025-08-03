import type { StoryDefault, Story } from '@storybook/react-vite'
import { ContentEditor } from './index'
import { ContentEditorProvider } from './ContentEditorProvider'
import type { ContentEditorProps } from './types'

const meta: StoryDefault<ContentEditorProps> = {
  title: 'Editor/ContentEditor',
  component: ContentEditor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A rich WYSIWYG content editor built with TipTap, supporting Markdown and HTML output with travel-specific formatting options.',
      },
    },
  },
  argTypes: {
    initialContent: {
      control: 'text',
      description: 'Initial HTML content for the editor',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when editor is empty',
    },
    editable: {
      control: 'boolean',
      description: 'Whether the editor is editable',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether to auto-focus the editor on mount',
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
      description: 'Type of content being edited (affects available formatting options)',
    },
    onUpdate: {
      action: 'onUpdate',
      description: 'Callback fired when editor content changes',
    },
    onSave: {
      action: 'onSave',
      description: 'Callback fired when save is triggered (Ctrl+S)',
    },
  },
}

export default meta

const sampleContent = `
<h1>Rio de Janeiro Travel Guide</h1>
<h2>Overview</h2>
<p>The vibrant city known for its beaches, culture, and iconic landmarks.</p>
<h2>Must-See Attractions</h2>
<ul>
  <li><strong>Christ the Redeemer</strong> - Iconic statue atop Corcovado Mountain</li>
  <li><strong>Sugarloaf Mountain</strong> - Cable car with panoramic views</li>
  <li><strong>Copacabana Beach</strong> - Famous beach with stunning coastline</li>
</ul>
<h2>Transportation</h2>
<p><strong>Getting There:</strong> Galeão International Airport (GIG)<br>
<strong>Getting Around:</strong> Metro, buses, taxis, Uber</p>
<blockquote>
  <p>💡 <strong>Pro Tip:</strong> Book Christ the Redeemer tickets in advance to avoid disappointment!</p>
</blockquote>
`

const mockContentItem = {
  id: 'rio-de-janeiro',
  title: 'Rio de Janeiro',
  slug: 'rio-de-janeiro',
  category: 'destinations' as const,
  content: sampleContent,
  lastModified: new Date(),
}

// Template with provider
const Template: Story<ContentEditorProps> = args => (
  <ContentEditorProvider
    initialContent={mockContentItem}
    category='destinations'
    slug='rio-de-janeiro'
  >
    <div className='max-w-4xl mx-auto'>
      <ContentEditor {...args} />
    </div>
  </ContentEditorProvider>
)

export const Default: Story<ContentEditorProps> = Template.bind({})
Default.args = {
  placeholder: 'Start writing your travel content...',
  editable: true,
  autoFocus: false,
  contentType: 'destinations',
}

export const WithContent: Story<ContentEditorProps> = Template.bind({})
WithContent.args = {
  initialContent: sampleContent,
  placeholder: 'Start writing...',
  editable: true,
  autoFocus: false,
  contentType: 'destinations',
}

export const ReadOnly: Story<ContentEditorProps> = Template.bind({})
ReadOnly.args = {
  initialContent: sampleContent,
  editable: false,
  contentType: 'destinations',
}
ReadOnly.parameters = {
  docs: {
    description: {
      story: 'Editor in read-only mode for displaying content without editing capabilities.',
    },
  },
}

export const ItineraryType: Story<ContentEditorProps> = Template.bind({})
ItineraryType.args = {
  initialContent: `
    <h1>Day 1 - Arrival in Rio de Janeiro</h1>
    <h2>Morning</h2>
    <ul class="task-list">
      <li><input type="checkbox" checked> <strong>9:00 AM</strong> - Land at Galeão International Airport</li>
      <li><input type="checkbox"> <strong>10:30 AM</strong> - Take taxi/Uber to hotel</li>
      <li><input type="checkbox"> <strong>12:00 PM</strong> - Light lunch at local café</li>
    </ul>
    <h2>Budget Estimate</h2>
    <table>
      <thead>
        <tr><th>Item</th><th>Cost</th></tr>
      </thead>
      <tbody>
        <tr><td>Transport from airport</td><td>$25-35</td></tr>
        <tr><td>Lunch</td><td>$10-15</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>$35-50</strong></td></tr>
      </tbody>
    </table>
  `,
  contentType: 'itinerary',
  placeholder: 'Plan your daily itinerary...',
}
ItineraryType.parameters = {
  docs: {
    description: {
      story:
        'Editor configured for itinerary content with task lists and tables for scheduling and budgets.',
    },
  },
}

export const Empty: Story<ContentEditorProps> = Template.bind({})
Empty.args = {
  placeholder: 'Click here to start writing your amazing travel story...',
  editable: true,
  autoFocus: true,
  contentType: 'destinations',
}
Empty.parameters = {
  docs: {
    description: {
      story: 'Empty editor with placeholder text and auto-focus enabled.',
    },
  },
}

export const WithLongContent: Story<ContentEditorProps> = Template.bind({})
WithLongContent.args = {
  initialContent: `
    <h1>Complete Rio de Janeiro Guide</h1>
    ${Array.from(
      { length: 5 },
      (_, i) => `
      <h2>Section ${i + 1}</h2>
      <p>This is a longer content section to demonstrate scrolling and performance with large documents. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <ul>
        <li>First item with some details</li>
        <li>Second item with more information</li>
        <li>Third item with even more content</li>
      </ul>
      <blockquote>
        <p>This is a quote block with some additional context and information.</p>
      </blockquote>
    `
    ).join('')}
  `,
  contentType: 'destinations',
}
WithLongContent.parameters = {
  docs: {
    description: {
      story: 'Editor with longer content to test scrolling and performance.',
    },
  },
}
