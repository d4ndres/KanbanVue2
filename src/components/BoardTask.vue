<script>
import { ref } from '@vue/composition-api';

export default {
  name: 'BoardTask',
  props: {
    task: {
      type: Object,
      required: true,
    }
  },
  setup(){
    const focused = ref(false);
  
    return {
      focused,
    }
  }
}

</script>
<template>
  <div
    :title="task.createdAt.toLocaleString()"
    class="task drag-handle cursor-move bg-oscuro text-blanco px-4 py-2 mb-2 rounded shadow-sm max-w-[250px]"
    @focus="focused = false"
    @blur="focused = false"
    tabindex="0"
    :class="{ active: focused }"
    >
    <div class="flex">
      <span>
        {{ task.title }}
      </span>
    </div>
  </div>
</template>

<style>
.task.active{
  outline: 1px solid #000000;
  background: red;
}

</style>