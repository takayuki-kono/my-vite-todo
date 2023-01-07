<script setup>

import {ref} from 'vue';
import { useTodoList } from '/src/composables/useTodoList.js'

const todoRef = ref('');
// const todoListRef = ref([
//     // { id: 1, task: 'TODO1' },
//     // { id: 2, task: 'TODO2' },
//     // { id: 3, task: 'TODO3' },
// ]);

const ls = localStorage.todoList;

const {todoListRef, add, show, edit, del, check} = useTodoList();

todoListRef.value = ls ? JSON.parse(ls) : [];

const addTodo = () => {
    // console.log(todoRef.value);
    // localStorage.todoList = todoRef.value;
    // const id = new Date().getTime();

    // todoListRef.value.push({ id: id, task: todoRef.value});

    // localStorage.todoList = JSON.stringify(todoListRef.value);

    add(todoRef.value);
    todoRef.value = '';
};

const todoExample = ref(['example', 'example2', 'example3'])

const isEditRef = ref(false);

let editId = -1;

const showTodo = (id) => {
    // const todo = getTodoById(id);
    // todoRef.value = todo.task;
    todoRef.value = show(id);
    isEditRef.value = true;
    // editId = id;
}

const editTodo = () => {
    // const todo = getTodoById(editId);
    // const idx = getTodoIdxById(editId);

    // todo.task = todoRef.value;

    // todoListRef.value.splice(idx, 1, todo);

    // localStorage.todoList = JSON.stringify(todoListRef.value);

    edit(todoRef.value);
    isEditRef.value = false;

    // editIndex = -1;

    todoRef.value = '';

};

const deleteTodo = (id) => {
    // const todo = getTodoById(id);
    // const idx = getTodoIdxById(id);

    // const {todo, idx} = useTodoList(id);

    // const delMsg = '「' + todo.task + '」を削除しますか？';
    // if(!confirm(delMsg)) return;

    // todoListRef.value.splice(idx, 1);
    // localStorage.todoList = JSON.stringify(todoListRef.value);
    del(id);
}

// const getTodoById = (id) => {
//     return todoListRef.value.find((todo) => todo.id === id);
// }

// const getTodoIdxById = (id) => {
//     return todoListRef.value.findIndex((todo) => {
//         console.log(todo.id);
//         console.log(id);
//         return todo.id === id;
//     } );

// }

const changeCheck = (id) => {
    check(id);
}



</script>

<template>
    <div class="box_input">
        <input 
            type="text" 
            class="todo_input"
            v-model="todoRef" 
            placeholder="+ TODOを入力" 
        />
        <button class="btn" @click="editTodo" v-if="isEditRef">変更</button>
        <button class="btn" @click="addTodo" v-else>追加</button>
    </div>
    <div class="box_list">
        <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
            <div class="todo">
                <input type="checkbox" class="check" /><label>{{todo.task}}</label>
            </div>
            <div class="btns">
                <button class="btn green" @click="showTodo(todo.id)">編</button>
                <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
            </div>
        </div>
        <!-- <div class="todo_list">
            <div class="todo">
                <input type="checkbox" class="check" /><label>TODO2</label>
            </div>
            <div class="btns">
                <button class="btn green">編</button>
                <button class="btn pink">削</button>
            </div>
        </div> -->
    </div>
    <div v-for="(example, index) in todoExample" :key="index">
        <p>{{index}}.{{ example }}</p>
    </div>
</template>

<style scoped>
.box_input{
    margin-top:20px;
}
</style>