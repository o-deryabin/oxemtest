import Axios from "axios";

export default {
  actions: {
    async fetchUsers({ commit }, value) {
      try {
        // Получаем данные таблицы
        const sizeData = {
          big:
            "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
          small:
            "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
        };

        await Axios.get(sizeData[value]).then((response) => {
          commit("SET_USERS", response.data);
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  mutations: {
    SET_USERS(state, payload) {
      // Кладем полученные данные в стейт
      state.users = payload;
    },

    ADD_NEW_USER(state, payload) {
      // Добовляем нового пользователя
      state.users.unshift(payload);
    },

    CHANGE_SORT(state, payload) {
      state.sortValues = payload;
    },

    CHANGE_PAGE(state, payload) {
      // Изменяем активную страницу
      state.page = payload;
    },
  },

  state: {
    users: [], // Пользователи
    page: 1, // Активная страница
    perPage: 50, // Сколько пользователей будет на странице
    sortValues: {
      // Поля сортировки
      name: "id", // Названию таблици
      isIncrease: true, // Возрастание / убывание
    },
  },

  getters: {
    getUsers: (state) => (filter) => {
      // Получание пользоавтелей
      let users = [...state.users];
      let name = state.sortValues.name;
      let isIncrease = state.sortValues.isIncrease;

      let from = state.page * state.perPage - state.perPage; // Разбиваем массив пользователей на страницы
      let to = state.page * state.perPage;
      users = users.slice(from, to);

      // Сортировака
      if (isIncrease) {
        // Если по возрастанию
        if (name === "id") users.sort((a, b) => a[name] - b[name]);
        // И если по id
        // По всем остальным полям
        else
          users.sort((a, b) => {
            var nameA = a[name].toLowerCase(),
              nameB = b[name].toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
      } else {
        // Если по убыванию
        if (name === "id") users.sort((a, b) => b[name] - a[name]);
        // И если по id
        // По всем остальным полям
        else
          users.sort((a, b) => {
            var nameA = a[name].toLowerCase(),
              nameB = b[name].toLowerCase();
            if (nameA < nameB) return 1;
            if (nameA > nameB) return -1;
            return 0;
          });
      }

      users = users.filter(({ firstName }) => {
        // Фильтрация пользователей
        return firstName.toLowerCase().includes(filter.toLowerCase().trim());
      });

      return users;
    },

    getPages(state) {
      // Получение страниц
      const numberOfPages = Math.ceil(state.users.length / state.perPage); // Считаем сколько всего будет страниц

      let pages = []; // Собираем массив страниц
      for (let index = 1; index <= numberOfPages; index++) {
        pages.push(index);
      }

      if (pages.length < 3) return pages; // Если страниц меньше 3, то просто возвращаем pages

      if (state.page === 1) pages = pages.slice(0, 3);
      // Если сейчас активна 1 страница
      else if (state.page === numberOfPages)
        // Если сейчас активна последняя страница
        pages = pages.slice(numberOfPages - 3, numberOfPages);
      else pages = pages.slice(state.page - 2, state.page + 1); // Если сейчас активна не превая и не последняя страница

      return pages;
    },
  },
};
