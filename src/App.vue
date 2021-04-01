<template>
  <div id="app">
    <b-container class="mt-5">
      <transition name="fade">
        <!-- Стартовый компонент -->
        <template v-if="start">
          <Start @select="fetch" />
        </template>

        <!-- Компонент лоадера -->
        <template v-else-if="loader">
          <Loader />
        </template>

        <!-- Основной компонент с таблицами -->
        <template v-else>
          <ListUsers />
        </template>
      </transition>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ListUsers from "./components/user/listUsers.vue";
import Loader from "./components/common/loader.vue";
import Start from "./components/common/start.vue";

export default {
  name: "App",
  data: () => ({
    start: true,
    loader: false,
  }),
  methods: {
    ...mapActions(["fetchUsers"]),

    async fetch(value) {
      // Загрузка пользователей
      this.start = false;
      this.loader = true;

      await this.fetchUsers(value);

      this.loader = false;
    },
  },
  components: {
    ListUsers,
    Loader,
    Start,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
