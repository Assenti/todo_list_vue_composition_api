export interface Todo {
    id: number,
    title: string,
    status: string,
    createdAt: string
}

export interface Todos {
    todos: Todo[]
}