import { Draggable } from 'react-beautiful-dnd'
import MarkdownDraggable from './draggableComponents/MarkdownDraggable/MarkdownDraggable'
import TodoDraggable from './draggableComponents/todoListDraggable/TodoDraggable'
import GradeDraggable from './draggableComponents/gradesDraggable/GradeDraggable'
function DraggableComponent({ component, index }) {
  // Here we are gonna decide what Component render based on its TYPE.
  // We gonna pass the component id and the index to the valid component.
  // We gonna fetch the active component from the state.
  // @ TYPE_ = VALIDATION
  // @ STATE = ACTIVATION
  switch (component.type_of) {
    case 'markdown':
      return (
        <Draggable draggableId={component.uuid} index={index}>
          {(provided) => (
            <MarkdownDraggable uuid={component.uuid} provided={provided} />
          )}
        </Draggable>
      )
    case 'todo':
      return (
        <Draggable draggableId={component.uuid} index={index}>
          {(provided) => (
            <TodoDraggable uuid={component.uuid} provided={provided} />
          )}
        </Draggable>
      )
    case 'grade':
      return (
        <Draggable draggableId={component.uuid} index={index}>
          {(provided) => (
            <GradeDraggable id={component.uuid} provided={provided} />
          )}
        </Draggable>
      )
    default:
      break
  }
  return true
}

export default DraggableComponent
