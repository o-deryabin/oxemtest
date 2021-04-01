<template>
  <div>
    <!-- Поле для ввода текста фильтра -->
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="form-control mr-3"
      placeholder="Введите текст..."
    />
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style>
</style>