<template>
  <div class="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
    <div class="bg-white p-6 rounded-lg shadow-md">
      <!-- Header -->
      <header class="pb-6 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-800">Product Categories</h1>
        <div class="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between">
          <!-- Search Bar -->
          <div class="relative w-full md:w-1/3">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-search text-gray-400"></i>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Category..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <!-- Add Button -->
          <router-link
            to="/admin/categorys/createcategory"
            class="mt-4 md:mt-0 bg-gray-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-700 transition font-semibold flex items-center"
          >
            <i class="fas fa-plus mr-2"></i>
            Create Category
          </router-link>
        </div>
      </header>

      <!-- Table -->
      <div class="overflow-x-auto mt-6">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th v-for="header in headers" :key="header.value" class="px-6 py-3 cursor-pointer" @click="sortBy(header.value)">
                <div class="flex items-center">
                  {{ header.text }}
                  <svg v-if="sortKey === header.value" class="w-3 h-3 ml-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedCategories" :key="item.id" class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900">{{ item.id }}</td>
              <td class="px-6 py-4">
                <span class="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">{{ item.name }}</span>
              </td>
              <td class="px-6 py-4">
              <div class="w-14 h-14 min-w-[56px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img class="w-full h-full object-cover rounded-lg" :src="item.image" :alt="item.name">
              </div>
              </td>
              <td class="px-6 py-4">{{ item.level }}</td>
             
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="editCategory(item.id)" class="text-blue-600 hover:text-blue-800 mr-4 transition duration-150 ease-in-out transform hover:scale-105">
                  <i class="fas fa-edit mr-1"></i> Edit
                </button>
                <button @click="deleteCategory(item.id)" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center pt-6">
        <nav class="flex items-center space-x-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
            <i class="fas fa-chevron-left"></i>
          </button>
          <span class="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md">{{ currentPage }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages" class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50">
            <i class="fas fa-chevron-right"></i>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../../../axios/Axios';
// import ToggleSwitch from './ToggleSwitch.vue';

const headers = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Name', value: 'name', sortable: true },
  { text: 'Image', value: 'image', sortable: false },
  { text: 'Level', value: 'level', sortable: true },
 
  { text: 'Action', value: 'action', sortable: false },
];

const categories = ref([]);
const searchQuery = ref('');
const sortKey = ref('id');
const sortOrder = ref('asc');
const currentPage = ref(1);
const itemsPerPage = 7;

const fetchCategories = async () => {
  try {
    const token = sessionStorage.getItem("auth_token");
    const response = await api.get("/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    categories.value = response.data.data || [];
    console.log(response.data.data)
  } catch (error) {
    console.error("Fetch failed:", error);
    categories.value = [];
  }
};

onMounted(fetchCategories);

const filteredAndSortedCategories = computed(() => {
  let result = categories.value.filter(category =>
    category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (sortKey.value) {
    result.sort((a, b) => {
      const valA = a[sortKey.value];
      const valB = b[sortKey.value];
      if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredAndSortedCategories.value.length / itemsPerPage)
);

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredAndSortedCategories.value.slice(start, start + itemsPerPage);
});

const sortBy = (key) => {
  const header = headers.find(h => h.value === key);
  if (!header || header.sortable === false) return;

  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const editCategory = (id) => {
  alert(`Editing category: ${id}`);
  // this.$router.push(`/admin/categorys/edit/${id}`);
};

const deleteCategory = (id) => {
  if (confirm(`Are you sure you want to delete category ${id}?`)) {
    categories.value = categories.value.filter(c => c.id !== id);
    alert(`Deleted category: ${id}`);
  }
};
</script>
