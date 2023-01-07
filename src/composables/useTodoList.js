import {ref} from 'vue';

export const useTodoList = (id) => {
    const ls = localStorage.todoList;
    const todoListRef = ref([]);
    todoListRef.value = ls ? JSON.parse(ls) : [];

    // const todo = todoListRef.value.find((todo) => todo.id === id);
    // const idx =  todoListRef.value.findIndex((todo) => todo.id === id);

    // return {todo, idx};

    const add = (task) => {
        // console.log(todoRef.value);
        // localStorage.todoList = todoRef.value;
        const id = new Date().getTime();

        todoListRef.value.push({ id: id, task: task, checked: false });

        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const findTodoById = (id) => {
        return todoListRef.value.find((todo) => todo.id === id);
    }

    const findTodoIdxById = (id) => {
        return todoListRef.value.findIndex((todo) => todo.id === id);
    }

    const editId = ref(-1);

    const show = (id) => {
        const todo = findTodoById(id);
        editId.value = id;
        return todo.task;
    };

    const edit = (task) => {
        debugger;
        const todo = findTodoById(editId.value);
        const idx = findTodoIdxById(editId.value);

        todo.task = task;

        todoListRef.value.splice(idx, 1, todo);

        localStorage.todoList = JSON.stringify(todoListRef.value);

        editId.value = -1;
        //   isEditRef.value = false;

        //   editIndex = -1;

        //   todoRef.value = '';
    };

    const del = (id) => {
      const todo = findTodoById(id);
      // const delMsg = '「' + todo.task + '」を削除しますか？';]
      // if(!confirm)

      // const idx = getTodoIdxById(id);

      //   const { todo, idx } = useTodoList(id);

      const delMsg = '「' + todo.task + '」を削除しますか？';
      if (!confirm(delMsg)) return;
      const idx = findTodoIdxById(id);
      todoListRef.value.splice(idx, 1);
      localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const check = (id) => {
        const todo = findTodoById(id);
        const idx = findTodoIdxById(id);
        todo.checked = !todo.checked;
        todoListRef.value.splice(idx, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    }

    return { todoListRef, add, show, edit, del, check };
};
