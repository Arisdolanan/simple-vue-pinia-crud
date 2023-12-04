<template>
  <div>
    <button @click="emitAlert">Emit Alert</button>
    <p>Pesan dari Parent: {{ messageToProps }}</p>
  </div>
</template>

<script>
export default {
  props: {
    messageToProps: String,
  },
  methods: {
    emitAlert() {
      this.$emit('showAlert', 'Ini adalah pesan dari anak ke induk!');
    },
  },
};
</script>
