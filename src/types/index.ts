export type Task = {
    id:string,
    task:string,
    description:string,
    state: TaskStateWork
}

export type TaskStateWork = "completed" | "in work" | "postponed" | "canceled"

export type TaskList = {
    list: Task[]
}

export type TaskActions = 
    {type:"save-task", payload: {newTask: Task}} |
    {type:"change-state",payload:{newTask:Task}} |
    {type:"delete-task", payload:{id:Task["id"]}} |
    {type:"change-activeid",payload:{activeId:Task["id"]}} |
    {type:"update-task",payload:{updateTask:Task}}

export type TaskState = {
    tasks: Task[],
    activeId: Task["id"]
}

