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
      title: this.selectedDefault.title ?? '',
      description: this.selectedDefault.description ?? '',
      subtasks: this.selectedDefault.subtasks ?? [{ isDone: false, title: '' }],
      status: this.selectedDefault.columnId ?? null,
    }
  },
  mounted() {
    if( this.selectedDefault.id === undefined ) {
      this.$nextTick(() => document.querySelector('#newCardTitle').focus())
    } 
    
  },
  computed: {
    columns() {
      return this.$store.state.columns.map(column => ({ title: column.title, id: column.id }))
    }
  },
  methods: {
    addSubtask( index ) {
      if( index != -1 ) 
      {
        this.subtasks.splice(index + 1, 0, { isDone: false, title: '' })
        this.$nextTick(() => document.querySelectorAll('.subtask')[index + 1].focus())
      }
      else 
      {
        this.subtasks.push({ isDone: false, title: '' })
        this.$nextTick(() => document.querySelectorAll('.subtask')[this.subtasks.length - 1].focus())
      }
    },
    deleteSubtask(index) {
      this.subtasks = this.subtasks.filter((_, idx) => idx !== index)
    },
    addTask() {
      const task = {
        title: this.title,
        description: this.description,
        subtasks: this.subtasks.filter(subtask => subtask.title !== ''),
        status: this.status,
      }
      this.$store.dispatch('addTask', {task, columnId: this.status})
      this.$emit('close')
    },
    saveChanges() {
      const task = {
        id: this.selectedDefault.id,
        title: this.title,
        description: this.description,
        subtasks: this.subtasks.filter(subtask => subtask.title !== ''),
        status: this.status,
      }
      this.$store.dispatch('updateTask', {task, columnId: this.status})
      this.$emit('close')
      
    }
  },
}
</script>
<template>
  <div @click="$emit('close')"
    class="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.5)] z-10 flex cursor-pointer">
    <div @click.stop class="m-auto p-[2rem] max-w-[90%] w-[480px] bg-oscuro">
      <h3 class="text-blanco font-semibold">Add New Card</h3>
      <form @submit.prevent="() => selectedDefault.id ? saveChanges() : addTask()">
        <!-- Form -->
        <div class="flex flex-col gap-2 my-4">
          <label class="text-blanco text-sm" for="newCardTitle">Title</label>
          <input v-model="title" type="text" required id="newCardTitle">
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label class="text-blanco text-sm" for="">Description</label>
          <textarea name="" id="" v-model="description" class="resize-none h-28"></textarea>
        </div>
        <div class="mb-4">
          <p class="text-blanco text-sm">Subtasks</p>
          <div class="flex flex-col gap-2 my-[0.4rem]">
            <div v-for="( _ , index) in subtasks" :key="index" class="flex items-center">
              <input type="text" class="subtask w-full" v-model="subtasks[index].title" @keydown.enter.prevent="addSubtask( index )">
              <div class="px-2 py-1" @click="deleteSubtask(index)"><span>✖</span></div>
            </div>
            <div 
            @click.prevent="addSubtask(-1)"
            class="bg-blanco hover:bg-hmorado text-morado text-center py-1 rounded-3xl font-semibold duration-500">
              + Add new subtask
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label class="text-blanco text-sm" for="">Status</label>
          <select v-model="status" required>
            <option v-for="column in columns" :key="column.id" :value="column.id">{{ column.title }}</option>
          </select>
        </div>
        <div class="flex">
          <button  v-if="selectedDefault.id" class="min-w-full bg-morado hover:bg-hmorado text-blanco text-center py-2 rounded-3xl font-semibold duration-500">
            <span >Save Changes</span>
          </button>
          <button v-else class="min-w-full bg-morado hover:bg-hmorado text-blanco text-center py-2 rounded-3xl font-semibold duration-500">
            <span >Create Task</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
input,
textarea,
select {
  @apply bg-oscuro border border-hoscuro rounded-md py-1 px-3 outline-none text-base
}
</style>