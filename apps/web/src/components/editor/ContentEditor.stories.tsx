import type { Meta, StoryObj } from '@storybook/react-vite'
import ContentEditor from './ContentEditor'
import { ContentEditorProvider } from './ContentEditorProvider'
import type { ContentEditorProps } from './types'

const meta: Meta<typeof ContentEditor> = {
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
    autosave: {
      control: 'number',
      description: 'Auto-save delay in seconds (0 to disable)',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Auto-save demo story
export const WithAutoSave: Story = {
  render: (args: ContentEditorProps) => (
    <ContentEditorProvider
      initialContent={{
        id: 'autosave-demo',
        title: 'Auto-save Demo',
        slug: 'autosave-demo',
        category: 'destinations',
        content: '<p>Start typing to see auto-save in action...</p>',
        lastModified: new Date(),
      }}
      category='destinations'
      slug='autosave-demo'
      autoSave={true}
      autoSaveDelay={(args.autosave || 3) * 1000}
      onSave={async (content) => {
        console.log('Auto-saved content:', content)
        // Simulate API call delay
        return new Promise(resolve => setTimeout(resolve, 200))
      }}
    >
      <div className='max-w-4xl mx-auto p-6'>
        <div className='mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h3 className='text-lg font-semibold text-blue-800 mb-2'>Auto-save Demo</h3>
          <p className='text-blue-700'>
            This editor will automatically save your changes every {args.autosave || 3} seconds after you stop typing.
            Check the browser console to see save events, or watch the status indicator in the bottom-right corner.
          </p>
        </div>
        <ContentEditor {...args} />
      </div>
    </ContentEditorProvider>
  ),
  args: {
    contentType: 'destinations',
    placeholder: 'Start typing to test auto-save functionality...',
    autosave: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 
          'Demonstrates the auto-save feature that saves content automatically after a specified delay when the user stops typing.',
      },
    },
  },
}

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

export const Default: Story = {
  render: (args: ContentEditorProps) => (
    <ContentEditorProvider
      initialContent={mockContentItem}
      category='destinations'
      slug='rio-de-janeiro'
    >
      <div className='max-w-4xl mx-auto'>
        <ContentEditor {...args} />
      </div>
    </ContentEditorProvider>
  ),
  args: {
    placeholder: 'Start writing your travel content...',
    editable: true,
    autoFocus: false,
    contentType: 'destinations',
  },
}

export const WithContent: Story = {
  render: (args: ContentEditorProps) => (
    <ContentEditorProvider
      initialContent={mockContentItem}
      category='destinations'
      slug='rio-de-janeiro'
    >
      <div className='max-w-4xl mx-auto'>
        <ContentEditor {...args} />
      </div>
    </ContentEditorProvider>
  ),
  args: {
    initialContent: sampleContent,
    placeholder: 'Start writing...',
    editable: true,
    autoFocus: false,
    contentType: 'destinations',
  },
}

export const ReadOnly: Story = {
  render: (args: ContentEditorProps) => (
    <ContentEditorProvider
      initialContent={mockContentItem}
      category='destinations'
      slug='rio-de-janeiro'
    >
      <div className='max-w-4xl mx-auto'>
        <ContentEditor {...args} />
      </div>
    </ContentEditorProvider>
  ),
  args: {
    initialContent: sampleContent,
    editable: false,
    contentType: 'destinations',
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor in read-only mode for displaying content without editing capabilities.',
      },
    },
  },
}

export const ItineraryType: Story = {
  render: (args: ContentEditorProps) => (
    <ContentEditorProvider
      initialContent={{
        id: 'day-1-rio',
        title: 'Day 1 - Arrival in Rio',
        slug: 'day-1-rio',
        category: 'itinerary',
        content: `
          <h1>Day 1 - Arrival in Rio de Janeiro</h1>
          <h2>Morning Activities</h2>
          <ul data-type="taskList">
            <li data-type="taskItem" data-checked="true">
              <p><strong>9:00 AM</strong> - Land at Galeão International Airport ✈️</p>
            </li>
            <li data-type="taskItem" data-checked="false">
              <p><strong>10:30 AM</strong> - Take taxi/Uber to hotel in Copacabana (30-45 min)</p>
            </li>
            <li data-type="taskItem" data-checked="false">
              <p><strong>12:00 PM</strong> - Check in & light lunch at <em>Café Colombo</em></p>
            </li>
          </ul>
          
          <h2>Afternoon & Evening</h2>
          <ul data-type="taskList">
            <li data-type="taskItem" data-checked="false">
              <p><strong>2:00 PM</strong> - Walk along Copacabana Beach 🏖️</p>
            </li>
            <li data-type="taskItem" data-checked="false">
              <p><strong>4:00 PM</strong> - Visit Forte de Copacabana (Fort)</p>
            </li>
            <li data-type="taskItem" data-checked="false">
              <p><strong>7:00 PM</strong> - Dinner at <strong>Churrascaria Palace</strong></p>
            </li>
          </ul>

          <h2>Budget Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Item</th>
                <th>Cost (USD)</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Transport</strong></td>
                <td>Airport to Hotel</td>
                <td>$25-35</td>
                <td>Uber/Taxi</td>
              </tr>
              <tr>
                <td><strong>Food</strong></td>
                <td>Lunch at Café</td>
                <td>$15-20</td>
                <td>Local cuisine</td>
              </tr>
              <tr>
                <td><strong>Food</strong></td>
                <td>Dinner</td>
                <td>$40-60</td>
                <td>Churrascaria</td>
              </tr>
              <tr>
                <td><strong>Activities</strong></td>
                <td>Fort entrance</td>
                <td>$8</td>
                <td>Historical site</td>
              </tr>
              <tr>
                <td colspan="2"><strong>Total Estimated</strong></td>
                <td><strong>$88-123</strong></td>
                <td><em>Per person</em></td>
              </tr>
            </tbody>
          </table>

          <blockquote>
            <p>💡 <strong>Pro Tip:</strong> Keep some cash for beach vendors and small local shops that don't accept cards!</p>
          </blockquote>
        `,
        lastModified: new Date(),
      }}
      category='itinerary'
      slug='day-1-rio'
    >
      <div className='max-w-5xl mx-auto p-6'>
        <div className='mb-4'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Itinerary Editor</h2>
          <p className='text-gray-600'>Rich editor with task lists, tables, and scheduling tools specifically designed for daily itinerary planning.</p>
        </div>
        <ContentEditor {...args} />
      </div>
    </ContentEditorProvider>
  ),
  args: {
    contentType: 'itinerary',
    placeholder: 'Plan your daily itinerary with tasks and budget...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enhanced itinerary editor featuring task lists for scheduling, budget tables, and travel-specific formatting tools.',
      },
    },
  },
}

export const Empty: Story = {
  render: (args: ContentEditorProps) => (
    <ContentEditorProvider
      initialContent={{
        id: 'new-content',
        title: '',
        slug: 'new-content',
        category: 'destinations',
        content: '',
        lastModified: new Date(),
      }}
      category='destinations'
      slug='new-content'
    >
      <div className='max-w-4xl mx-auto'>
        <ContentEditor {...args} />
      </div>
    </ContentEditorProvider>
  ),
  args: {
    placeholder: 'Click here to start writing your amazing travel story...',
    editable: true,
    autoFocus: true,
    contentType: 'destinations',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty editor with placeholder text and auto-focus enabled.',
      },
    },
  },
}

export const BudgetType: Story = {
  render: (args: ContentEditorProps) => (
    <ContentEditorProvider
      initialContent={{
        id: 'rio-budget',
        title: 'Rio de Janeiro Trip Budget',
        slug: 'rio-budget',
        category: 'budget',
        content: `
          <h1>Rio de Janeiro - 7 Day Trip Budget</h1>
          
          <h2>Daily Budget Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Daily</th>
                <th>7 Days</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Accommodation</strong></td>
                <td>$80</td>
                <td>$560</td>
                <td>4-star hotel in Copacabana</td>
              </tr>
              <tr>
                <td><strong>Food & Dining</strong></td>
                <td>$50</td>
                <td>$350</td>
                <td>Mix of local and restaurants</td>
              </tr>
              <tr>
                <td><strong>Transportation</strong></td>
                <td>$15</td>
                <td>$105</td>
                <td>Metro, buses, occasional taxi</td>
              </tr>
              <tr>
                <td><strong>Activities</strong></td>
                <td>$25</td>
                <td>$175</td>
                <td>Museums, tours, attractions</td>
              </tr>
              <tr>
                <td><strong>Miscellaneous</strong></td>
                <td>$20</td>
                <td>$140</td>
                <td>Souvenirs, tips, extras</td>
              </tr>
            </tbody>
          </table>

          <h2>Major Expenses</h2>
          <ul>
            <li><strong>Flights:</strong> $450-650 (round trip)</li>
            <li><strong>Christ the Redeemer Tour:</strong> $45</li>
            <li><strong>Sugarloaf Cable Car:</strong> $35</li>
            <li><strong>Travel Insurance:</strong> $80</li>
          </ul>

          <blockquote>
            <p>💰 <strong>Budget Tip:</strong> Add 10-15% buffer for unexpected expenses and currency fluctuations.</p>
          </blockquote>
        `,
        lastModified: new Date(),
      }}
      category='budget'
      slug='rio-budget'
    >
      <div className='max-w-5xl mx-auto p-6'>
        <div className='mb-4'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Budget Planner</h2>
          <p className='text-gray-600'>Specialized editor for budget planning with table tools and financial formatting.</p>
        </div>
        <ContentEditor {...args} />
      </div>
    </ContentEditorProvider>
  ),
  args: {
    contentType: 'budget',
    placeholder: 'Plan your trip budget with detailed breakdowns...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Budget-focused editor with table creation tools and simplified formatting for financial planning.',
      },
    },
  },
}

export const DestinationType: Story = {
  render: (args: ContentEditorProps) => (
    <ContentEditorProvider
      initialContent={{
        id: 'rio-guide',
        title: 'Rio de Janeiro Travel Guide',
        slug: 'rio-guide',
        category: 'destinations',
        content: `
          <h1>Rio de Janeiro: The Marvelous City</h1>
          
          <blockquote>
            <p><em>"Rio de Janeiro is a kaleidoscope of colors, sounds, and emotions that captures the heart of every visitor."</em></p>
          </blockquote>

          <h2>Overview</h2>
          <p>Rio de Janeiro, Brazil's vibrant coastal metropolis, is renowned for its <strong>stunning beaches</strong>, iconic landmarks, and pulsating <em>carnival atmosphere</em>. Nestled between lush mountains and the Atlantic Ocean, this city offers an unforgettable blend of natural beauty and urban excitement.</p>

          <h3>Must-See Landmarks</h3>
          <ul>
            <li><strong>Christ the Redeemer Statue</strong> - Iconic Art Deco statue atop Corcovado Mountain</li>
            <li><strong>Sugarloaf Mountain</strong> - Panoramic views via scenic cable car ride</li>
            <li><strong>Copacabana Beach</strong> - World-famous 4km stretch of golden sand</li>
            <li><strong>Ipanema Beach</strong> - Trendy beach known for fashion and culture</li>
          </ul>

          <h2>Best Time to Visit</h2>
          <p>The ideal time to visit Rio is during the <strong>dry season from May to October</strong>, when temperatures are milder and rainfall is minimal.</p>

          <blockquote>
            <p>🏖️ <strong>Local Tip:</strong> Visit the beaches early morning or late afternoon to avoid crowds and enjoy the best lighting for photos!</p>
          </blockquote>
        `,
        lastModified: new Date(),
      }}
      category='destinations'
      slug='rio-guide'
    >
      <div className='max-w-4xl mx-auto p-6'>
        <div className='mb-4'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Destination Guide Editor</h2>
          <p className='text-gray-600'>Rich text editor optimized for travel guides with emphasis on formatting and readability.</p>
        </div>
        <ContentEditor {...args} />
      </div>
    </ContentEditorProvider>
  ),
  args: {
    contentType: 'destinations',
    placeholder: 'Write your destination guide with rich formatting...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Destinations editor focused on rich text formatting, images, and links for comprehensive travel guides.',
      },
    },
  },
}

export const WithLongContent: Story = {
  render: (args: ContentEditorProps) => (
    <ContentEditorProvider
      initialContent={{
        id: 'long-content',
        title: 'Complete Rio de Janeiro Guide',
        slug: 'long-content',
        category: 'destinations',
        content: `
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
        lastModified: new Date(),
      }}
      category='destinations'
      slug='long-content'
    >
      <div className='max-w-4xl mx-auto'>
        <ContentEditor {...args} />
      </div>
    </ContentEditorProvider>
  ),
  args: {
    contentType: 'destinations',
  },
  parameters: {
    docs: {
      description: {
        story: 'Editor with longer content to test scrolling and performance.',
      },
    },
  },
}
