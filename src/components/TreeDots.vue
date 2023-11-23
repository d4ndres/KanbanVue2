<script>
export default {
  props: {
    isMove: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <div v-on="$listeners" class="flex gap-1 items-center justify-center w-7 h-7 rounded-lg hover:bg-hoscuro duration-300" :class="{ 'cursor-move' : isMove, 'cursor-pointer' : !isMove}">
    <div class="w-1 h-1 bg-gris rounded-full group-hover:bg-hgris duration-500"></div>
    <div class="w-1 h-1 bg-gris rounded-full group-hover:bg-hgris duration-500"></div>
    <div class="w-1 h-1 bg-gris rounded-full group-hover:bg-hgris duration-500"></div>
  </div>
</template>