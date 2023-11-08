<script>
export default {
  props: {
    selectedDefault: {
      type: Object,
      default: {},
    }
  },
  data(){
    return {
      title: this.selectedDefault.title,
      description: 'Yes, you can use the Composition API alongside the Options API (default architecture) in Vue. They are not mutually exclusive and can coexist in the same project or even in the same component.',
      subtasks: [
        { isDone: false, title: 'Subtask 1' },
        { isDone: false, title: 'Subtask 2' },
      ],
      status: 'Backlog'
    }
  },
  computed: {
    columns() {
      return this.$store.state.columns.map(column => ({ title: column.title, id: column.id }))
    }
  },
}
</script>
<template>
  <div @click="$emit('close')"
    class="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.5)] z-10 flex cursor-pointer">
    <div @click.stop class="m-auto p-[2rem] max-w-[90%] w-[480px] bg-oscuro">
      <h3 class="text-blanco font-semibold">{{ title }}</h3>
      <div>
        <p>
          {{ description }}
        </p>

        <div class="mb-4">
          <p class="text-blanco text-sm">Subtasks</p>
          <div class="flex flex-col gap-2 my-[0.4rem]">
            <div v-for="(subtask, index) in subtasks" :key="subtask + index" class="flex items-center">
              <div>
                []
              </div>
              <div>
                <p>{{ subtask.title }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label class="text-blanco text-sm" for="">Status</label>
          <select v-model="status" required>
            <option v-for="column in columns" :key="column.id" :value="column.title">{{ column.title }}</option>
          </select>
        </div>
      </div>
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