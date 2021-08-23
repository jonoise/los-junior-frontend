import axios from "../../../../../lib/axios"

// Request to reorder when tasks change between columns
export const reorderSwitchColumnsRequest = async (payload, session) => {
    const todoComponent = payload.component

    // get columns
    const pending_column = todoComponent.columns.pending_tasks
    const completed_column = todoComponent.columns.completed_tasks

    // make the request
    const patch_object = {
        pending_tasksIds: pending_column.tasksIds,
        completed_tasksIds: completed_column.tasksIds
    }
    await axios('PATCH', `/pages/todos/${todoComponent.uuid}/`, patch_object, session)
}

// Request to reorder when tasks stay in the same column
export const reorderSameColumnRequest = async (todoComponent, newCol, session) => {

    //make request
    let patch_object = {}
    if (newCol.id === 'pending_tasks') {
        patch_object = {
            'pending_tasksIds': newCol.tasksIds
        }
    } else {
        patch_object = {
            'completed_tasksIds': newCol.tasksIds
        }
    }
    await axios('PATCH', `/pages/todos/${todoComponent.uuid}/`, patch_object, session)
}

// SPECIFICS: 

// - The payload for this funcs contains uuid and todoComponent
// - payload = {uuid:string, component: {...todoComponent}}