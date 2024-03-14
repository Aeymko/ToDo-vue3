<template>
    <div class="selected-task-container">
        <div class="back-to-list" @click="unselectTask()">
           < <span class="back-to-list-text">Back</span>
        </div>

        <div class="selected-task-status">
            <svg v-if="!task.done" @click="toggleTask(task.id)" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="23" height="23" rx="2" stroke="black" stroke-width="2"/></svg>
            <svg v-if="task.done" @click="toggleTask(task.id)" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">  <rect width="25" height="25" rx="3" fill="black" fill-opacity="0.2" />  <path d="M18 9L11 17L8 14" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </div>

        <input type="text" class="selected-task-name" v-model="newTaskName"></input>

        <div class="selected-task-date">{{ formatDateTime(task.created_date) }}</div>

        <div class="selected-task-delete" @click="deleteTask(task.id)">Delete</div>
    </div>

</template>

<script setup>

import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const $store = useStore();

const taskId = computed(() => $store.state.selectedTask);

const task = computed(() => {
    return $store.getters.getTaskById(taskId.value);
});

const newTaskName = ref('');

newTaskName.value = task.value.name;

const toggleTask = (taskId) => {
  $store.dispatch('toggleTask', taskId);
};

const deleteTask = (taskId) => {
  unselectTask();
  $store.dispatch('deleteTask', taskId);
  
};

const unselectTask = () => {
  $store.commit('selectTask',  {} );
};

const renameTask = () => {
  if (newTaskName.value.trim() !== '') {
    $store.dispatch('renameTask', { taskId: taskId.value, newName: newTaskName.value });
  }
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return `Created at: ${date.toLocaleString('en-GB', options).replace(/\//g, '.')}`;
};

watch(newTaskName, (newValue) => {
    renameTask();
});

</script>

<style>
.selected-task-container {
    max-width: 430px;
    margin: auto;
}
.back-to-list {
    color: rgba(0, 0, 0, 0.2);
    margin-bottom: 56px;
    cursor: pointer;
}
.back-to-list-text {
    text-decoration: underline;
    text-decoration-skip-ink: none;
}
.selected-task-status {
    cursor: pointer;
}
.selected-task-name {
    margin-top: 10px;
    margin-bottom: 50px;
    font-size: 40px;
    line-height: 46px;
    border: none;
    outline: none;
}
.selected-task-date {
    color: rgba(0, 0, 0, 0.2);
    margin-bottom: 14px;
}
.selected-task-delete {
    color: #e74040;
    cursor: pointer;
}
</style>