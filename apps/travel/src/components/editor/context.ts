import { createContext } from 'react'
import type { ContentEditorContextValue } from './types'

export const ContentEditorContext = createContext<ContentEditorContextValue | null>(null)
