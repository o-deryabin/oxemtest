<template>
  <div class="mt-4">
    <ul class="pagination">
      <!-- Предыдущая страница -->
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" @click.prevent="prevPage" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <!-- Вывод массива страниц -->
      <li
        class="page-item"
        :class="{ active: item === currentPage }"
        v-for="item in getPages"
        :key="item"
      >
        <a class="page-link" @click.prevent="changePage(item)">{{ item }}</a>
      </li>

      <!-- Следующая страница -->
      <li
        class="page-item"
        :class="{ disabled: currentPage === getPages[getPages.length - 1] }"
      >
        <a class="page-link" @click.prevent="nextPage" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    currentPage: 1,
  }),

  computed: {
    ...mapGetters(["getPages"]),
  },

  methods: {
    ...mapMutations(["CHANGE_PAGE"]),

    changePage(page) {
      // Переключение страниц
      this.currentPage = page;

      this.CHANGE_PAGE(page);
    },

    nextPage() {
      // Следующая страница
      this.currentPage++;
      this.CHANGE_PAGE(this.currentPage);
    },

    prevPage() {
      // Предыдущая страница
      this.currentPage--;
      this.CHANGE_PAGE(this.currentPage);
    },
  },
};
</script>

<style>
</style>