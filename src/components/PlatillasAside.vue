


<script>
import iso9001 from '@/assets/platillas/ISO 9001 - 2015.json'
import iso14001 from '@/assets/platillas/ISO 14001.json'
import iso17024 from '@/assets/platillas/ISO 17024 - 2013.json'
import iso23001 from '@/assets/platillas/ISO 23001.json'

export default {
  data() {
    return {
      plantillas: [
        { name: 'ISO 9001 - 2015', columns: iso9001},
        { name: 'ISO 14001', columns: iso14001},
        { name: 'ISO 17024 - 2013', columns: iso17024},
        { name: 'ISO 23001', columns: iso23001},
      ],
      isShow: false,
    }
  },
  methods: {
    newBoard( plantilla ) {
      this.$store.dispatch('createBoardFromPlantilla', plantilla)
    }
  
  }
}

</script>

<template>
  <div class="my-3">
    <div @click="isShow = !isShow" class="px-3 tracking-widest font-bold flex justify-between cursor-pointer hover:text-blanco">
      <span>
        Plantillas
      </span>
      <div>
        <Transition name="fade">
          <span v-if="!isShow">
            <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
          <span v-else>
            <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 15l7-7 7 7"></path>
            </svg>
          </span>
        </Transition>

      </div>
    </div>
    <transition name="slide-fade">
      <div v-show="isShow" class="overflow-hidden duration-500">
        <div @click="newBoard(plantilla)" v-for="plantilla in plantillas" :key="plantilla.name" class="px-3 py-2 cursor-pointer hover:bg-hblanco hover:text-morado">
          {{ plantilla.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

</style>