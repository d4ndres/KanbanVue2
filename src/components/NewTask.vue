<script >

import { nanoid } from 'nanoid'

export default {
  name: 'NewTask',
  data() {
    return {
      focused: false,
      title: ''
    }
  },
  methods: {
    createTask( e ) {
      if( this.title.trim() ) 
      {
        e.preventDefault();
        this.$emit('add-task', {
          title: this.title.trim(),
          createdAt: new Date(),
          id: nanoid(),
        })
      }

      this.title = '';
    }
  }

}



</script>
<template> 
  <div>
    <textarea 
      v-model="title"
      @keydown.tab="createTask"
      @keydown.enter="createTask"
      class="w-full p-2 rounded resize-none border-none focus:outline-none focus:border-blue-300 focus:bg-white bg-transparent"
      :class="{
        'h-11': !focused,
        'h-24': focused,
      }"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="!focused ? '+ Add a card' : 'Enter a title for this card...'"
    >

    </textarea>
  </div>
</template>