<template>
  <div class="card mt-4">
    <div class="card-body">
      <div>
        Выбран пользователь <b>{{ user.firstName }} {{ user.lastName }}</b>
      </div>
      <div class="mt-3">
        Описание:<br />
        <textarea class="form-control" :value="user.description" />
      </div>
      <div class="mt-3">
        Адрес проживания: <b> {{ user.address.streetAddress }}</b
        ><br />
        Город: <b>{{ user.address.city }}</b
        ><br />
        Провинция/штат: <b>{{ user.address.state }}</b
        ><br />
        Индекс: <b>{{ user.address.zip }}</b
        ><br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
};
</script>

<style>
</style>