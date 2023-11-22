<script>
import { mapState } from "vuex";
import ManagmentBoard from "./components/ManagmentBoard.vue";
import AsideApp from "./components/AsideApp.vue";

export default {
  name: "App",
  components: {
    ManagmentBoard,
    AsideApp,
  },
  data() {
    return {
      isActivedAside: false,
    }
  },
  computed: {
    ...mapState(['isChanged'])
  }
};
</script>


<template>
  <div id="app" class="bg-bg min-h-[100vh] text-gris">
    <div class="h-[6vh] bg-oscuro flex items-center px-3">
      <h1 class="text-xl text-blanco inline-block tracking-widest">KANBAN</h1>
    </div>
    <div class="flex h-[94vh] max-md:overflow-hidden">
      <div :class="{'w-0' : isActivedAside, 'w-2/12 max-md:w-full' : !isActivedAside }" class="duration-500 bg-oscuro x-border overflow-hidden" >
        
        <AsideApp @swipe="isActivedAside = !isActivedAside" />
      </div>
      <div :class="{'w-full' : isActivedAside, 'w-10/12 max-md:w-0' : !isActivedAside }" class="right duration-500 relative"> 
        <div @click="isActivedAside = !isActivedAside" 
        :class="{'max-md:right-full max-md:-translate-x-full' : !isActivedAside  }"
        class="bg-hoscuro w-2 h-6 block absolute top-1/2 max-md:top-0 max-md:translate-y-1/2 -translate-y-1/2  translate-x-full cursor-pointer hover:bg-hgris duration-500 z-10"></div>
        <Transition name="long-fade">
          <ManagmentBoard v-if="!isChanged"/>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.x-border {
  box-shadow: 0 0 0 0.1px #e2e8f0;
}
.long-fade-enter-active, .long-fade-leave-active {
  transition: opacity .8s;
}
.long-fade-enter, .long-fade-leave-to {
  opacity: 0;
}

</style>