import React, { useReducer, useCallback, useEffect } from 'react'
import type { Editor } from '@tiptap/react'
import { ContentService, type ContentItem } from '../../services/contentService'
import type { ContentEditorProviderProps, ContentEditorContextValue } from './types'
import { ContentEditorContext } from './context'

interface ContentEditorState {
  content: ContentItem | null
  originalContent: string
  isLoading: boolean
  isSaving: boolean
  error: Error | null
  isDirty: boolean
}

type ContentEditorAction =
  | { type: 'LOADING'; payload: boolean }
  | { type: 'SAVING'; payload: boolean }
  | { type: 'SET_CONTENT'; payload: ContentItem }
  | { type: 'UPDATE_CONTENT'; payload: Partial<ContentItem> }
  | { type: 'SET_ERROR'; payload: Error | null }
  | { type: 'SET_DIRTY'; payload: boolean }
  | { type: 'RESET' }

const initialState: ContentEditorState = {
  content: null,
  originalContent: '',
  isLoading: false,
  isSaving: false,
  error: null,
  isDirty: false,
}

function contentEditorReducer(
  state: ContentEditorState,
  action: ContentEditorAction
): ContentEditorState {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: action.payload }
    case 'SAVING':
      return { ...state, isSaving: action.payload }
    case 'SET_CONTENT':
      return {
        ...state,
        content: action.payload,
        originalContent: action.payload.content,
        isDirty: false,
        error: null,
      }
    case 'UPDATE_CONTENT':
      return {
        ...state,
        content: state.content ? { ...state.content, ...action.payload } : null,
        isDirty: true,
      }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_DIRTY':
      return { ...state, isDirty: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const ContentEditorProvider: React.FC<ContentEditorProviderProps> = ({
  children,
  initialContent,
  category,
  slug,
  onSave,
  onError,
  autoSave = false,
  autoSaveDelay = 3000,
}) => {
  const [state, dispatch] = useReducer(contentEditorReducer, initialState)
  const [editor, setEditor] = React.useState<Editor | null>(null)

  // Method to register editor
  const registerEditor = useCallback((editorInstance: Editor | null) => {
    setEditor(editorInstance)
  }, [])
  const autoSaveTimeoutRef = React.useRef<NodeJS.Timeout>()

  // Initialize content
  useEffect(() => {
    if (initialContent) {
      dispatch({ type: 'SET_CONTENT', payload: initialContent })
    } else if (slug && category) {
      dispatch({ type: 'LOADING', payload: true })
      try {
        const content = ContentService.getContentItem(category, slug)
        if (content) {
          dispatch({ type: 'SET_CONTENT', payload: content })
        } else {
          // Create new content item
          const newContent: ContentItem = {
            id: slug,
            title: '',
            content: '',
            category,
            slug,
            lastModified: new Date(),
          }
          dispatch({ type: 'SET_CONTENT', payload: newContent })
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error as Error })
        onError?.(error as Error)
      } finally {
        dispatch({ type: 'LOADING', payload: false })
      }
    }
  }, [initialContent, category, slug, onError])

  const save = useCallback(async () => {
    if (!state.content || state.isSaving) return

    dispatch({ type: 'SAVING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      // Update content with current editor content if available
      const contentToSave = editor
        ? { ...state.content, content: editor.getHTML(), lastModified: new Date() }
        : { ...state.content, lastModified: new Date() }

      // Save via ContentService
      if (state.content.id && ContentService.getContentItem(category, state.content.slug)) {
        // Update existing
        ContentService.updateContentItem(category, state.content.slug, contentToSave)
      } else {
        // Add new
        ContentService.addContentItem(contentToSave)
      }

      // Call external save handler if provided
      if (onSave) {
        await onSave(contentToSave)
      }

      dispatch({ type: 'SET_CONTENT', payload: contentToSave })
    } catch (error) {
      const err = error as Error
      dispatch({ type: 'SET_ERROR', payload: err })
      onError?.(err)
    } finally {
      dispatch({ type: 'SAVING', payload: false })
    }
  }, [state.content, state.isSaving, editor, category, onSave, onError])

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && state.isDirty && !state.isSaving && state.content) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }

      autoSaveTimeoutRef.current = setTimeout(async () => {
        await save()
      }, autoSaveDelay)
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [state.isDirty, state.isSaving, state.content, autoSave, autoSaveDelay, save])

  const discard = useCallback(() => {
    if (state.content) {
      // Reset editor content to original
      if (editor) {
        editor.commands.setContent(state.originalContent)
      }

      // Reset content to original
      dispatch({
        type: 'SET_CONTENT',
        payload: { ...state.content, content: state.originalContent },
      })
    }
  }, [state.content, state.originalContent, editor])

  const updateContent = useCallback((updates: Partial<ContentItem>) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: updates })
  }, [])

  const contextValue: ContentEditorContextValue = {
    editor,
    content: state.content,
    isLoading: state.isLoading,
    isSaving: state.isSaving,
    isDirty: state.isDirty,
    error: state.error,
    save,
    discard,
    updateContent,
    registerEditor,
  }

  return (
    <ContentEditorContext.Provider value={contextValue}>{children}</ContentEditorContext.Provider>
  )
}
