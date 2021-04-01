<template>
  <tr @click.prevent="$emit('clickUser', user)">
    <th scope="row">{{ user.id }}</th>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone }}</td>
  </tr>
</template>

<script>
export default {
  props: ["user"],
};
</script>

<style>
</style>