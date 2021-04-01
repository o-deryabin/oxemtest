<template>
  <div class="mt-4">
    <div class="d-flex justify-content-end">
      <b-button variant="primary" @click="modal = true">Добавить</b-button>
    </div>

    <!-- Модальное окно для создания нового пользователя -->
    <transition name="fade">
      <AddUserModal v-if="modal" @closeModal="modal = false" />
    </transition>
  </div>
</template>

<script>
import AddUserModal from "./addUserModal.vue";

export default {
  data: () => ({
    modal: false,
  }),
  methods: {},
  components: {
    AddUserModal,
  },
};
</script>

<style>
</style>