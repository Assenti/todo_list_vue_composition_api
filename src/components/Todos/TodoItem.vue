<template>
    <div class="todo-item" 
        @mouseover="contextMenu = true"
        @mouseleave="contextMenu = false">
        <div class="todo-item__left">
            <a-checkbox
                @change="onSelect"
                :checked="isSelected"/>
            <a-popover title="Todo" trigger="focus">
                <template slot="content">
                    <p>{{ todo.title }}</p>
                </template>
                <span tabindex="-1" class="truncate">{{ todo.title }}</span>
            </a-popover>
        </div>
        <div class="todo-item__right">
            <div class="todo-item__status" v-if="!contextMenu">
                <a-tag :color="todoStatusColor()">{{ todo.status }}</a-tag>
                <div>{{new Date().toLocaleDateString()}}</div>
            </div>
            <div class="todo-item__right-btns" v-else>
                <a-tooltip v-if="todo.status !== 'done'">
                    <template slot="title">Done</template>
                    <a-button shape="circle" icon="check" @click="onDone"/>
                </a-tooltip>
                <a-tooltip>
                    <template slot="title">Edit</template>
                    <a-button shape="circle" icon="edit" @click="editMode = true"/>
                </a-tooltip>
                <a-tooltip>
                    <template slot="title">Delete</template>
                    <a-button shape="circle" icon="delete" type="danger" @click="onDelete"/>
                </a-tooltip>
            </div>
        </div>
        <a-modal title="Edit todo" v-model="editMode" @ok="onEdit">
            <a-textarea
                v-model="editTodo"
                :rows="2" 
                placeholder="Title is required" />
        </a-modal>
    </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import { Todo } from '@/models';

export default createComponent({
    name: 'todo-item',
    props: {
        todo: Object,
        isSelected: Boolean
    },
    setup(props: { todo: Todo }, { emit }) {
        const contextMenu = ref<boolean>(false)
        const editMode = ref<boolean>(false)
        const editTodo = ref<string>(props.todo.title)

        const onSelect = () => {
            emit('onSelect', props.todo)
        }

        const onDone = () => {
            emit('onDone', props.todo)
        }

        const onDelete = () => {
            emit('onDelete', props.todo.id)
        }

        const onEdit = () => {
            editMode.value = false
            emit('onEdit', { id: props.todo.id, todo: editTodo.value })
        }

        const textCut = (text: string) => {
            if (text && text.length > 28) return `${text.slice(0, 28)}...`
            else return text
        }

        const todoStatusColor = (): string => {
            switch (props.todo.status) {
                case 'done':
                    return '#43a047';
                default:
                    return '#2db7f5';
            }
        }

        return {
            onSelect,
            contextMenu,
            onDone,
            todoStatusColor,
            textCut,
            onDelete,
            onEdit,
            editMode,
            editTodo
        }
    }
});
</script>

<style>
.todo-item {
    background-color: #fff;
    padding: 0 15px;
    height: 55px;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.todo-item:last-chlid {
    border-bottom: none;
}

.todo-item:hover {
    background-color: #eee;
    cursor: pointer;
    transition: all .2s ease-in-out;
}

.todo-item__status {
    text-align: center;
}

.todo-item__status > div:last-child {
    font-size: .75rem;
}

.todo-item__left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: calc(100% - 72px);
}

.todo-item__right {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.todo-item__right-btns {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    transition: all .2s ease-in-out;
}

.todo-item__right-btns > button {
    margin: 0 5px;
}

.truncate {
    width: 100%;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>