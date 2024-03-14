import { createStore } from 'vuex'

export const store = createStore({
  state: {
    tasks: [],
    selectedTask: ''
  },
  getters: {
    getTaskById: (state) => (taskId) => {
      return state.tasks.find((task) => task.id === taskId);
    },
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    toggleTask(state, taskId) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.done = !task.done;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },

    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    renameTask(state, { taskId, newName }) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.name = newName;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },

    selectTask(state, { taskId }) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        state.selectedTask = taskId;
      }
      else {
        state.selectedTask = null;
      }
    },

    initialiseStore(state) {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        state.tasks = JSON.parse(storedTasks);
      }
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', task);
    },

    toggleTask({ commit }, taskId) {
      commit('toggleTask', taskId);
    },

    deleteTask({ commit }, taskId) {
      commit('deleteTask', taskId);
    },

    renameTask({ commit }, { taskId, newName }) {
      commit('renameTask', { taskId, newName });
    },
  }
})