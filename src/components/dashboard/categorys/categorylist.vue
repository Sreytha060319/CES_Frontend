<!-- e.g., /views/categorys/CategoryListPage.vue -->
<template>
  <div class="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
    <div class="bg-white p-6 rounded-lg shadow-md">
      
      <!-- Header Section -->
      <header class="pb-6 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-800">Product Categories</h1>
        <div class="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between">
          
          <!-- Search Bar -->
          <div class="relative w-full md:w-1/3">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search Category..." 
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <!-- Add Category Button -->
          <router-link to="/admin/categorys/createcategory"
        class="bg-gray-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-700 transition font-semibold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Create Category
      </router-link>
        </div>
      </header>

      <!-- Table Section -->
      <div class="overflow-x-auto mt-6">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th v-for="header in headers" :key="header.value" scope="col" class="px-6 py-3 cursor-pointer" @click="sortBy(header.value)">
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
                <img :src="item.imageUrl" :alt="item.name" class="w-10 h-10 rounded-lg object-cover">
              </td>
              <td class="px-6 py-4">{{ item.level }}</td>
              <td class="px-6 py-4">
                <ToggleSwitch v-model="item.featured" />
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-4">
                  <button @click="editCategory(item.id)" class="text-gray-500 hover:text-blue-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
                  </button>
                  <button @click="deleteCategory(item.id)" class="text-gray-500 hover:text-red-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center pt-6">
        <nav class="flex items-center space-x-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
          </button>
          <span class="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md">{{ currentPage }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages" class="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
          </button>
        </nav>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import ToggleSwitch from './ToggleSwitch.vue'; // We will create this component next

// --- Table Headers ---
const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Image', value: 'image', sortable: false },
  { text: 'Level', value: 'level' },
  { text: 'Featured', value: 'featured' },
  { text: 'Action', value: 'action', sortable: false },
];

// --- Mock Data (replace with your API call) ---
const categories = ref([
  { id: '#ce8d812a', name: 'Baby Doll', imageUrl: 'https://placehold.co/40x40/FFC107/FFFFFF/png?text=B', level: 1, featured: false },
  { id: '#4c9681ac', name: 'Birthday Gift', imageUrl: 'https://placehold.co/40x40/4CAF50/FFFFFF/png?text=G', level: 1, featured: true },
  { id: '#f7b1da64', name: 'Cosmetics', imageUrl: 'https://placehold.co/40x40/E91E63/FFFFFF/png?text=C', level: 1, featured: true },
  { id: '#c8305a8a', name: 'Couple Gift', imageUrl: 'https://placehold.co/40x40/3F51B5/FFFFFF/png?text=CG', level: 1, featured: true },
  { id: '#e6d2c2e3', name: 'Gadgets', imageUrl: 'https://placehold.co/40x40/00BCD4/FFFFFF/png?text=G', level: 1, featured: true },
  { id: '#96c813a8', name: "Men's Fashion", imageUrl: 'https://placehold.co/40x40/795548/FFFFFF/png?text=M', level: 1, featured: true },
  { id: '#76f4a1dd', name: "Women's Fashion", imageUrl: 'https://placehold.co/40x40/9C27B0/FFFFFF/png?text=W', level: 1, featured: false },
  // Add more data for pagination testing...
  { id: '#1234abcd', name: 'Electronics', imageUrl: 'https://placehold.co/40x40/212121/FFFFFF/png?text=E', level: 2, featured: true },
]);

// --- State for Searching, Sorting, and Pagination ---
const searchQuery = ref('');
const sortKey = ref('id');
const sortOrder = ref('asc');
const currentPage = ref(1);
const itemsPerPage = 7;

// --- Computed properties for dynamic table data ---
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

const totalPages = computed(() => {
  return Math.ceil(filteredAndSortedCategories.value.length / itemsPerPage);
});

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAndSortedCategories.value.slice(start, end);
});


// --- Methods ---
const sortBy = (key) => {
  if (headers.find(h => h.value === key && h.sortable === false)) return;
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

const addCategory = () => {
  alert('Navigating to Add Category page...');
  // e.g., router.push('/categories/create');
};

const editCategory = (id) => {
  alert(`Editing category: ${id}`);
  // e.g., router.push(`/categories/edit/${id}`);
};

const deleteCategory = (id) => {
  if (confirm(`Are you sure you want to delete category ${id}?`)) {
    categories.value = categories.value.filter(c => c.id !== id);
    alert(`Deleted category: ${id}`);
  }
};
</script>