import Vue from 'vue'
import Vuex from 'vuex'
import { nanoid } from 'nanoid'

Vue.use(Vuex)


const saveAndGetBoard = store => {

  // Obtiene los datos del localStorage y los guarda en el store
  const columns = localStorage.getItem( store.state.nameBoard);
  if (columns) {
    store.commit('setColumns', JSON.parse(columns));
  }

  // Consulta si existe una boards que es una lista de strings si no la crea con el primer elemento con state.nameBoard
  const boards = localStorage.getItem('boards');
  if (!boards) {
    localStorage.setItem('boards', JSON.stringify([store.state.nameBoard]));
    localStorage.setItem( store.state.nameBoard, JSON.stringify(store.state.columns));
  } else {
    store.commit('setBoards', JSON.parse(boards))
    store.commit('setNameBoard', JSON.parse(boards)[0])
  }

  store.subscribe((mutation, state) => {
    if( mutation.type == 'updateNameBoard' ) return;

    if( mutation.type == 'renameBoard' ) {
      const oldBoards = JSON.parse(localStorage.getItem('boards'))
      const newBoards = state.boards.filter( board => board !==  mutation.payload);
      const nameBoardToDeleted = oldBoards.filter(board => !newBoards.includes(board));
      console.log("nombre eliminado", nameBoardToDeleted);
      localStorage.removeItem(nameBoardToDeleted);
      localStorage.setItem('boards', JSON.stringify(state.boards));
    }

    console.log(mutation.type);
    if( mutation.type == 'createBoard') {
      localStorage.setItem('boards', JSON.stringify(state.boards));
    }
    
    if( mutation.type == 'deleteBoard' ){
      const oldBoards = JSON.parse(localStorage.getItem('boards'))
      const newBoards = state.boards;
      const boardDeleted = oldBoards.filter(board => !newBoards.includes(board));
      localStorage.removeItem(boardDeleted);
      localStorage.setItem('boards', JSON.stringify(state.boards));
    }
    
    if( mutation.type == 'updateBoards' ){
      localStorage.setItem('boards', JSON.stringify(state.boards));
      return
    }

    // Suscripción primaria
    localStorage.setItem( state.nameBoard, JSON.stringify(state.columns));
  })
}

const store = new Vuex.Store({
  plugins: [saveAndGetBoard],
  state: {
    isChanged: false,
    boards: ['Main board'],
    nameBoard: 'Main board',
    columns: [
      {
        id: nanoid(),
        title: "Backlog",
        color: '#49C4E5',
        tasks: [
          {
            id: nanoid(),
            title: "Task 1 Backlog",
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
            title: "Task 2 in progress",
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
            title: "Task 3 Done",
            createdAt: new Date(),
          },
        ],
      },
    ],
    
  },
  mutations: {
    setColumns(state, columns) {
      state.columns = columns;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setNameBoard(state, name) {
      state.nameBoard = name;
    },
    updateBoards(state, boards) {
      state.boards = boards;
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
    },
    updateNameBoard(state, name) {
      state.nameBoard = name;
    },
    createBoard(state, name) {
      state.nameBoard = name;
      state.boards.push(name);
      state.columns = [
        {
          id: nanoid(),
          title: "Backlog",
          color: '#49C4E5',
          tasks: [
            {
              id: nanoid(),
              title: "Task 1 Backlog",
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
              title: "Task 2 in progress",
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
              title: "Task 3 Done",
              createdAt: new Date(),
            },
          ],
        },
      ]
    },
    toggleIsChanged(state) {
      state.isChanged = !state.isChanged;
    },
    deleteColumn(state, columnId) {
      state.columns = state.columns.filter(column => column.id !== columnId);
    },
    updateColumnTitle(state, { columnId, title }) {
      const index = state.columns.findIndex(column => column.id === columnId);
      state.columns[index].title = title.trim();
    },
    updateColumnColor(state, { columnId, color }) {
      const index = state.columns.findIndex(column => column.id === columnId);
      state.columns[index].color = color;
    },
    deleteBoard(state) {
      state.boards = state.boards.filter(board => board !== state.nameBoard);
      state.nameBoard = state.boards[0];
    },
    renameBoard(state, name) {
      const index = state.boards.findIndex(board => board === state.nameBoard);
      state.nameBoard = name;
      state.boards[index] = name;
    }
  },
  actions: {
    updateBoards({ commit }, boards) {
      commit('updateBoards', boards);
    },
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
    updateNameBoard({ commit }, name) {
      // Elimina espacios en blanco al final o inicio
      const newName = name.trim();
      commit('updateNameBoard', newName);
    },
    createBoard({ commit }, name) {
      const newName = name.trim();
      commit('createBoard', newName);
    },
    toggleIsChanged({ commit }) {
      commit('toggleIsChanged');
    },
    async changeBoard({ commit, dispatch}, nameBoard ){
      await dispatch('toggleIsChanged');
      const board = JSON.parse(localStorage.getItem( nameBoard));
      await dispatch('updateNameBoard', nameBoard);
      commit('setColumns', board);
      dispatch('toggleIsChanged');
    },
    deleteColumn({ commit }, columnId) {
      commit('deleteColumn', columnId);
    },
    updateColumnTitle({ commit }, { columnId, title }) {
      commit('updateColumnTitle', { columnId, title });
    },
    updateColumnColor({ commit }, { columnId, color }) {
      commit('updateColumnColor', { columnId, color });
    },
    deleteBoard({commit, dispatch}) {
      commit('deleteBoard');
    },
    renameBoard({ commit }, name) {
      const newName = name.trim();
      commit('renameBoard', newName);
    }
  },
  getters: {

  }
})

export default store;