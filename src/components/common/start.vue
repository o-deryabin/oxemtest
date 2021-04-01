<template>
  <div class="text-center">
    <h1>Выберите объем данных</h1>
    <b-row class="mt-5">
      <b-col
        ><b-button block variant="primary" @click.prevent="select('small')"
          >Мальнький</b-button
        ></b-col
      >

      <b-col
        ><b-button block variant="primary" @click.prevent="select('big')"
          >Большой</b-button
        ></b-col
      >
    </b-row>
  </div>
</template>

<script>
export default {
  methods: {
    select(value) {
      this.$emit("select", value);
    },
  },
};
</script>

<style>
</style>