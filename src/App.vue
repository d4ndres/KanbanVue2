<script>
import ManagmentBoard from "./components/ManagmentBoard.vue";

export default {
  name: "App",
  components: {
    ManagmentBoard,
  },
  data() {
    return {
      isActivedAside: true,
    }
  }
};
</script>


<template>
  <div id="app" class="bg-bg min-h-[100vh] text-gris">
    <div class="h-[6vh] bg-oscuro">
      <h1 class="text-xl text-blanco">KANBAN</h1>
    </div>
    <div class="flex h-[94vh]">
      <div class="left w-2/12  duration-500 relative bg-oscuro x-border" :class="{'w-0' : isActivedAside }">
        <div 
        @click="isActivedAside = !isActivedAside"
        class="bg-hoscuro w-2 h-6 block absolute top-1/2 -translate-y-1/2 left-full translate-x-full cursor-pointer hover:bg-hgris duration-500 z-10"> 
        </div>
      </div>
      <div class="right duration-500 " :class="{'w-full' : isActivedAside, 'w-10/12' : !isActivedAside }"> 
        <div class="h-[6vh] x-border">
          Main board
        </div>
        <ManagmentBoard class="ManagmentBoard h-[88vh] w-full overflow-auto p-2"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ManagmentBoard::-webkit-scrollbar {
  display: none;
}
.x-border {
  box-shadow: 0 0 0 0.1px #e2e8f0;
}
</style>