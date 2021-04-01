<template>
  <div>
    <!-- Компоненит для фильтрации пользователей -->
    <FilterUsers v-model="filter" />

    <!-- Компонент добовления новых пользователей -->
    <AddUser />

    <!-- Таблица с пользоветелями -->
    <table class="table table-striped table-hover mt-4">
      <thead>
        <tr>
          <th
            scope="col"
            class="custom-col-table"
            :class="{ active: sortValues.name === item.value }"
            v-for="(item, index) in dataTable"
            :key="index"
            @click="changeSort(item.value)"
          >
            {{ item.name }}
            <b-icon-arrow-up-short
              class="icon"
              v-if="sortValues.isIncrease"
            ></b-icon-arrow-up-short>
            <b-icon-arrow-down-short
              class="icon"
              v-else
            ></b-icon-arrow-down-short>
          </th>
        </tr>
      </thead>

      <!-- Вывод пользователей -->
      <transition-group name="list" tag="tbody">
        <User
          v-for="(item, index) in filteredUsers"
          :key="index"
          :user="item"
          @clickUser="dataUserChange"
        />
      </transition-group>
    </table>

    <!-- Компонент для вывода дополнительных данных пользователя -->
    <transition name="fade">
      <DataUser v-if="Object.keys(dataUser).length" :user="dataUser" />
    </transition>

    <!-- Пагинация -->
    <Pagination />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Pagination from "../common/pagination.vue";
import FilterUsers from "../form/filterUsers.vue";
import AddUser from "./addUser.vue";
import DataUser from "./dataUser.vue";
import User from "./user.vue";

export default {
  data: () => ({
    filter: "",
    dataUser: {},
    dataTable: [
      {
        name: "ID",
        value: "id",
      },
      {
        name: "First Name",
        value: "firstName",
      },
      {
        name: "Last Name",
        value: "lastName",
      },

      {
        name: "Email",
        value: "email",
      },
      {
        name: "Phone",
        value: "phone",
      },
    ],
    sortValues: {
      name: "id",
      isIncrease: true,
    },
  }),
  computed: {
    ...mapGetters(["getUsers"]),

    filteredUsers() {
      // Фильтрация пользователей
      return this.getUsers(this.filter);
    },
  },
  methods: {
    ...mapMutations(["CHANGE_SORT"]),

    changeSort(value) {
      // Обновляем данные для сортировки
      if (this.sortValues.name !== value) this.sortValues.name = value;
      // Если полученные данные не похоже на имя, которое уже есть, то тогда меняем имя
      else this.sortValues.isIncrease = !this.sortValues.isIncrease; // Иначе меняем порядок сортировки

      this.CHANGE_SORT(this.sortValues);
    },

    dataUserChange(user) {
      // Обновляем табличку с дополнительными данными
      this.dataUser = user;
    },
  },
  components: {
    User,
    FilterUsers,
    Pagination,
    DataUser,
    AddUser,
  },
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.custom-col-table {
  cursor: pointer;
  transition: 0.1s;
  position: relative;
}

.custom-col-table:hover {
  background-color: rgba(0, 0, 0, 0.075);
}

.custom-col-table .icon {
  display: none !important;
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
}

.custom-col-table.active .icon {
  display: inline-block !important;
}
</style>