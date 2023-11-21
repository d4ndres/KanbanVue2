<script>
export default {
  props: {
    selectedDefault: {
      type: Object,
      default: {},
    }
  },
  data() {
    return {
      title: this.selectedDefault.title,
      description: this.selectedDefault.description ?? '',
      subtasks: this.selectedDefault.subtasks ?? [],
      status: this.selectedDefault.columnId,

    }
  },
  computed: {
    columns() {
      return this.$store.state.columns.map(column => ({ title: column.title, id: column.id }))
    }
  },
  methods: {
    deleteTask() {
      this.$store.dispatch('deleteTask', { task: this.selectedDefault, columnId: this.selectedDefault.columnId})
      this.$emit('close')
    },
    editTask() {
      this.$emit('openEditTask', this.selectedDefault )
    },
    toggleSubTask( index ){
      this.subtasks[index].isDone = !this.subtasks[index].isDone
      this.updateTask()
    },
    updateTask() {
      const task = {
        ...this.selectedDefault,
        subtasks: this.subtasks,
      }
      this.$store.dispatch('updateTask', task)
    }
  },

}
</script>
<template>
  <div @click="$emit('close')"
    class="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.5)] z-10 flex cursor-pointer">
    <div @click.stop class="m-auto p-[2rem] max-w-[90%] w-[480px] bg-oscuro cursor-auto">
      <div class="flex mb-[1.5rem] cursor-pointer ">
        <h3 class="text-blanco font-semibold w-full">{{ title }}</h3>
        <div class="w-4 flex flex-col justify-between items-center h-6 relative group">
          <div class="w-1 h-1 bg-gris rounded-full group-hover:bg-hgris duration-500"></div>
          <div class="w-1 h-1 bg-gris rounded-full group-hover:bg-hgris duration-500"></div>
          <div class="w-1 h-1 bg-gris rounded-full group-hover:bg-hgris duration-500"></div>
          
          <div class="bg-bg w-48 rounded-lg absolute left-full hidden group-hover:block duration-1000 opacity-0 group-hover:opacity-100">
            <div @click="editTask" class="p-4 pb-2 rounded-t-lg hover:bg-hoscuro duration-500">Edit Task</div>
            <div @click="deleteTask" class="text-rojo p-4 rounded-b-lg pt-2 hover:bg-hoscuro duration-500">Delete Task</div>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-[1.5rem]" v-if="description">
          <p>
            {{ description }}
          </p>
        </div>

        <div class="mb-[1.5rem]" v-if="subtasks.length">
          <p class="text-blanco text-sm mb-[1rem] font-bold">Subtasks</p>
          <div class="flex flex-col gap-2 my-[0.4rem] ">
            <div v-for="(subtask, index) in subtasks" :key="subtask + index"
              @click="toggleSubTask(index)" class="flex items-center bg-bg p-3">
              <div>
                <div class="w-5 h-5 bg-oscuro border-hoscuro border-2 cursor-pointer flex justify-center items-center">
                  <span v-show="subtask.isDone" class="text-xs">✔</span>
                </div>
              </div>
              <div class="ml-3">
                <p>{{ subtask.title }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label class="text-blanco text-sm font-bold" for="">Status</label>
          <select v-model="status" @change="updateTask" required>
            <option class="bg-bg" v-for="column in columns" :key="column.id" :value="column.id">{{ column.title }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
select {
  @apply bg-oscuro border border-hoscuro rounded-md py-1 p-3 outline-none text-base hover:border-morado cursor-pointer box-border;
  padding: 0.5rem;
}
</style>