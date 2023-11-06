<template>
  <div id="app" class="p-10 h-[100vh] bg-gradient-to-r from-sky-500 to-indigo-500 overflow-auto">
    <h1 class="text-4xl text-white flex items-center mb-10">
      Management Board
    </h1>
    <ManagmentBoard />
  </div>
</template>

<script>
import ManagmentBoard from './components/ManagmentBoard.vue'

export default {
  name: 'App',
  components: {
    ManagmentBoard
  }
}
</script>
