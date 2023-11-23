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
      this.$store.dispatch('deleteBoard')
    },
    descargarJson() {
      const json = JSON.stringify(this.$store.state.columns)
      const blob = new Blob([json], {type: "application/json"})
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.nameBoard}.json`
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }
  }
}
</script>
<template>
  <div v-on="$listeners" class="bg-bg py-2 border border-hoscuro rounded-lg absolute top-full right-full w-[250px] block z-10">
    <div class="border-b border-hoscuro mx-2 flex items-center">
      <!-- <input v-model="nameBoard" class="w-full tracking-widest bg-bg px-1 my-2 text-center" type="text"> -->
      <h2 class="w-full tracking-widest bg-bg px-1 my-2"  >{{ nameBoard }}</h2>
      <div class="flex gap-1 items-center justify-center w-7 h-7 rounded-lg cursor-pointer hover:bg-hoscuro duration-300">
        <svg class="w-4 h-4 inline-block" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" 
          d="M14.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-.39.242l-3 1a1 1 0 01-1.32-1.32l1-3a1 1 0 01.242-.39l8-8a1 1 0 011.414 0zM13.586 6L6 13.586 4.414 12 12 4.414 13.586 6z" 
          clip-rule="evenodd"></path>
        </svg>
      </div>
    </div>
    <!-- <div class="font-normal border-b border-hoscuro mx-2 py-2 flex items-center space-x-2">
      <label for="color" class="text-sm text-gray-600 cursor-pointer">
        Select color
      </label>
      <input id="color" type="color" v-model="columnColor" class="w-6 h-6 bg-hoscuro rounded px-[1px] cursor-pointer">
    </div> -->
    <div @click="descargarJson" class="font-normal px-2 py-1 my-1 hover:bg-hoscuro cursor-pointer">
      Descargar JSON
    </div>
    <div>
      <div @click="deleteBoard" class="font-normal px-2 py-1 my-1 hover:bg-hoscuro text-rojo cursor-pointer">
        Eliminar este tablero
      </div>
    </div>
  </div>
</template>