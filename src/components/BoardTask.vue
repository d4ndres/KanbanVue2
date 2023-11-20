<script>
export default {
  name: 'BoardTask',
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
  methods: {
    showCard() {
      this.$emit('showCard', this.task)
    }
  },
  computed: {
    toolTip() {
      return new Date( this.task.createdAt ).toLocaleString()
    }
  }
}
</script>
<template>
  <div
    v-on="$listeners"
    :title="toolTip"
    class="task drag-handle cursor-move bg-oscuro text-blanco px-4 py-2 mb-2 rounded shadow-sm max-w-[250px]">
    <div class="flex">
      <span>
        {{ task.title }}
      </span>
    </div>
  </div>
</template>

