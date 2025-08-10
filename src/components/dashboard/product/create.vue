<template>
  <div class="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen font-sans">
    <header class="mb-8">
      <h1 class="text-3xl font-extrabold text-gray-900">Create New Product</h1>
      <p class="mt-1 text-sm text-gray-600">Fill out the details below to add a new product to your inventory.</p>
    </header>

    <form @submit.prevent="saveProduct" class="space-y-8">
      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 class="text-xl font-bold text-gray-800 mb-6">Product Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="product-name" class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              v-model="product.name"
              type="text"
              id="product-name"
              placeholder="e.g., Wireless Ergonomic Mouse"
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          <div>
            <label for="product-price" class="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              v-model.number="product.price"
              type="number"
              id="product-price"
              placeholder="e.g., 99.99"
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div class="col-span-1 md:col-span-2">
            <label for="product-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="product.description"
              id="product-description"
              rows="4"
              placeholder="A detailed description of the product and its features."
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 class="text-xl font-bold text-gray-800 mb-6">Categorization & Sourcing</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="product-category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              v-model="product.category_id"
              id="product-category"
              class="block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            >
              <option value="" disabled>Select a category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="product-brand" class="block text-sm font-medium text-gray-700 mb-1">Brand (Optional)</label>
           <select
              v-model="product.brand_id"
              id="product-brand"
              class="block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">Select Brand</option>
              <option 
                v-for="brand in brands" 
                :key="brand.id" 
                :value="brand.id"
              >
                {{ brand.name }}
              </option>
            </select>
          </div>
          <div class="col-span-1 md:col-span-2">
            <label for="product-supplier" class="block text-sm font-medium text-gray-700 mb-1">Supplier (Optional)</label>
            <select
              v-model="product.supplier_id"
              id="product-supplier"
              class="block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option :value="null">  Select Supplier</option>
              <option
              
               v-for="supplier in suppliers" 
              :key="supplier.id" 
              :value="supplier.id">
                {{ supplier.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 class="text-xl font-bold text-gray-800 mb-6">Visuals & Status</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="product-image-upload" class="block text-sm font-medium text-gray-700 mb-1">Product Image (Optional)</label>
            <div 
              @click="openImageSelector"
              @dragover.prevent
              @drop.prevent="handleImageDrop"
              class="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200"
            >
              <input
                type="file"
                ref="fileInput"
                @change="handleImageUpload"
                accept="image/*"
                class="hidden"
              />
              <div v-if="!product.imageUrlPreview" class="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
                <p class="mt-2 text-sm">Drag and drop or click to upload</p>
                <p class="text-xs text-gray-400">PNG, JPG, GIF up to 2MB</p>
              </div>
              <div v-else class="flex flex-col items-center justify-center">
                <img :src="product.imageUrlPreview" alt="Product Image Preview" class="h-32 w-32 object-contain rounded-lg">
                <button type="button" @click.stop="removeImage" class="mt-2 text-red-500 hover:text-red-700 text-sm">Remove</button>
              </div>
            </div>
          </div>
          <div>
            <label for="product-rating" class="block text-sm font-medium text-gray-700 mb-1">Rating (Optional)</label>
            <input
              v-model.number="product.rating"
              type="number"
              id="product-rating"
              placeholder="e.g., 4.5 (out of 5)"
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              min="0"
              max="5"
              step="0.1"
            />
            <label for="product-size" class="block text-sm font-medium text-gray-700 mt-6 mb-1">Size (Optional)</label>
            <input
              v-model="product.size"
              type="text"
              id="product-size"
              placeholder="e.g., M, L, XL or 10x10x5cm"
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <div class="flex items-center mt-6">
              <input
                v-model="product.is_active"
                id="product-active"
                type="checkbox"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label for="product-active" class="ml-2 block text-sm text-gray-900">
                Is Active
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ errorMessage }}</p>
      </div>
      <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md" role="alert">
        <p class="font-bold">Success</p>
        <p>{{ successMessage }}</p>
      </div>

      <div class="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          @click="cancelCreate"
          class="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="isLoading"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {{ isLoading ? 'Creating...' : 'Create Product' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../axios/Axios'; // Adjust this path

const router = useRouter();
const fileInput = ref(null);

const product = ref({
  name: '',
  description: '',
  price: null,
  rating: null,
  size: '',
  category_id: '',
  brand_id: null,
  supplier_id: null,
  imageFile: null,
  imageUrlPreview: '',
  is_active: true,
});

const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const categories = ref([]);
const brands = ref([]);
const suppliers = ref([]);

onMounted(() => {
  fetchDropdownData();
});

const fetchDropdownData = async () => {
  try {
    const categoriesResponse = await api.get('/categories');
    categories.value = categoriesResponse.data.data;
     const brandsResponse = await api.get('/products');
    brands.value =brandsResponse.data.data;
    // brands.value = [
    //   { id: 101, name: 'TechCo' },
    //   { id: 102, name: 'Fashionista' },
    //   { id: 103, name: 'HomeLux' },
    // ];
    suppliers.value = [
      { id: 201, name: 'Global Supply' },
      { id: 202, name: 'Local Distributors' },
    ];
  } catch (error) {
    console.error("Failed to fetch dropdown data:", error);
    errorMessage.value = "Failed to load necessary data for dropdowns.";
  }
};

const openImageSelector = () => {
  fileInput.value.click();
};

const handleImageDrop = (event) => {
  const file = event.dataTransfer.files[0];
  processFile(file);
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  processFile(file);
};

const processFile = (file) => {
  if (!file) return;

  try {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a JPEG, PNG, JPG, GIF, or SVG image.');
    }
    if (file.size > maxSize) {
      throw new Error('File size exceeds the 2MB limit.');
    }
    
    // Clean up old URL before creating a new one
    if (product.value.imageUrlPreview) {
      URL.revokeObjectURL(product.value.imageUrlPreview);
    }
    
    product.value.imageFile = file;
    product.value.imageUrlPreview = URL.createObjectURL(file);
    errorMessage.value = ''; // Clear any previous errors
  } catch (error) {
    alert(error.message);
    if (fileInput.value) fileInput.value.value = ''; // Reset input
    product.value.imageFile = null;
    if (product.value.imageUrlPreview) {
      URL.revokeObjectURL(product.value.imageUrlPreview);
      product.value.imageUrlPreview = '';
    }
  }
};

const removeImage = () => {
  if (product.value.imageUrlPreview) {
    URL.revokeObjectURL(product.value.imageUrlPreview);
  }
  product.value.imageFile = null;
  product.value.imageUrlPreview = '';
  if (fileInput.value) fileInput.value.value = '';
};

const saveProduct = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  const formData = new FormData();
  formData.append('name', product.value.name);
  formData.append('price', product.value.price);
  formData.append('category_id', product.value.category_id);

  if (product.value.description) formData.append('description', product.value.description);
  if (product.value.rating !== null) formData.append('rating', product.value.rating);
  if (product.value.size) formData.append('size', product.value.size);
  if (product.value.brand_id !== null) formData.append('brand_id', product.value.brand_id);
  if (product.value.supplier_id !== null) formData.append('supplier_id', product.value.supplier_id);
  if (product.value.imageFile) formData.append('image', product.value.imageFile);
  
  formData.append('is_active', product.value.is_active ? 1 : 0);

  try {
    const token = sessionStorage.getItem("auth_token");
    if (!token) {
      errorMessage.value = "Authentication token not found. Please log in.";
      isLoading.value = false;
      return;
    }

    await api.post(
      "/addproducts",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      }
    );

    successMessage.value = 'Product created successfully! Redirecting...';
    if (product.value.imageUrlPreview) URL.revokeObjectURL(product.value.imageUrlPreview);

    setTimeout(() => {
      router.push({ name: 'product-list' }); 
    }, 1500);

  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    const apiError = error.response?.data?.message || 'An unexpected error occurred.';
    errorMessage.value = "Failed to create product: " + apiError;
  } finally {
    isLoading.value = false;
  }
};

const cancelCreate = () => {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    if (product.value.imageUrlPreview) URL.revokeObjectURL(product.value.imageUrlPreview);
    router.push({ name: 'product-list' }); 
  }
};
</script>