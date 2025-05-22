<template>
  <div>
    <h2>Listado de Productos</h2>

    <input
      type="text"
      v-model="searchTerm"
      placeholder="Buscar por nombre..."
      @input="applyFilter"
    />

    <div v-if="filteredProducts.length > 0">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.nombre }}</td>
            <td>${{ product.precio }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <button @click="deleteProduct(product.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No hay productos registrados.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { db } from '../firebase' // Assuming your firebase config is here
import { collection, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore'

// defineEmits(['editProduct']) 

const products = ref([])
const searchTerm = ref('')
const filteredProducts = ref([])

const setupRealtimeListener = () => {
  const productsCollectionRef = collection(db, 'productos')
  const q = query(productsCollectionRef, orderBy('nombre', 'asc')); 

  onSnapshot(q, (snapshot) => {
    products.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    applyFilter() 
  }, (error) => {
    console.error("Error fetching real-time products:", error)
  })
}

const deleteProduct = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    try {
      await deleteDoc(doc(db, 'productos', id))
      console.log("Producto eliminado con éxito:", id)
    } catch (error) {
      console.error("Error eliminando producto:", error)
    }
  }
}

const applyFilter = () => {
  if (searchTerm.value) {
    filteredProducts.value = products.value.filter(product =>
      product.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  } else {
    filteredProducts.value = products.value
  }
}

onMounted(() => {
  setupRealtimeListener()
})

watch(searchTerm, applyFilter)
</script>

<style scoped>
/* Basic styling for readability */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

input[type="text"] {
  padding: 8px;
  width: 300px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>