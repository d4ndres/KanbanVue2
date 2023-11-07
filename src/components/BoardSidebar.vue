<script>
import ManagmentBoard from "@/components/ManagmentBoard.vue";

export default {
  name: "App",
  components: {
    ManagmentBoard,
  },
};
</script>

<template>
  <div class="dev | container | p-1 my-3 mx-auto | flex">
    <!-- Left side -->
    <section class="dev | p-9 mr-1">
      <!-- Search notes -->
      <p>titulo</p>

      <!-- Note list -->
      <p>Note list</p>
    </section>
    <section>
      <ManagmentBoard />
    </section>
  </div>
</template>
