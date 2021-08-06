import HideEditor from './editorComponents/HideEditor'
import ShowEditor from './editorComponents/ShowEditor'
import { useSelector } from 'react-redux'
import { selectPageSettings } from '../../../app/pageSettings'
import EditorNav from './editorComponents/EditorNav'

function Editor() {
  const { editorIsOpen } = useSelector(selectPageSettings)

  return (
    <>
      <EditorNav />
      {editorIsOpen ? <ShowEditor /> : <HideEditor />}
    </>
  )
}

export default Editor
