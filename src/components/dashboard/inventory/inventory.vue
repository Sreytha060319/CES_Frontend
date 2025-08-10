<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Inventory Management</h2>

    <!-- Inventory Table -->
    <table class="min-w-full bg-white border">
      <thead>
        <tr>
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Product</th>
          <th class="border px-4 py-2">In Stock</th>
          <th class="border px-4 py-2">Last Restock</th>
          <th class="border px-4 py-2">Reorder Point</th>
          <th class="border px-4 py-2">Reorder Qty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventories" :key="item.id" class="text-center">
          <td class="border px-4 py-2">{{ item.id }}</td>
          <td class="border px-4 py-2">{{ item.product.name }}</td>
          <td class="border px-4 py-2">{{ item.quantity_instock }}</td>
          <td class="border px-4 py-2">{{ item.last_restock_date }}</td>
          <td class="border px-4 py-2">{{ item.reorder_point }}</td>
          <td class="border px-4 py-2">{{ item.reorder_quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const inventories = ref([])

onMounted(async () => {
  const res = await axios.get('/api/inventory')
  inventories.value = res.data
})
</script>
