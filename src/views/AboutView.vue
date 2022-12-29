<script setup>
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores";

const { counter } = storeToRefs(useGlobalStore()); // get
const { setCounter } = useGlobalStore(); // set
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <br />
    <button @click="setCounter()">Counter : {{ counter }}</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
