export const filterColumns = (uuid, todoComponent) => {
    const newPendingIds = todoComponent.columns.pending_tasks.tasksIds.filter(
        (id) => id !== uuid
    )
    const newCompletedIds =
        todoComponent.columns.completed_tasks.tasksIds.filter((id) => id !== uuid)

    const newTasksIds = todoComponent.tasksIds.filter((id) => id !== uuid)

    return {
        newPendingIds,
        newCompletedIds,
        newTasksIds,
    }
}