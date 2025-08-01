import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ContentItem } from '@/services/contentService'

interface ContentViewerProps {
  content: ContentItem
  className?: string
}

export function ContentViewer({ content, className = '' }: ContentViewerProps) {
  return (
    <div className={`content-viewer ${className}`}>
      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}
        >
          <span
            style={{
              backgroundColor: '#eff6ff',
              color: '#3b82f6',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '500',
              textTransform: 'capitalize',
            }}
          >
            {content.category}
          </span>
          {content.lastModified && (
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Last updated: {content.lastModified.toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className='markdown-content'>
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
          }}
        >
          {content.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
