import axios from "../../../../../lib/axios"

// The payload for this funcs contains uuid and todoComponent
// payload = {uuid:string, component: {...todoComponent}}


// Request to reorder when tasks change between columns
export const reorderColumnsRequest = async (payload, session) => {
    const todoComponent = payload.component

    // get columns
    const pending_column = todoComponent.columns.pending_tasks
    const completed_column = todoComponent.columns.completed_tasks

    // make the request
    const patch_object = {
        pending_tasksIds: pending_column.tasksIds,
        completed_tasksIds: completed_column.tasksIds
    }
    const res = await axios('PATCH', `/pages/todos/${todoComponent.uuid}/`, patch_object, session)
    console.log(res)
}

// Request to reorder when tasks stay in the same column