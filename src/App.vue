<script>
import ManagmentBoard from "@/components/ManagmentBoard.vue";
import HeaderBoard from "@/components/HeaderBoard.vue";
import BoardSidebar from "@/components/BoardSidebar.vue";

export default {
  name: "App",
  components: {
    ManagmentBoard,
    HeaderBoard,
    BoardSidebar,
  },
};
</script>

<template>
  <div id="app" class="bg-bg min-h-[100vh] text-gris">
    <HeaderBoard />
    <BoardSidebar />
  </div>
</template>

<style>
.dev {
  border: 1px solid red;
}
</style>
