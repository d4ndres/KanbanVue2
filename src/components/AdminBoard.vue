<script>
export default {
  computed: {
    nameBoard: {
      get() {
        return this.$store.state.nameBoard
      },
      set(value) {
        this.$store.dispatch('updateNameBoard', value)
      }
    },
  },
  methods: {
    deleteBoard() {
      
    }
  }
}
</script>
<template>
  <div v-on="$listeners" class="bg-bg py-2 border border-hoscuro rounded-lg absolute top-full right-full w-[250px] block z-10">
    <div class="border-b border-hoscuro mx-2">
      <!-- <input v-model="nameBoard" class="w-full tracking-widest bg-bg px-1 my-2 text-center" type="text"> -->
      <h2 class="w-full tracking-widest bg-bg px-1 my-2 text-center"  >{{ nameBoard }}</h2>
    </div>
    <!-- <div class="font-normal border-b border-hoscuro mx-2 py-2 flex items-center space-x-2">
      <label for="color" class="text-sm text-gray-600 cursor-pointer">
        Select color
      </label>
      <input id="color" type="color" v-model="columnColor" class="w-6 h-6 bg-hoscuro rounded px-[1px] cursor-pointer">
    </div> -->
    <div>
      <div @click="deleteBoard" class="font-normal px-2 py-1 my-1 hover:bg-hoscuro text-rojo">
        Eliminar este tablero
      </div>
    </div>
  </div>
</template>