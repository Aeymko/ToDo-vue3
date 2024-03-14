<template>

    <div class="task-create-input-container">
        <input v-model="newTaskName" @keyup.enter="createTask" class="task-create-input" type="text" placeholder="Enter your new ToDo...">
        <svg @click="createTask" class="task-create-plus" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 2.34375C6.8999 2.34375 2.34375 6.8999 2.34375 12.5C2.34375 18.1001 6.8999 22.6562 12.5 22.6562C18.1001 22.6562 22.6562 18.1001 22.6562 12.5C22.6562 6.8999 18.1001 2.34375 12.5 2.34375ZM17.1875 13.2812H13.2812V17.1875H11.7188V13.2812H7.8125V11.7188H11.7188V7.8125H13.2812V11.7188H17.1875V13.2812Z" fill="black" fill-opacity="0.5"/></svg>
    </div>
    
</template>


<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const newTaskName = ref('');
const store = useStore();

const createTask = () => {
  if (newTaskName.value.trim() !== '') {
    const task = {
      id: uuidv4(),
      name: newTaskName.value,
      done: false,
      created_date: new Date().toISOString(),
    };
    store.dispatch('addTask', task);
    newTaskName.value = '';
  }
};

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
</script>

<style>
.task-create-input-container {
    position: relative;
    display: inline-block;
    width: 350px;
    margin: auto;
}

.task-create-input {
    height: 50px;
    width: 100%;
    padding: 15px;
    background-color: #F0F0F0;
    border-color: initial !important;
    border-radius: 10px;
    border: none;
    outline: none;
    box-shadow: 0px 0px 20px 40px white;
}

.task-create-plus {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
}
</style>