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
  <div
    class="container | min-h-3/4 p-3 my-2 mx-auto | bg-bg rounded-x1 shadow-2xl | flex"
  >
    <!-- Left side -->
    <section class="w-1/2 p-3 mr-2 | bg-oscuro | text-morado | font-bold">
      <!-- Search notes -->

      <!-- Note list -->
      <p>Note list</p>
    </section>
    <section>
      <ManagmentBoard />
    </section>
  </div>
</template>
