import Vue from 'vue'
import Vuex from 'vuex'
import { nanoid } from 'nanoid'

Vue.use(Vuex)


const saveAndGetColumns = store => {
  const columns = localStorage.getItem('columns');
  if (columns) {
    store.commit('setColumns', JSON.parse(columns));
  }
  store.subscribe((mutation, state) => {
    localStorage.setItem('columns', JSON.stringify(state.columns));
  })
}

const store = new Vuex.Store({
  plugins: [saveAndGetColumns],
  state: {
    columns: [
      {
        id: nanoid(),
        title: "Backlog",
        color: '#49C4E5',
        tasks: [
          {
            id: nanoid(),
            title: "Create marketing landing page",
            createdAt: new Date(),
          },

          {
            id: nanoid(),
            title: "Add Firebase Analytics",
            createdAt: new Date(),
          },


        ],
      },
      {
        id: nanoid(),
        title: "In Progress",
        color: '#8471F2',
        tasks: [

          {
            id: nanoid(),
            title: "Install SSL certificate",
            createdAt: new Date(),
          },

          {
            id: nanoid(),
            title: "Refactor codebase",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Document the API",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Conduct user testing",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: nanoid(),
        title: "Done",
        color: '#67E2AE',
        tasks: [
          {
            id: nanoid(),
            title: "Finalize marketing landing page",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Prepare weekly newsletter",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Design database schema",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Monitor system performance",
            createdAt: new Date(),
          },
        ],
      },
    ],
    board: 0
  },
  mutations: {
    setColumns(state, columns) {
      state.columns = columns;
    },
    updateColumns(state, payload) {
      state.columns = payload;
    },
    addColumn(state, column) {
      state.columns.push(column);
    },
    addTask(state, {task, columnId}) {
      const index = state.columns.findIndex(column => column.id === columnId);
      const newTask = {
        id: nanoid(),
        createdAt: new Date(),
        ...task
      }
      state.columns[index].tasks.push(newTask);
    },
    deleteTask(state, { task, columnId }) {
      const indexColumn = state.columns.findIndex(column => column.id === columnId);
      state.columns[indexColumn].tasks = state.columns[indexColumn].tasks.filter(item => item.id !== task.id);
    },
    updateTask(state, { task, columnId}) {
      const indexColumn = state.columns.findIndex(column => column.id === columnId);
      const indexTask = state.columns[indexColumn].tasks.findIndex(item => item.id === task.id);
      const updateTask = {
        ...task,
        lastModified: new Date(),
      }
      state.columns[indexColumn].tasks[indexTask] = updateTask;
      state.columns = [...state.columns];
    },
    moveTask(state) {
      state.columns = [...state.columns];
    }
  },
  actions: {
    updateColumns({ commit }, payload) {
      commit('updateColumns', payload);
    },
    addColumn({ commit }) {
      // Deberia existir algo para recibir los datos y despues actualizarlo 
      const column = {
        id: nanoid(),
        title: "",
        tasks: [],
      }
      commit('addColumn', column);
    },
    addTask({ commit }, {task, columnId} ) {
      commit('addTask', { task, columnId });
    },
    deleteTask({ commit }, {task, columnId}) {
      commit('deleteTask', { task, columnId });
    },
    updateTask( { commit }, {task, columnId} ) {
      commit('updateTask', { task, columnId });
    },
  },
  getters: {

  }
})

export default store;