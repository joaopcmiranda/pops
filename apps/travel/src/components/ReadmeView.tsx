import { useState, useEffect } from 'react'
import { BookOpen } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SkeletonContent } from '@/components/ui/skeleton'

export function ReadmeView() {
  const [readmeContent, setReadmeContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch README content - in a real implementation, this would be a proper fetch
    // For now, we'll simulate the README content based on what we know
    const simulateReadmeContent = () => {
      const content = `# ✈️ Trip Organizer

A personal trip planning application built with React, TypeScript, and Vite to organize amazing trips and adventures!

## ✅ Current Features

### 🗓️ **Comprehensive Itinerary System**

- **Timeline View** - Beautiful day-by-day organization with stats
- **Accommodation Management** - Hotels, friends' houses, parents' house, own house
- **Event System** - Christmas, New Year's, etc. with people tracking and attendees
- **Work Integration** - Research locations, interviews, remote work with company contacts
- **Overarching Events** - Carnival support with sub-activities
- **Sample Data** - Christmas dinner, parents' house stay, work interviews

### 🎨 **Modern UI & Developer Experience**

- **Beautiful Dashboard** - Overview cards and category navigation
- **shadcn/ui Components** - Professional, consistent design system
- **TypeScript** - Full type safety with strict ESLint rules (no \`any\` types!)
- **Code Quality** - ESLint + Prettier + Husky pre-commit hooks
- **Responsive Design** - Works on desktop (mobile improvements coming)

### 📄 **Content Management Foundation**

- **Markdown Support** - Content stored in \`/content\` directory
- **Content Service** - CRUD operations for trip content
- **Sample Content** - Rio de Janeiro destination, sample itinerary
- **Content Viewing** - Full markdown display with navigation

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier + Husky
- **Content Management**: Markdown files in \`/content\` directory

## Development Commands

- \`yarn dev\` - Start development server
- \`yarn build\` - Build for production
- \`yarn lint\` - Run ESLint with TypeScript rules
- \`yarn format\` - Format code with Prettier
- \`yarn type-check\` - Run TypeScript type checking

## 🚧 What's Next

- **Content Editing System** - Rich editor for creating/editing content
- **Mobile Responsive Design** - Make app work beautifully on phones/tablets
- **Budget Calculator** - Add expense tracking and budget management
- **Backend API Development** - Node.js/Express with database integration
- **Multi-user Support** - User accounts, trip sharing, collaboration

## 🤖 About This Documentation

This documentation is integrated directly into the application for easy access to project information, features, and development status. The app automatically stays up-to-date with the latest project state.

---

*Last updated: ${new Date().toLocaleDateString()}*`

      setReadmeContent(content)
      setLoading(false)
    }

    // Simulate loading delay
    setTimeout(simulateReadmeContent, 500)
  }, [])

  if (loading) {
    return (
      <main className='app-content animate-fade-in'>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}
          className='animate-fade-in-up'
        >
          <BookOpen style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
          <div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#0f172a',
                margin: 0,
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Documentation
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
              Loading project documentation...
            </p>
          </div>
        </div>

        {/* Skeleton Content */}
        <div style={{ maxWidth: '800px' }}>
          <SkeletonContent />
        </div>
      </main>
    )
  }

  return (
    <main className='app-content'>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}
      >
        <BookOpen style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
        <div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#0f172a',
              margin: 0,
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Documentation
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
            Project overview and development guide
          </p>
        </div>
      </div>

      {/* README Content */}
      <div className='readme-content' style={{ maxWidth: '800px' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '1rem',
                  fontFamily: 'Poppins, sans-serif',
                  borderBottom: '2px solid #e2e8f0',
                  paddingBottom: '0.5rem',
                }}
              >
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginTop: '2rem',
                  marginBottom: '1rem',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#334155',
                  marginTop: '1.5rem',
                  marginBottom: '0.75rem',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p
                style={{
                  lineHeight: '1.7',
                  color: '#475569',
                  marginBottom: '1rem',
                }}
              >
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul
                style={{
                  marginLeft: '1.5rem',
                  marginBottom: '1rem',
                  listStyleType: 'disc',
                }}
              >
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol
                style={{
                  marginLeft: '1.5rem',
                  marginBottom: '1rem',
                  listStyleType: 'decimal',
                }}
              >
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li
                style={{
                  marginBottom: '0.5rem',
                  color: '#475569',
                  lineHeight: '1.6',
                }}
              >
                {children}
              </li>
            ),
            strong: ({ children }) => (
              <strong
                style={{
                  fontWeight: '600',
                  color: '#1e293b',
                }}
              >
                {children}
              </strong>
            ),
            code: ({ children }) => (
              <code
                style={{
                  backgroundColor: '#f1f5f9',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  color: '#1e293b',
                }}
              >
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre
                style={{
                  backgroundColor: '#1e293b',
                  color: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  marginBottom: '1rem',
                }}
              >
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote
                style={{
                  borderLeft: '4px solid #3b82f6',
                  paddingLeft: '1rem',
                  margin: '1rem 0',
                  fontStyle: 'italic',
                  color: '#64748b',
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                }}
              >
                {children}
              </blockquote>
            ),
            hr: () => (
              <hr
                style={{
                  border: 'none',
                  borderTop: '2px solid #e2e8f0',
                  margin: '2rem 0',
                }}
              />
            ),
          }}
        >
          {readmeContent}
        </ReactMarkdown>
      </div>
    </main>
  )
}
