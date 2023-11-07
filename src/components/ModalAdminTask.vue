<script>
export default {

}
</script>
<template>
  <div 
  @click="$emit('close')"
  class="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,.5)] z-10 flex cursor-pointer">
    <div class="m-auto max-w-[90%] w-[480px] bg-oscuro">
      <h3>Add New Card</h3>
      <div>
        <!-- Form -->
        <div>
          <label for="">Title</label>
          <input type="text">
        </div>
        <div>
          <label for="">Description</label>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div>
          <p>Subtasks</p>
          <div>
            <input type="text">
            <div>
              + Add new subtask
            </div>
          </div>
        </div>
        <div>
          <label for="">Status</label>
          <select name="" id=""></select>
        </div>
        <div>
          <button>Create Task</button>
        </div>
      </div>
    </div>
  </div>
</template>