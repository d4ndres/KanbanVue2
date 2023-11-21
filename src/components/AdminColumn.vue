<script>
export default {
  props: {
    columnId: {
      type: String,
      required: true,
    },
  },
  computed: {
    column() {
      return this.$store.state.columns.find(column => column.id === this.columnId)
    },
    columnTitle: {
      get() {
        if( this.column ) {
          return this.column.title
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.dispatch('updateColumnTitle', { columnId: this.columnId, title: value })
      }
    },
    columnColor: {
      get() {
        if( this.column ) {
          return this.column.color
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.dispatch('updateColumnColor', { columnId: this.columnId, color: value })
      }
    },

    
  },
}
</script>
<template>
  <div v-on="$listeners" v-if="column" class="bg-bg py-2 border border-hoscuro rounded-lg absolute top-full right-full md:right-auto translate-x-6 md:translate-x-0 w-[250px] block z-10">
    <div class="border-b border-hoscuro mx-2">
      <input v-model="columnTitle" class="w-full tracking-widest bg-bg px-1 my-2 text-center" type="text">
    </div>
    <div class="font-normal border-b border-hoscuro mx-2 py-2 flex items-center space-x-2">
      <label for="color" class="text-sm text-gray-600 cursor-pointer">
        Select color
      </label>
      <input id="color" type="color" v-model="columnColor" class="w-6 h-6 bg-hoscuro rounded px-[1px] cursor-pointer">
    </div>
    <div>
      <div @click="deleteColumn(column.id)" class="font-normal px-2 py-1 my-1 hover:bg-hoscuro text-rojo">
        Eliminar esta columna
      </div>
    </div>
  </div>
</template>