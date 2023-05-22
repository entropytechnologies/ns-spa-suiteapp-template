<script setup>
import {ref, onMounted} from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const employee_url = ref('/services/rest/record/v1/employee');

onMounted(() => {
  fetch(api_url.value + "employee")
    .then(response => {
      console.log(response.json());
    });
});
</script>

<template>
  <header>
    <div>
      <h1>EntropyERP Resource Allocation</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
