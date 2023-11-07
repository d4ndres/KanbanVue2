<script>
import ManagmentBoard from "./components/ManagmentBoard.vue";

export default {
  name: "App",
  components: {
    ManagmentBoard,
  },
};
</script>


<template>
  <div id="app" class="bg-bg min-h-[100vh] text-gris">
    <h1 class="text-4xl text-white flex items-center mb-10">Board Management</h1>

    <ManagmentBoard />

  </div>
</template>