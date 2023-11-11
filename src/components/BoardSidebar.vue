<script>
import ManagmentBoard from "@/components/ManagmentBoard.vue";

export default {
  name: "App",
  components: {
    ManagmentBoard,
  },
  data() {
    return {
      isActive: false,
    };
  },
};
</script>

<template>
  <div
    class="container | min-h-3/4 p-3 my-2 mx-auto | bg-bg rounded-x1 shadow-2xl | flex"
  >
    <div
      @click="isActive = !isActive"
      class="bg-gris py-1 px-3 w-[75px] rounded-md | text-morado text-center | font-bold | absolute | cursor-pointer | bottom-[-50px] | z-10"
    >
      {{ isActive }}
    </div>
    <!-- Left side -->
    <section
      :class="{ 'w-[0%] | opacity-0': isActive == true }"
      class="w-[20%] mr-2 | bg-oscuro | text-morado | font-bold | duration-500"
    >
      <p>Note list</p>
    </section>
    <section
      :class="{ 'w-[100%]': isActive == true }"
      class="w-[80%] | duration-500"
    >
      <ManagmentBoard />
    </section>
  </div>
</template>
