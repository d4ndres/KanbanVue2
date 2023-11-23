<script>
export default {
  data() {
    return {
      timeOut: null,
    }
  },
  computed: {
    nameBoard: {
      get() {
        return this.$store.state.nameBoard
      },
      set(value) {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          this.$store.dispatch('renameBoard', value)
        }, 3000)
      }
    },
  },
  methods: {
    blur( ev ) {
      clearTimeout(this.timeOut)
      ev.target.blur()
      this.$store.dispatch('renameBoard', ev.target.value)
    },
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
    <div class="border-b border-hoscuro mx-2">
      <!-- <input v-model="nameBoard" class="w-full tracking-widest bg-bg px-1 my-2 text-center" type="text"> -->
      <input class="w-full tracking-widest bg-bg px-1 my-2" v-model="nameBoard" @keydown.enter="blur" type="text">
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