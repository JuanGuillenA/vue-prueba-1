<template>
  <h1>Listar Productos</h1>
  <ProductForm
    :currentId="currentId"
    @clearId="currentId = ''"
  />
  <hr>
  <productosList @editProduct="id => currentId = id" />
</template>

<script setup>
import { ref } from 'vue'
import productosList from './components/productosList.vue' 

const currentId = ref('') 
</script>

<style>
body {
  font-family: sans-serif;
  margin: 20px;
  background-color: #f4f4f4;
  color: #333;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

hr {
  border: 0;
  height: 1px;
  background-color: #eee;
  margin: 30px 0;
}
</style>