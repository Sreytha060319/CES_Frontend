<!-- e.g., /views/categorys/CreateCategoryPage.vue -->
<template>
  <div class="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
    <header class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Create Category</h1>
     
    </header>

    <div class="bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <form @submit.prevent="saveCategory">
        <div class="space-y-8">
          
          <!-- Name and Parent Category Inputs -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Category Name -->
            <div>
              <label for="category-name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                v-model="category.name"
                type="text" 
                id="category-name"
                placeholder="Name" 
                class="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <!-- Parent Category Select -->
            <div>
              <label for="parent-category" class="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
              <select 
                v-model="category.parentId"
                id="parent-category"
                class="block w-full px-4 py-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option :value="null" disabled>Select Parent Category</option>
                <option v-for="parent in parentCategories" :key="parent.id" :value="parent.id">
                  {{ parent.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- File Uploader -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
            <FileUploader v-model="category.file" />
          </div>

          <!-- Featured Category Checkbox -->
          <div class="flex items-center">
            <input 
              v-model="category.isFeatured"
              id="featured-category" 
              type="checkbox" 
              class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="featured-category" class="ml-2 block text-sm text-gray-900">
              Featured Category
            </label>
          </div>

          <!-- Save Button -->
          <div>
            <button 
              type="submit" 
              class="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Save Category
            </button>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 1. Import useRouter
// import FileUploader from './FileUploader.vue'; 

// 2. Get the router instance
const router = useRouter();

// --- Form State ---
const category = ref({
  name: '',
  parentId: null,
  file: null,
  isFeatured: false,
});

// --- Mock Data for Parent Categories (replace with API call) ---
const parentCategories = ref([
  { id: 1, name: 'Men\'s Fashion' },
  { id: 2, name: 'Women\'s Fashion' },
  { id: 3, name: 'Electronics' },
  { id: 4, name: 'Gadgets' },
]);

// --- Form Submission Handler ---
const saveCategory = () => {
  console.log('Saving category...');

  // --- 3. THE FIX: Navigate back to the category list page ---
  // In a real app, this would be inside the .then() or after an await of your API call.
  // It's better to navigate by route name to make your code more resilient to URL changes.
  router.push({ name: 'CategoryList' }); 
};
</script>