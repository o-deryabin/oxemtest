<template>
  <div class="custom-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h4>Введите данные пользователя</h4>
          <form
            @submit.prevent="addUser"
            novalidate="false"
            action="#"
            method="post"
          >
            <!-- Компоненты форм данных -->
            <ModalForm
              v-model="form.id"
              placeholder="id"
              type="number"
              id="form-id"
              errorText="Заполните поле id"
              label="Id"
              :class="{ error: errors.id }"
            />
            <ModalForm
              v-model="form.firstName"
              placeholder="firstName"
              type="text"
              id="form-firstName"
              errorText="Заполните поле firstName"
              label="FirstName"
              :class="{ error: errors.firstName }"
            />
            <ModalForm
              v-model="form.lastName"
              placeholder="lastName"
              type="text"
              id="form-lastName"
              errorText="Заполните поле lastName"
              label="LastName"
              :class="{ error: errors.lastName }"
            />
            <ModalForm
              v-model="form.email"
              placeholder="email"
              type="email"
              id="form-email"
              errorText="Заполните поле email"
              label="Email"
              :class="{ error: errors.email }"
            />
            <ModalForm
              v-model="form.phone"
              placeholder="(###)###-##-##"
              type="text"
              id="form-phone"
              errorText="Заполните поле phone"
              pMask="(###)###-##-##"
              label="Phone"
              :class="{ error: errors.phone }"
            />
            <button
              class="btn btn-danger mr-2"
              type="button"
              @click.prevent="$emit('closeModal')"
            >
              Отмена
            </button>
            <button class="btn btn-primary" type="submit">Добавить</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import ModalForm from "./modalForm.vue";

export default {
  data: () => ({
    form: {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    errors: {},
  }),
  methods: {
    ...mapMutations(["ADD_NEW_USER"]),

    validate(data) {
      // Проверка данных на пустоту
      this.errors = {};

      for (let key in data) {
        if (data[key] === "" || data[key] == null) {
          this.errors[key] = true;
        }

        if (data[key] === "email") {
          this.validEmail(key);
        }
      }
    },

    validEmail(key) {
      // Проверка валидности email'а
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(this.form[key])) {
        this.errors[key] = true;
      }
    },

    addUser() {
      // Добавление нового пользователя
      this.validate(this.form);

      if (Object.keys(this.errors).length) return;

      this.ADD_NEW_USER(this.form);

      this.$emit("closeModal");
    },
  },

  components: { ModalForm },
};
</script>

<style>
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
}
</style>