<script>
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'
import BoardTask from '@/components/BoardTask.vue'
import NewTask from '@/components/NewTask.vue'
import { ref } from '@vue/composition-api'



export default {
  name: 'ManagmentBoard',
  components: {
    BoardTask,
    draggable,
    NewTask,
  },
  setup() {
    const columns = ref([
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
            title: "Install SSL certificate",
            createdAt: new Date(),
          },
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

          {
            id: nanoid(),
            title: "Add SEO keywords",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Add Google Analytics",
            createdAt: new Date(),
          }
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
            title: "Implement user authentication",
            createdAt: new Date(),
          },

          {
            id: nanoid(),
            title: "Optimize page load speed",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Refactor codebase",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Improve UI/UX",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Fix reported bugs",
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
            title: "Write unit tests",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Setup continuous integration",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Deploy to production",
            createdAt: new Date(),
          },
          {
            id: nanoid(),
            title: "Monitor system performance",
            createdAt: new Date(),
          },
        ],
      },
    ],)

    function createColumn() {
      const column = {
        id: nanoid(),
        title: "",
        tasks: [],
      }
      columns.value.push(column)
      this.$nextTick(() => document.querySelector('.column:last-of-type .title-column').focus())


    }

    return {
      columns,
      createColumn,
    }
  }

}
</script>

<template>
  <div class="board flex gap-4 overflow-auto">
    <draggable :group="{ name: 'columns' }" handle=".drag-handle" animation="300" v-model="columns">
      <transition-group class="flex gap-4  items-start">
        <div v-for="column in columns" :key="column.id" class="column relative bg-gray-200 p-5 rounded min-w-[250px]">

          <!-- <div @click="columns = columns.filter(item => item.id != column.id)"
            class="bg-rojo hover:bg-hrojo absolute left-1 top-1 w-[15px] h-[15px] rounded-[50%] cursor-pointer">
          </div> -->

          <header class="flex font-bold mb-4">
            <div class="cursor-pointer">
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
            <NewTask @add-task="column.tasks.push($event)" />
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

<style scoped>
.board::-webkit-scrollbar {
  display: none;
}
</style>

