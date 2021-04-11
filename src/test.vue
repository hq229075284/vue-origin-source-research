<template>
  <div class="container">
    <div v-for="item of list" :key="item.id">{{ item.name }}</div>

    <Dialog :visible="this.show" />
    <Dialog  />

    <button @click="clickedButton">click</button>
  </div>
</template>

<script>
import Dialog from "./Dialog";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      show: false,
      list: [
        { id: 1, name: 1 },
        { id: 2, name: 2 },
        { id: 3, name: 3 },
      ],
    };
  },
  methods: {
    clickedButton() {
      this.show = true;
      setTimeout(() => {
        this.list = [...this.list].concat([{ id: 4, name: 4 }]);
      }, 2000);
    },
  },
};
</script>