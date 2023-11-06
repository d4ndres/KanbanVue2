<script>
// import type { Task, ID } from '@/types';

// const props = defineProps<{
//   task: Task
// }>();

// const emit = defineEmits<{
//   ( event: 'delete-task', id: ID ): void
// }>();

// const focused = ref(false);
// onKeyStroke('Delete', (event) => {
//   if(focused.value) emit('delete-task', props.task.id)
// })

// const ctrl = useKeyModifier('Control')

import DragHandle from '@/components/DragHandle.vue'

export default {
  name: 'BoardTask',
  components: {
    DragHandle
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      focused: false
    }
  }
}

</script>
<template>
  <div
    :title="task.createdAt.toLocaleString()"
    class="task bg-white py-2 px-1 mb-2 rounded shadow-sm max-w-[250px]"
    @focus="focused = false"
    @blur="focused = false"
    tabindex="0"
    :class="{ active: focused }"
    >
    <div class="flex">
      <DragHandle />
      <span>
        {{ task.title }}
      </span>
    </div>
  </div>
</template>

<style>
.task.active{
  outline: 1px solid #000000;
}

</style>