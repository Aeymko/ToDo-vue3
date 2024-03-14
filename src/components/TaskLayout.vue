<template>
  <div class="container">

    <div class="logo" v-if="!selectedTask">
      <img class="logo-img" src="/logo.png"/>
    </div>

    <div class="task-list-slot" v-if="!selectedTask">
      <TaskList/>
    </div>

    <div class="task-slot" v-if="selectedTask">
      <TaskSelected/>
    </div>

    <div class="task-create-slot" v-if="!selectedTask">
      <TaskCreate/>
    </div>
    
  </div>
</template>

<script setup>
import { computed, reactive, readonly, ref, onBeforeMount, isProxy, toRaw} from 'vue';
import { useStore } from 'vuex'
import TaskList from './TaskList.vue';
import TaskCreate from './TaskCreate.vue';
import TaskSelected from './TaskSelected.vue';

const $store = useStore();

const selectedTask = computed(() => $store.state.selectedTask);

onBeforeMount(() => {
  $store.commit('initialiseStore')
});

</script>

<style>
.container {
  padding: 40px;

}
.logo {
  width: 80px;
  margin: auto;
  margin-top: 70px;
  margin-bottom: 140px;
}

.logo-img {
  width: 80px;
  height: 80px;
}

.task-list-slot {
  padding-bottom: 90px;
}

.task-create-slot {
  display: flex;
  position: fixed;
  bottom: 40px;
  left: 40px;
  width: calc(100% - 80px);
  max-width: calc(100vw - 80px);
}

.task-slot {
  position: fixed;
  width: 100%;
}
</style>
