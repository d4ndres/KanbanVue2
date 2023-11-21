<script>
import { mapActions } from 'vuex';
import draggable from 'vuedraggable'
import BoardTask from '@/components/BoardTask.vue'
import ModalNewCard from '@/components/ModalNewCard.vue';
import ModalShowCard from '@/components/ModalShowCard.vue';
import TreeDots from '@/components//TreeDots.vue';
import AdminColumn from '@/components/AdminColumn.vue';
import AdminBoard from '@/components/AdminBoard.vue';

export default {
  name: 'ManagmentBoard',
  components: {
    BoardTask,
    draggable,
    ModalNewCard,
    ModalShowCard,
    TreeDots,
    AdminColumn,
    AdminBoard,
},
  data() {
    return {
      ctrl: false,
      selectedCard: null,
      isModalNewCard: false,
      isModalShowCard: false,
      controlColumnShow: '',
      timeout: null,
    }
  },
  computed: {
    columns: {
      get() {
        return this.$store.state.columns
      },
      set(value) {
        this.$store.dispatch('updateColumns', value)
      }
    },
    nameBoard: {
      get() {
        return this.$store.state.nameBoard
      },
      set(value) {
        this.$store.dispatch('updateNameBoard', value)
      }
    },
  },
  methods: {
    ...mapActions(['deleteColumn']),
    createColumn() {
      this.$store.dispatch('addColumn')
      this.$nextTick(() => document.querySelector('.column:last-of-type .title-column').focus())
    },
    newCard( columnId ) {
      this.selectedCard = { columnId }
      this.isModalNewCard = true
    },
    showCard( task, columnId ) {
      this.selectedCard = { ...task, columnId }
      this.isModalShowCard = true
    },
    openEditTask( task ) {
      this.selectedCard = task
      this.isModalShowCard = false
      this.isModalNewCard = true
    },
    onEnd(){
      this.$store.commit('moveTask')
    },
    outControlMouse() {
      this.timeout = setTimeout(() => {
        this.controlColumnShow = ''
      }, 500);
    },
    inControlMouse() {
      clearTimeout(this.timeout)
    },
    setControlColumn( columnId ) {
      this.controlColumnShow = columnId
      this.timeout = setTimeout(() => {
        this.controlColumnShow = ''
      }, 700);
    },
  },
}
</script>

<template>
  <div >
    <Transition name="fade">
      <ModalNewCard 
      :selectedDefault="selectedCard"
      @close="isModalNewCard = false"
      v-if="isModalNewCard"/>
      <ModalShowCard
      :selectedDefault="selectedCard"
      @openEditTask="openEditTask"
      @close="isModalShowCard = false"
      v-if="isModalShowCard"/>
    </Transition>

    
    <div class="h-[6vh] x-border flex justify-between items-center">
      <div class="px-2 py-1 flex align-items">
        <div class="tracking-widest px-1 font-bold flex items-center">
          {{ nameBoard }}
        </div>
      </div>
      <div class="pr-4 relative">
        <TreeDots @click="setControlColumn(nameBoard)"/>
        <AdminBoard 
        v-if="controlColumnShow == nameBoard"
        @mouseleave="outControlMouse" @mouseenter="inControlMouse"
        />
      </div>
    </div>
    <div class="flex gap-4 scroll-none h-[88vh] w-full overflow-auto p-2">
      <draggable :group="{ name: 'columns' }" handle=".drag-handle" animation="300" v-model="columns">
        <transition-group class="flex gap-4  items-start">
          <div v-for="column in columns" :key="column.id" :id="column.id" class="column relative bg-gray-200 p-5 rounded min-w-[250px]">
  
            <header class="flex font-bold mb-4">
              <input 
              v-model="column.title" 
              @keyup.enter="$event.target.blur()" 
              type="text" placeholder="Enter title"
              class="title-column tracking-widest bg-bg px-1">
              
              <div class="cursor-pointer drag-handle relative">
                <TreeDots @click="setControlColumn(column.id)" />
                <Transition name="fade">
                  <AdminColumn v-if="controlColumnShow == column.id" 
                  @mouseleave="outControlMouse" @mouseenter="inControlMouse"
                  :columnId="column.id"/>
                </Transition>
              </div>
            </header>
  
            <div class="">
              <draggable :style="`border-color: ${column.color}`" class="container-tasks border-t-2"
                ghost-class="bg-blue-200" v-model="column.tasks" :group="{ name: 'tasks' }" handle=".drag-handle"
                animation="300" @end="onEnd">
                <transition-group class="" :class="{ 'block min-h-[1px] duration-500': column.tasks.length == 0 }">
                  <BoardTask
                  v-for="task in column.tasks" :key="task.id" :task="task" 
                  @click="showCard(task, column.id)"
                  />
                </transition-group>
              </draggable>
            </div>
  
  
            <footer class="text-gray-500">
              <div class="w-full p-2 mt-2 rounded hover:text-hgris cursor-pointer" @click="newCard(column.id)">
                <span>+ Add a card</span>
              </div>
            </footer>
          </div>
        </transition-group>
      </draggable>
      <div>
        <button class="bg-oscuro p-5 rounded min-w-[250px]" @click="createColumn">
          + Add Another Column
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.scroll-none::-webkit-scrollbar {
  display: none;
}
</style>