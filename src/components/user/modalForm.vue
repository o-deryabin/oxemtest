<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>

    <!-- Форма для инпута с маской -->
    <template v-if="pMask">
      <input
        :type="type"
        :name="id"
        :id="id"
        class="form-control"
        :placeholder="placeholder"
        v-mask="pMask"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
    </template>

    <!-- Форма для инпута без маски -->
    <template v-else>
      <input
        :type="type"
        :name="id"
        :id="id"
        class="form-control"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
    </template>

    <span class="error-text">{{ errorText }}</span>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  props: ["value", "type", "id", "errorText", "placeholder", "label", "pMask"],
  inheritAttrs: false,
  directives: { mask },
};
</script>

<style>
.error-text {
  opacity: 0;
  transform: translateY(-20px);
  font-size: 0.9rem;
  transition: 0.3s;
}

.form-group.error .form-control {
  box-shadow: 0 0 10px rgba(172, 26, 26, 0.767);
  border-color: rgba(245, 102, 102, 0.493);
}

.form-group.error .error-text {
  opacity: 1;
  transform: translateY(0px);
  color: rgba(172, 26, 26, 0.767);
}
</style>