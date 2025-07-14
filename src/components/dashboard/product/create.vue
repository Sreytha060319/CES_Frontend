<template>
  <div class="p-8 font-sans bg-gray-50 min-h-screen">
    <!-- Header Section -->
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold mb-2">Create a new product</h1>
        <nav class="text-gray-600 text-sm">
          <router-link to="/admin/home" class="hover:underline">Dashboard</router-link> •
          <router-link to="/admin/products/list" class="hover:underline">Product</router-link> •
          <span class="text-gray-900">New product</span>
        </nav>
      </div>
      <!-- No "New product" button here, as this IS the new product page -->
    </header>

    <!-- Main Content Area -->
    <form @submit.prevent="createProduct" class="space-y-6">
      <!-- Details Card -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center cursor-pointer mb-4" @click="toggleSection('detailsOpen')">
          <div>
            <h2 class="text-xl font-semibold">Details</h2>
            <p class="text-gray-500 text-sm">Title, short description, image...</p>
          </div>
          <!-- Use Font Awesome icon for chevron, or replace with SVG/Tailwind directly -->
          <i class="fas fa-chevron-right transform transition-transform duration-200" :class="{ 'rotate-90': detailsOpen }"></i>
        </div>
        <div v-if="detailsOpen" class="space-y-4">
          <div>
            <label for="product-name" class="block text-sm font-medium text-gray-700 sr-only">Product name</label>
            <input
              type="text"
              id="product-name"
              v-model="productName"
              placeholder="Product name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="sub-description" class="block text-sm font-medium text-gray-700 sr-only">Sub description</label>
            <textarea
              id="sub-description"
              v-model="subDescription"
              rows="3"
              placeholder="Sub description"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Content Card (Rich Text Editor Placeholder) -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Content</h2>
        <!-- Rich Text Editor Toolbar Placeholder -->
        <div class="border border-gray-300 rounded-t-md flex items-center p-2 bg-gray-50">
          <select class="px-2 py-1 rounded-md bg-white border border-gray-300 text-gray-700 text-xs mr-2">
            <option>Paragraph</option>
            <option>Heading 1</option>
            <option>Heading 2</option>
          </select>
          <div class="flex space-x-2">
            <button type="button" class="p-1 rounded hover:bg-gray-200 text-gray-600 font-bold">B</button>
            <button type="button" class="p-1 rounded hover:bg-gray-200 text-gray-600 italic">I</button>
            <button type="button" class="p-1 rounded hover:bg-gray-200 text-gray-600 underline">U</button>
            <button type="button" class="p-1 rounded hover:bg-gray-200 text-gray-600 line-through">S</button>
            <!-- Replace Font Awesome icons with SVGs if Font Awesome is not loaded -->
            <i class="fas fa-list-ul p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-list-ol p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-align-left p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-align-center p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-align-right p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-align-justify p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-link p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-image p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-video p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-table p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-code p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
            <i class="fas fa-expand-arrows-alt p-1 rounded hover:bg-gray-200 text-gray-600 cursor-pointer"></i>
          </div>
        </div>
        <textarea
          v-model="content"
          rows="10"
          placeholder="Write something awesome..."
          class="mt-0 block w-full border border-gray-300 rounded-b-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
      </div>

      <!-- Images Card -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Images</h2>
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
          @dragover.prevent
          @drop.prevent="handleFileDrop"
        >
          <img
            class="mx-auto w-24 h-24 mb-4 object-contain"
            src="https://cdn.pixabay.com/photo/2020/07/03/11/53/folder-5366472_1280.png"
            alt="Upload icon"
          />
          <p class="text-gray-700 text-lg font-medium mb-2">Drop or select file</p>
          <p class="text-gray-500 text-sm">
            Drop files here or click to
            <button type="button" @click="triggerFileInput" class="text-blue-600 hover:underline focus:outline-none">browse</button>
            through your machine.
          </p>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileSelect"
            multiple
            class="hidden"
          />
          <div v-if="selectedFiles.length" class="mt-4 text-left">
            <p class="font-medium text-gray-700">Selected Files:</p>
            <ul class="list-disc list-inside text-gray-600 text-sm">
              <li v-for="(file, index) in selectedFiles" :key="index">{{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Properties Card -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center cursor-pointer mb-4" @click="toggleSection('propertiesOpen')">
          <div>
            <h2 class="text-xl font-semibold">Properties</h2>
            <p class="text-gray-500 text-sm">Additional functions and attributes...</p>
          </div>
          <i class="fas fa-chevron-right transform transition-transform duration-200" :class="{ 'rotate-90': propertiesOpen }"></i>
        </div>
        <div v-if="propertiesOpen" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="product-code" class="block text-sm font-medium text-gray-700 sr-only">Product code</label>
            <input
              type="text"
              id="product-code"
              v-model="productCode"
              placeholder="Product code"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="product-sku" class="block text-sm font-medium text-gray-700 sr-only">Product SKU</label>
            <input
              type="text"
              id="product-sku"
              v-model="productSku"
              placeholder="Product SKU"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="quantity" class="block text-sm font-medium text-gray-700 sr-only">Quantity</label>
            <input
              type="number"
              id="quantity"
              v-model.number="quantity"
              placeholder="Quantity"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 sr-only">Category</label>
            <select
              id="category"
              v-model="selectedCategory"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Select a category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div>
            <label for="colors" class="block text-sm font-medium text-gray-700 sr-only">Colors</label>
            <select
              id="colors"
              v-model="selectedColors"
              multiple
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-24"
            >
              <option v-for="color in colors" :key="color" :value="color">{{ color }}</option>
            </select>
          </div>
          <div>
            <label for="sizes" class="block text-sm font-medium text-gray-700 sr-only">Sizes</label>
            <select
              id="sizes"
              v-model="selectedSizes"
              multiple
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-24"
            >
              <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </div>
          <div class="col-span-full">
            <label for="tags" class="block text-sm font-medium text-gray-700 sr-only">Tags</label>
            <input
              type="text"
              id="tags"
              v-model="tags"
              placeholder="Tags (comma-separated)"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="col-span-full mt-4">
            <h3 class="block text-sm font-medium text-gray-700 mb-2">Gender</h3>
            <div class="flex space-x-4">
              <div class="flex items-center">
                <input
                  id="gender-men"
                  type="checkbox"
                  v-model="selectedGenders"
                  value="Men"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="gender-men" class="ml-2 block text-sm text-gray-900">Men</label>
              </div>
              <div class="flex items-center">
                <input
                  id="gender-women"
                  type="checkbox"
                  v-model="selectedGenders"
                  value="Women"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="gender-women" class="ml-2 block text-sm text-gray-900">Women</label>
              </div>
              <div class="flex items-center">
                <input
                  id="gender-kids"
                  type="checkbox"
                  v-model="selectedGenders"
                  value="Kids"
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="gender-kids" class="ml-2 block text-sm text-gray-900">Kids</label>
              </div>
            </div>
          </div>
          <div class="col-span-full flex flex-col space-y-4 mt-4">
            <div class="flex items-center justify-between">
              <label for="sale-label" class="text-sm font-medium text-gray-700">Sale label</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="sale-label" v-model="saleLabel" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <label for="new-label" class="text-sm font-medium text-gray-700">New label</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="new-label" v-model="newLabel" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Pricing Card -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center cursor-pointer mb-4" @click="toggleSection('pricingOpen')">
          <div>
            <h2 class="text-xl font-semibold">Pricing</h2>
            <p class="text-gray-500 text-sm">Price related inputs</p>
          </div>
          <i class="fas fa-chevron-right transform transition-transform duration-200" :class="{ 'rotate-90': pricingOpen }"></i>
        </div>
        <div v-if="pricingOpen" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="regular-price" class="block text-sm font-medium text-gray-700 sr-only">Regular price</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="regular-price"
                v-model.number="regularPrice"
                @blur="formatPrice($event, 'regularPrice')"
                placeholder="0.00"
                step="0.01"
                class="block w-full pl-7 pr-3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label for="sale-price" class="block text-sm font-medium text-gray-700 sr-only">Sale price</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="sale-price"
                v-model.number="salePrice"
                @blur="formatPrice($event, 'salePrice')"
                placeholder="0.00"
                step="0.01"
                class="block w-full pl-7 pr-3 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div class="col-span-full">
            <div class="flex items-center justify-between mt-4">
              <label for="price-includes-taxes" class="text-sm font-medium text-gray-700">Price includes taxes</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="price-includes-taxes" v-model="priceIncludesTaxes" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          <div class="col-span-full">
            <label for="tax" class="block text-sm font-medium text-gray-700 sr-only">Tax (%)</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input
                type="number"
                id="tax"
                v-model.number="tax"
                @blur="formatPrice($event, 'tax')"
                placeholder="0.00"
                step="0.01"
                class="block w-full pr-7 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Action Bar -->
      <div class="flex justify-between items-center bg-white rounded-lg shadow-lg p-6">
        <div class="flex items-center">
          <label for="publish-product" class="text-sm font-medium text-gray-700 mr-3">Publish</label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="publish-product" v-model="publishProduct" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
       <!-- CORRECTED BUTTON: type="submit" and no @click directly -->
       <button
          type="submit"
          class="bg-gray-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-700 transition font-semibold"
        >
          Create product
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import api from '../../../axios/Axios';

const router = useRouter(); // Initialize router

// --- Section Open/Close States ---
const detailsOpen = ref(true);
const propertiesOpen = ref(true);
const pricingOpen = ref(true);

const toggleSection = (sectionName) => {
  if (sectionName === 'detailsOpen') {
    detailsOpen.value = !detailsOpen.value;
  } else if (sectionName === 'propertiesOpen') {
    propertiesOpen.value = !propertiesOpen.value;
  } else if (sectionName === 'pricingOpen') {
    pricingOpen.value = !pricingOpen.value;
  }
};

// --- Form Data States ---
const productName = ref('');
const subDescription = ref('');
const content = ref('');

// File Upload
const fileInput = ref(null);
const selectedFiles = ref([]);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  selectedFiles.value = Array.from(event.target.files);
  console.log('Selected files:', selectedFiles.value);
  // In a real app, you'd upload these files
};

const handleFileDrop = (event) => {
  selectedFiles.value = Array.from(event.dataTransfer.files);
  console.log('Dropped files:', selectedFiles.value);
  // In a real app, you'd upload these files
};

// Properties
const productCode = ref('');
const productSku = ref('');
const quantity = ref(0);
const categories = ['Apparel', 'Shose', 'Accessories', 'Electronics', 'Home Goods'];
const selectedCategory = ref('');
const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow'];
const selectedColors = ref([]);
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const selectedSizes = ref([]);
const tags = ref(''); // Will be a comma-separated string
const selectedGenders = ref([]); // Array for multi-select
const saleLabel = ref(false);
const newLabel = ref(false);

// Pricing
const regularPrice = ref(0.00);
const salePrice = ref(0.00);
const priceIncludesTaxes = ref(false);
const tax = ref(0.00);

const formatPrice = (event, field) => {
  let value = parseFloat(event.target.value);
  if (isNaN(value)) {
    value = 0.00;
  }
  // Ensure it's always two decimal places
  if (field === 'regularPrice') {
    regularPrice.value = parseFloat(value.toFixed(2));
  } else if (field === 'salePrice') {
    salePrice.value = parseFloat(value.toFixed(2));
  } else if (field === 'tax') {
    tax.value = parseFloat(value.toFixed(2));
  }
};

// Publish
const publishProduct = ref(false);

// --- Create Product Method ---
const createProduct = async () => {
    const formData = new FormData();

    // Append all your form fields to FormData
    formData.append('name', productName.value);
    // Backend expects 'description', mapping 'content' from frontend
    formData.append('description', content.value);
    // Backend expects 'price', mapping 'regularPrice' from frontend
    formData.append('price', regularPrice.value);
    // formData.append('rating', productRating.value); // Ensure productRating ref exists and is bound
    formData.append('size', selectedSizes.value.length > 0 ? selectedSizes.value[0] : ''); // Backend expects single string 'size'
    // formData.append('id_category', selectedCategory.value);
    // formData.append('id_specialmenu', selectedSpecialMenu.value); // Make sure this ref is bound to your input

    // Optional fields from your frontend, even if not validated by backend yet:
    // formData.append('subDescription', subDescription.value);
    // formData.append('productCode', productCode.value);
    // formData.append('productSku', productSku.value);
    // formData.append('quantity', quantity.value);
    // formData.append('colors', JSON.stringify(selectedColors.value)); // Send arrays as JSON string
    // formData.append('sizes_array', JSON.stringify(selectedSizes.value)); // If you want to send all sizes
    // formData.append('tags', tags.value.split(',').map(tag => tag.trim()).filter(tag => tag).join(',')); // Send as comma-separated string
    // formData.append('gender', selectedGenders.value.join(',')); // Send as comma-separated string
    // formData.append('saleLabel', saleLabel.value ? 1 : 0); // Convert boolean to 1 or 0
    // formData.append('newLabel', newLabel.value ? 1 : 0);
    // formData.append('salePrice', salePrice.value);
    // formData.append('priceIncludesTaxes', priceIncludesTaxes.value ? 1 : 0);
    // formData.append('tax', tax.value);
    // formData.append('status', publishProduct.value ? 'Published' : 'Draft');

    if(selectedFiles.value[0]){
      console.log("selectedFiles.value[0]", selectedFiles.value[0])
      formData.append('image', selectedFiles.value[0]);
    }

    try {
        const token = sessionStorage.getItem("auth_token");
        if (!token) {
            alert("No token found. Please log in.");
            return;
        }

        const response = await api.post(
            "/addproducts", // Correct endpoint for creating products
            formData, // Send the FormData object as the request body
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            }
        );

        console.log('Product created successfully:', response.data);
        alert('Product created successfully!');
        router.push('/admin/products/list'); // Navigate after successful creation

    } catch (error) {
        console.error("Error creating product:", error.response?.data || error.message);
        alert("Failed to create product. Please check console for details.");
        // Optionally, handle specific error messages from error.response.data.errors
    }
};
</script>

<style scoped>
/* Scoped styles are for this component only.
   Ensure Font Awesome is imported globally (e.g., in main.js or index.html)
   if you're using `<i>` tags with `fas` classes.
   Alternatively, replace them with inline SVGs or custom icon components.
*/
</style>