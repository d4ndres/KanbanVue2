<script>
import { mapState } from "vuex";
import draggable from 'vuedraggable'

export default {
  name: "AsideApp",
  components: {
    draggable
  },
  data() {
    return {
      focused: false,
      newBoard: "",
      startX: null,
    }
  },
  computed: {
    nameBoard: {
      get() {
        return this.$store.state.nameBoard
      },
      set(value) {
        this.$store.dispatch('changeBoard', value)
      }
    },
    boards: {
      get() {
        return this.$store.state.boards
      },
      set(value) {
        this.$store.dispatch('updateBoards', value)
      }
    }
  },
  methods: {
    createBoard( ev ) {
      if( this.boards.includes(this.newBoard) ){
        alert('Ya existe un tablero con el nombre: ' + this.newBoard)
        return
      }

      if( this.newBoard ) {
        this.$store.dispatch('createBoard', this.newBoard)
        this.cancelNewBoard( ev )
      }
    },
    cancelNewBoard( ev ) {
      this.newBoard = ""
      this.focused = false
      ev.target.blur()
    },
    handleTouchStart( ev ) {
      this.startX = ev.touches[0].clientX
    },
    handleTouchEnd( ev ) {
      const endX = ev.changedTouches[0].clientX
      const threshold = 150

      if( this.startX - endX > threshold ) {
        this.$emit('swipe')
      } 

    }
  }
}
</script>


<template>
  <div class="h-full" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <div class="h-[6vh] flex justify-between items-center pl-3  mb-2">
      <div class="tracking-widest font-bold">
        Tus tableros
      </div>
      <div class="p-3">

      </div>
    </div>

    <div>
      <draggable v-model="boards" :group="{ name: 'boards'}" duration="500">
        <transition-group>
          <div
          @click="nameBoard = name"
          :class="{ 'bg-morado text-blanco' : name == nameBoard}"
          class="select-none px-3 py-2 w-11/12 rounded-r-full hover:bg-hblanco hover:text-morado cursor-pointer"
          v-for="name in boards" :key="name">
            {{ name }}
          </div>
        </transition-group>
      </draggable>
      <div>
        <input
        @focus="focused = true"
        @blur="focused = false"
        @keyup.enter="createBoard"
        @keyup.tab="createBoard"
        @keyup.esc="cancelNewBoard"
        v-model="newBoard"
        :placeholder="!focused ? '+ Crea un tablero' : 'Ingresa el titulo del tablero'"
        :class="{ 'bg-transparent' : !focused, 'bg-hoscuro' : focused }"
        class="w-full p-3 my-2 duration-500 cursor-pointer">
      </div>
    </div>
  </div>
</template>