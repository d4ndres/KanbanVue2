<script>
import { mapState } from "vuex";


export default {
  name: "AsideApp",
  data() {
    return {
      focused: false,
      newBoard: ""
    }
  },
  computed: {
    ...mapState(['boards']),
    nameBoard: {
      get() {
        return this.$store.state.nameBoard
      },
      set(value) {
        this.$store.dispatch('changeBoard', value)
      }
    },
  },
  methods: {
    createBoard() {
      if( this.newBoard ) {
        this.$store.dispatch('createBoard', this.newBoard)
        this.newBoard = ""
      }
    },
    cancelNewBoard() {
      this.newBoard = ""
      this.focused = false
    }
  }
}
</script>


<template>
  <div class="h-full">
    <div class="h-[6vh] flex justify-between items-center pl-3">
      <div class="tracking-widest font-bold">
        Tus tableros
      </div>
      <div class="p-3">

      </div>
    </div>

    <div>
      <div
      @click="nameBoard = name"
      :class="{ 'bg-morado text-blanco' : name == nameBoard}"
      class="px-3 py-2 w-11/12 rounded-r-full duration-300 hover:bg-hblanco hover:text-morado cursor-pointer"
      v-for="name in boards" :key="name">
        {{ name }}
      </div>
      <div>
        <input
        @focus="focused = true"
        @blur="focused = false"
        @keyup.enter="createBoard"
        @keyup.tab="createBoard"
        @keyup.esc="cancelNewBoard"
        v-model="newBoard"
        :placeholder="!focused ? '+ Crea un tablero' : 'Ingresa el titulo del tablero'"
        class="w-full p-3 my-2 duration-500 bg-transparent shadow-sm focus:shadow-morado hover:text-hgris focus:text-hgris cursor-pointer">
      </div>
    </div>
  </div>
</template>