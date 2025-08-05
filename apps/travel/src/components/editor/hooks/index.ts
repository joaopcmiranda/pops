import { useContext, useEffect } from 'react'
import type { Editor } from '@tiptap/react'
import { ContentEditorContext } from '../context'
import type { ContentEditorContextValue } from '../types'

export function useContentEditorContext(): ContentEditorContextValue {
  const context = useContext(ContentEditorContext)
  if (!context) {
    throw new Error('useContentEditorContext must be used within a ContentEditorProvider')
  }
  return context
}

export function useRegisterEditor(editor: Editor | null) {
  const context = useContext(ContentEditorContext)
  if (!context) {
    throw new Error('useRegisterEditor must be used within a ContentEditorProvider')
  }

  useEffect(() => {
    if (context.registerEditor) {
      context.registerEditor(editor)
    }
  }, [editor, context])
}
