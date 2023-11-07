<script>
import draggable from 'vuedraggable'
import BoardTask from '@/components/BoardTask.vue'
import ModalAdminTask from '@/components/ModalAdminTask.vue';
import { useMagicKeys } from '@vueuse/core';
export default {
  name: 'ManagmentBoard',
  components: {
    BoardTask,
    draggable,
    ModalAdminTask,
},
  data() {
    return {
      ModalAdminTask: false,
      ctrl: false,
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
    newCard() {
      this.ModalAdminTask = true
    }
  },
}
</script>

<template>
  <div class="flex gap-4">
    <ModalAdminTask 
    @close="ModalAdminTask = false"
    v-if="ModalAdminTask"/>
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
                <BoardTask :task="task" v-for="task in column.tasks" :key="task.id" />
              </transition-group>
            </draggable>
          </div>


          <footer class="text-gray-500">
            <div class="w-full p-2 mt-2 rounded hover:text-hgris cursor-pointer" @click="newCard">
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
