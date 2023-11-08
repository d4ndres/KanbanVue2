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
      title: '',
      description: '',
      subtasks: ['', ''],
      status: this.selectedDefault.title,
    }
  },
  mounted() {
    this.status = this.status ?? this.columns[0].title
    this.$nextTick(() => document.querySelector('#newCardTitle').focus())

  },
  computed: {
    columns() {
      return this.$store.state.columns.map(column => ({ title: column.title, id: column.id }))
    }
  },
  methods: {
    addCard() {
      const card = {
        columnId: this.selectedDefault.id,
        title: this.title,
        description: this.description,
        subtasks: this.subtasks.filter(subtask => subtask !== ''),
        status: this.status,
      }
      console.log(card);
      this.$store.dispatch('addCard', card)
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
      <form @submit.prevent="addCard">
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
            <div v-for="(subtask, index) in subtasks" :key="subtask + index" class="flex items-center">
              <input v-model="subtasks[index]" type="text" class="w-full">
              <div class="px-2 py-1"><span>✖</span></div>
            </div>
            <div class="bg-blanco hover:bg-hmorado text-morado text-center py-1 rounded-3xl font-semibold duration-500">
              + Add new subtask
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label class="text-blanco text-sm" for="">Status</label>
          <select v-model="status" required>
            <option v-for="column in columns" :key="column.id" :value="column.title">{{ column.title }}</option>
          </select>
        </div>
        <div class="flex">
          <button
            class="min-w-full bg-morado hover:bg-hmorado text-blanco text-center py-2 rounded-3xl font-semibold duration-500">Create
            Task</button>
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