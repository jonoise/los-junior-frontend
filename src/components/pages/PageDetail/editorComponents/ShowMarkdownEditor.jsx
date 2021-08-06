import { useDispatch, useSelector } from 'react-redux'
import { selectPage, updateComponent } from '../../../../app/pageSlice'
import {
  selectPageSettings,
  setUnsavedChanges,
} from '../../../../app/pageSettings'
import Editor from '@monaco-editor/react'
import { useEffect, useRef } from 'react'

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
