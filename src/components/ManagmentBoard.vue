<script>
import draggable from 'vuedraggable'
import BoardTask from '@/components/BoardTask.vue'
import ModalNewCard from '@/components/ModalNewCard.vue';
import ModalShowCard from '@/components/ModalShowCard.vue';

export default {
  name: 'ManagmentBoard',
  components: {
    BoardTask,
    draggable,
    ModalNewCard,
    ModalShowCard,
},
  data() {
    return {
      ctrl: false,
      
      selectedCard: null,
      isModalNewCard: false,
      isModalShowCard: false,
    }
  },
  mounted() {
    // const { ctrl } = useMagicKeys()
    // this.ctrl = ctrl
  },
  computed: {
    columns: {
      get() {
        return this.$store.state.columns
      },
      set(value) {
        this.$store.dispatch('updateColumns', value)
      }
    }
  },
  methods: {
    createColumn() {
      this.$store.dispatch('addColumn')
      this.$nextTick(() => document.querySelector('.column:last-of-type .title-column').focus())
    },
    newCard( selectedCard ) {
      this.selectedCard = selectedCard
      this.isModalNewCard = true
    },
    showCard( selectedCard ) {
      this.selectedCard = selectedCard
      this.isModalShowCard = true
    }
  },
}
</script>

<template>
  <div class="flex gap-4">
    <ModalNewCard 
    :selectedDefault="selectedCard"
    @close="isModalNewCard = false"
    v-if="isModalNewCard"/>
    <ModalShowCard
    :selectedDefault="selectedCard"
    @close="isModalShowCard = false"
    v-if="isModalShowCard"/>
    <draggable :group="{ name: 'columns', }" handle=".drag-handle" animation="300" v-model="columns">
      <transition-group class="flex gap-4  items-start">
        <div v-for="column in columns" :key="column.id" class="column relative bg-gray-200 p-5 rounded min-w-[250px]">

          <header class="flex font-bold mb-4">
            <div class="cursor-pointer drag-handle">
              <span>∷</span>
            </div>

            <input v-model="column.title" @keyup.enter="$event.target.blur()" type="text" placeholder="Enter title"
              class="title-column tracking-widest bg-bg px-1">
          </header>

          <div class="">
            <draggable :style="`border-color: ${column.color}`" class="container-tasks border-t-2"
              ghost-class="bg-blue-200" v-model="column.tasks" :group="{ name: 'tasks' }" handle=".drag-handle"
              animation="300">
              <transition-group class="" :class="{ 'block min-h-[1px] duration-500': column.tasks.length == 0 }">
                <BoardTask v-for="task in column.tasks" :key="task.id" :task="task" @showCard="showCard"/>
              </transition-group>
            </draggable>
          </div>


          <footer class="text-gray-500">
            <div class="w-full p-2 mt-2 rounded hover:text-hgris cursor-pointer" @click="newCard(column)">
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
</template>
