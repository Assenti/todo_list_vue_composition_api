<template>
    <div class="todos-container">
        <todo-input @onAdd="addTodo" 
            :selected="selected"
            :todos="todos"
            @onSelectAll="handleSelectAll"
            @onDeleteAll="handleDeleteAll"/>
        <div class="todo-list">
            <todo-item 
                v-for="(item) in todos" 
                :key="item.id" 
                :todo="item"
                :isSelected="isSelected(item)"
                @onSelect="handleSelect"
                @onDone="handleDone"
                @onDelete="handleDelete"
                @onEdit="handleEdit"/>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import { Todo } from '../../models';
import { db } from '../../utils/dbService';
import TodoInput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';

export default createComponent({
    name: 'todos',
    components: {
        TodoInput,
        TodoItem
    },
    setup() {
        const todos = ref<Todo[]>(db.read('todos').todos)

        const getTodosLastId = (): number => {
            let max: number = 1
            if (todos.value.length > 0) {
                for (const item of todos.value) {
                    if (item.id > max) max = item.id
                }
                return ++max
            } else {
                return max
            }
        }

        const addTodo = (todo: string) => {
            todos.value.push({
                id: getTodosLastId(),
                title: todo,
                status: 'in-queue',
                createdAt: new Date().toLocaleDateString()
            })

            db.write('todos', { todos: todos.value })
        }

        const handleDone = (todo: Todo) => {
            for (let item of todos.value) {
                if (item.id === todo.id) item.status = 'done'
            }
            db.write('todos', { todos: todos.value })
        }

        const handleDelete = (id: number) => {
            todos.value = todos.value.filter(item => item.id != id)
            db.write('todos', { todos: todos.value })
        }

        const handleEdit = (data: any) => {
            for (let item of todos.value) {
                if (item.id === data.id) item.title = data.todo
            }
            db.write('todos', { todos: todos.value })
        }
        
        const selected = ref<Todo[]>([])

        const handleSelect = (todo: Todo) => {
            if (!isSelected(todo)) selected.value.push(todo)
            else selected.value = selected.value.filter(item => item.title !== todo.title)
        }

        const isSelected = (todo: Todo): boolean => {
            let result: boolean = false
            for (const item of selected.value) {
                if (item.title === todo.title) result = true
            }
            return result
        }

        const handleSelectAll = () => {
            if (selected.value.length < todos.value.length) selected.value = todos.value
            else selected.value = []
        }

        const handleDeleteAll = () => {
            db.remove('todos')
            todos.value = []
            selected.value = []
        }
        
        return {
            todos,
            addTodo,
            handleSelect,
            selected,
            isSelected,
            handleDone,
            handleDelete,
            handleEdit,
            handleSelectAll,
            handleDeleteAll
        }
    }
});
</script>

<style>
.todos-container {
    min-width: 350px;
    max-width: 40%;
    margin: 0 auto;
}

.todo-list {
    border-radius: 4px; 
    margin: 0 5px;
    max-height: calc(100vh - 130px);
    overflow-y: auto;
}
</style>

