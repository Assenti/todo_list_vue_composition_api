<template>
    <div class="todo-input">
        <a-input-search
            v-if="selected.length == 0"
            placeholder="What needs to be done"
            @search="onAdd"
            v-model="todo"
            enterButton="Add"
            size="large" />
        <div class="todo-input__selected" v-else>
            <div class="todo-input__selects">
                <a-tooltip>
                    <template slot="title">{{ selected.length === todos.length ? 'Reset' : 'Select All'}}</template>
                    <a-checkbox 
                    @change="onSelectAll"
                    :checked="selected.length === todos.length"/>
                </a-tooltip>
                <div>Selected: {{ selected.length }}</div>
            </div>
            <div class="todo-input__selected-btns">

                <a-popover title="Share via" trigger="focus">
                    <template slot="content">
                        <a class="share-menu__item"
                            :class="{'disabled': isItemDisabled(item.title) }"
                            v-for="(item, index) in menuItems"
                            :key="index"
                            :href="getHref(item.title)"
                            @click="downloadXlsx(item.title)">
                            <a-icon :type="item.icon" />
                            {{item.title}}
                        </a>
                    </template>
                    <a-tooltip>
                        <template slot="title">
                            Share via
                        </template>
                        <a-button 
                            shape="circle" 
                            icon="share-alt"/>
                    </a-tooltip>
                </a-popover>
                
                <a-tooltip>
                    <template slot="title">
                        Delete All
                    </template>
                    <a-button 
                        shape="circle" 
                        icon="delete" 
                        type="danger"
                        @click="onDelete"/>
                </a-tooltip>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Todo } from '../../models';
import { createComponent, ref } from '@vue/composition-api'; 
import json2excel from 'js2excel';
import { userData } from '../../utils/userData';

export default createComponent({
    name: 'todo-input',
    props: {
        selected: Array,
        todos: Array
    },
    setup(props: { selected: Todo[]}, { emit }) {
        const email = ref<string>(userData.read('email'))
        const phone = ref<string>(userData.read('phone'))

        const menuItems = [
            { title: 'Email', icon: 'mail'}, 
            { title: 'WhatsApp', icon: 'message' }, 
            { title: 'Xlsx', icon: 'file-excel'}
        ]
        const todo = ref('')

        const onAdd = () => {
            if (todo.value) {
                emit('onAdd', todo.value)
                todo.value = ''
            }
        }

        const onSelectAll = () => {
            emit('onSelectAll')
        }

        const onDelete = () => {
            emit('onDeleteAll')
        }

        const getHandledList = (): string => {
            let result: string = ''
            for (let i = 0; i < props.selected.length; i++) {
                result += `${i+1})%20${props.selected[i].title}%20(${props.selected[i].status},%20${props.selected[i].createdAt})%0A`
            }
            return result
        }

        const downloadXlsx = (title: string) => {
            if (title === 'Xlsx') {
                try {
                    json2excel.json2excel({
                        data: props.selected,
                        name: 'todos_list'
                    });
                } catch (e) {
                    console.error(e)
                }
            }
        }

        const getHref = (title: string) => {
            if (!isItemDisabled(title)) {
                switch (title) {
                    case 'Xlsx':
                        return '#';
                    case 'WhatsApp':
                        return `https://api.whatsapp.com/send?phone=${phone.value}&text=${getHandledList()}`
                    default:
                        return `mailto:${email.value}?subject=Todos%20List&body=${getHandledList()}`
                }
            }
        }

        const isItemDisabled = (name: string) => {
            switch (name) {
                case 'Email':
                    return email.value ? false : true;
                case 'WhatsApp':
                    return phone.value ? false : true;
                default:
                    return false;
            }
        }

        return {
            onAdd,
            todo,
            onDelete,
            menuItems,
            onSelectAll,
            getHref,
            downloadXlsx,
            isItemDisabled
        }
    }
});
</script>

<style>
.todo-input {
    margin: 0 5px;
    margin-bottom: 10px;
    height: 40px;
}

.todo-input__selected {
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border-radius: 4px;
    transition: all .2s ease-in-out;    
}

.todo-input__selected-btns {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.todo-input__selected-btns > button {
    margin: 0 5px;
}

.share-menu__item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid gray;
    user-select: none;
    -moz-user-select: none; 
}

.share-menu__item:hover {
    cursor: pointer;
    background-color: #eee;
    transition: all .2s ease-in-out; 
}

.share-menu__item:active {
    transform: scale(.97);
}

.share-menu__item:last-child {
    border-bottom: none;
}

.share-menu__item.disabled {
    color: gray !important;
    cursor: not-allowed !important;
}

.share-menu__item > i {
    margin-right: 10px;
}

.share-menu__item > a {
    text-decoration: none;
}

.todo-input__selects {
    display: flex;
    align-items: center;
}

.todo-input__selects > div:last-child {
    margin-left: 10px;
}
</style>