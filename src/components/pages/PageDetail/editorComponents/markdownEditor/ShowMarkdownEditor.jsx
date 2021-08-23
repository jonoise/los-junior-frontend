import { useDispatch, useSelector } from 'react-redux'
import { selectPage, updateComponent } from '../../../pageSlice'
import {
  selectPageSettings,
  setUnsavedChanges,
} from '../../../pageSettingsSlice'
import Editor from '@monaco-editor/react'
import { useEffect, useRef } from 'react'
import { refreshContent } from './markdownEditorSlice'

const ShowMarkdownEditor = () => {
  const dispatch = useDispatch()
  const editorRef = useRef()
  const page = useSelector(selectPage)
  const { currentEditor, currentComponentId } = useSelector(selectPageSettings)

  let markdownComponent = page.components[currentComponentId]

  const handleEditorDidMount = (editor, monaco) => {
    // Getting the editor once it mounts
    editorRef.current = editor

    // Focusing the Editor once it mounts
    editorRef.current.focus()

    // // Setting initial value
    // setPostContent(editorRef.current.getValue())
  }

  const handleEditorChange = (e) => {
    dispatch(refreshContent(markdownComponent.content))

    const addToStateNewMarkdown = {
      ...markdownComponent,
      content: e,
    }
    const payload = {
      uuid: markdownComponent.uuid,
      component: addToStateNewMarkdown,
    }
    dispatch(updateComponent(payload))
  }

  useEffect(() => {
    markdownComponent = page.components[currentComponentId]
    dispatch(refreshContent(markdownComponent.content))
  }, [currentComponentId])

  return (
    <Editor
      height="90%"
      defaultLanguage="markdown"
      theme="vs-dark"
      options={{
        wordWrap: true,
        lineNumbers: 'off',
        minimap: { enabled: false },
      }}
      onMount={handleEditorDidMount}
      defaultValue={markdownComponent.content}
      value={markdownComponent.content}
      onChange={handleEditorChange}
    />
  )
}

export default ShowMarkdownEditor
