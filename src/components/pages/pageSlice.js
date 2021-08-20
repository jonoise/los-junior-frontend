import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    uuid: null,
    components: {},
    column: {
        id: 'column',
        componentsIds: [],
    },
}

const pageSlice = createSlice({
    name: "pageSlice",
    initialState,
    reducers: {
        // load the PAGE coming from the backend
        loadPage: (state, action) => {
            let componentsObject = {}

            const page = action.payload
            // loop thru markdownComponents Array
            for (let i in page.markdownComponents) {
                const mdComponent = page.markdownComponents[i]
                componentsObject[mdComponent['uuid']] = mdComponent
            }

            // loop thru markdownComponents Array
            for (let i in page.todoComponents) {

                // Current TodoComponent
                const todoComponent = page.todoComponents[i]

                // NewTodoComponent -> (the current todo with columns)
                const newTodoComponent = {
                    ...todoComponent,
                    columns: {
                        pending_tasks: {
                            id: 'pending_tasks',
                            title: 'Pendientes',
                            tasksIds: todoComponent.pending_tasksIds,
                        },
                        completed_tasks: {
                            id: 'completed_tasks',
                            title: 'Completados',
                            tasksIds: todoComponent.completed_tasksIds,
                        },
                    }
                }
                // TASKS COMPONENTS
                newTodoComponent.tasksComponents = {}

                // Loop thru tasks
                for (let i in todoComponent.taskComponents) {
                    const currentTaskComponent = todoComponent.taskComponents[i]
                    // inserting all tasks in "taskComponents" object.
                    newTodoComponent.tasksComponents[currentTaskComponent.uuid] = currentTaskComponent
                }
                // adding ColumnsOrder list
                newTodoComponent['columnsOrder'] = ['pending_tasks', 'completed_tasks']

                componentsObject[newTodoComponent['uuid']] = newTodoComponent
            }

            state.uuid = page.uuid
            state.components = componentsObject
            state.column.componentsIds = page.componentsIds
        },
        // Reorder the components in the VIEW column.
        reorderColumn: (state, action) => {
            const column = state.column
            column.componentsIds = action.payload
        },
        addComponent: (state, action) => {
            console.log("ADD COMPONENT PAYLOAD: ", action.payload)
            state.components = {
                ...state.components,
                [action.payload.uuid]: action.payload
            }
            state.column.componentsIds = [...state.column.componentsIds, action.payload.uuid]
        },
        removeComponent: (state, action) => {
            const id = action.payload
            const componentsIds = state.column.componentsIds.filter(compId => {
                if (compId !== id) {
                    return compId
                }
            })
            delete state.components[id]
            state.column.componentsIds = componentsIds
        },
        updateComponent: (state, action) => {
            // payload -> obj: id, component
            const uuid = action.payload.uuid
            const newComponent = action.payload.component
            // console.log(newComponent)
            delete state.components[uuid]
            state.components[uuid] = newComponent
        }
    }
})


export const {
    loadPage,
    reorderColumn,
    addComponent,
    removeComponent,
    updateComponent
} = pageSlice.actions

export const selectPage = state => state.pageSlice

export default pageSlice.reducer