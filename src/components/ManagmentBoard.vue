<script>
import { nanoid } from 'nanoid'
import draggable from 'vuedraggable'
import BoardTask from '@/components/BoardTask.vue'
import NewTask from '@/components/NewTask.vue'
import DragHandle from '@/components/DragHandle.vue'

export default {
  name: 'ManagmentBoard',
  components: {
    BoardTask,
    DragHandle,
    draggable,
    NewTask
  },
  data() {
    return {
      columns: [
        {
          id: nanoid(),
          title: "Backlog",
          tasks: [
            {
              id: nanoid(),
              title: "Create marketing landing page",
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
          tasks: [
            {
              id: nanoid(),
              title: "Add Google Analytics",
              createdAt: new Date(),
            },
            {
              id: nanoid(),
              title: "Install SSL certificate",
              createdAt: new Date(),
            },
          ],
        },
        {
          id: nanoid(),
          title: "Done",
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
          ],
        },
      ],
    }
  },
  methods: {
    createColumn() {
      const column = {
        id: nanoid(),
        title: "",
        tasks: [],
      }

      this.columns.push(column)

      this.$nextTick( () => document.querySelector('.column:last-of-type .title-column').focus() )
    }
  }
}
</script>

<template>
  <div class="flex overflow-x-auto gap-4">
    <draggable :group="{ name: 'columns' }" handle=".drag-handle" animation="300" v-model="columns">
      <transition-group name="flip-transition" class="flex gap-4  items-start">
        <div v-for="column in columns" :key="column.id" class="column relative bg-gray-200 p-5 rounded min-w-[250px]">
          <div @click="columns = columns.filter(item => item.id != column.id)"
            class="bg-red-400 hover:bg-red-600 absolute left-1 top-1 w-[15px] h-[15px] rounded-[50%] cursor-pointer">
          </div>
          <header class="flex font-bold mb-4">
            <!--   -->
            <input v-model="column.title" type="text" @keyup.enter="$event.target.blur()"
              class="title-column bg-transparent focus:bg-white px-1 w-[100%]" placeholder="Enter title">
            <DragHandle />
          </header>

          <div class="">
            <draggable
            class="border-t-2 border-blue-300"
            ghost-class="bg-blue-200"
            v-model="column.tasks" :group="{ name: 'tasks' }" handle=".drag-handle" animation="300">
              <transition-group :class="{ 'block min-h-[1px] duration-500' : column.tasks.length == 0}">
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
      <button class="bg-gray-200 p-5 whitespace-nowrap p-2 rounded opacity-50" @click="createColumn">
        + Add Another Column
      </button>
    </div>
  </div>
</template>


<style scoped>
</style>
