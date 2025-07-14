<template>
  <div class="p-8 font-sans bg-gray-50 min-h-screen">
    <!-- Header Section -->
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold mb-2">Edit</h1>
        <nav class="text-gray-600 text-sm">
          <router-link to="/admin/home" class="hover:underline">Dashboard</router-link> •
          <router-link to="/admin/products/list" class="hover:underline">Product</router-link> •
          <span class="text-gray-900">{{ productName || 'Loading...' }}</span>
        </nav>
      </div>
      <!-- No "New product" button here, as this is the edit page -->
    </header>

    <!-- Main Content Area -->
    <form @submit.prevent="saveChanges" class="space-y-6">
      <!-- Details Card -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center cursor-pointer mb-4" @click="toggleSection('detailsOpen')">
          <div>
            <h2 class="text-xl font-semibold">Details</h2>
            <p class="text-gray-500 text-sm">Title, short description, image...</p>
          </div>
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

      <!-- Specifications Card (New Section) -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Specifications</h2>
        <textarea
          v-model="specificationsContent"
          rows="10"
          placeholder="Category Mobile Manufacturer Apple Warranty 12 Months Serial number 358607726380311 Ships from United States

Product details
• The foam sockliner feels soft and comfortable
• Pull tab
• Not intended for use as Personal Protective Equipment
• Colour Shown: White/Black/Oxygen Purple/Action Grape
• Style: 921826-109
• Country/Region of Origin: China

Benefits
• Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort"
          class="mt-0 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            accept="image/*"
          />

          <!-- Display existing images -->
          <div v-if="existingImages.length > 0 || selectedFiles.length > 0" class="mt-6">
            <h3 class="text-md font-semibold text-gray-700 mb-3 text-left">Current Images:</h3>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-4">
              <div v-for="(img, index) in existingImages" :key="'existing-' + index" class="relative group">
                <img :src="img.url" :alt="img.name" class="w-full h-24 object-cover rounded-md border border-gray-200">
                <button
                  type="button"
                  @click="removeImage(index, true)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div v-for="(file, index) in selectedFiles" :key="'new-' + index" class="relative group">
                <img :src="getFilePreviewUrl(file)" :alt="file.name" class="w-full h-24 object-cover rounded-md border border-blue-400">
                <button
                  type="button"
                  @click="removeImage(index, false)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove new image"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="removeAllImages"
                class="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 transition text-sm"
              >
                Remove all
              </button>
              <button
                type="button"
                @click="uploadNewImages"
                :disabled="selectedFiles.length === 0"
                class="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </div>
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
              placeholder="0"
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
              placeholder="Tags"
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
              <input v-if="saleLabel" type="text" v-model="saleLabelText" placeholder="SALE" class="ml-2 mt-1 block w-24 border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div class="flex items-center justify-between">
              <label for="new-label" class="text-sm font-medium text-gray-700">New label</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="new-label" v-model="newLabel" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <input v-if="newLabel" type="text" v-model="newLabelText" placeholder="NEW" class="ml-2 mt-1 block w-24 border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
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
        <button
          type="submit"
          class="bg-gray-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-700 transition font-semibold"
        >
          Save changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductEdit',
  // You might want to get the product ID from the route params if your URL is like /admin/products/edit/123
  // props: {
  //   productId: [String, Number]
  // },
  data() {
    return {
      // Collapsible section states (open by default for editing)
      detailsOpen: true,
      propertiesOpen: true,
      pricingOpen: true,

      // Details
      productName: '',
      subDescription: '',
      content: '',
      specificationsContent: '', // New field for specifications

      // Images
      existingImages: [], // For images already on the server
      selectedFiles: [],  // For newly selected files that haven't been uploaded yet

      // Properties
      productCode: '',
      productSku: '',
      quantity: 0,
      selectedCategory: '',
      categories: ['T-shirts', 'Jeans', 'Dresses', 'Outerwear', 'Accessories', 'Shirts'], // Added 'Shirts'
      selectedColors: [],
      colors: ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Purple', 'Pink', 'Blue'], // Added Pink
      selectedSizes: [],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '7', '7.8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'], // Added numerical sizes
      tags: '', // Example: 'Technology, Health and Wellness'
      selectedGenders: [],
      saleLabel: false,
      saleLabelText: '', // Text for the sale label
      newLabel: false,
      newLabelText: '', // Text for the new label

      // Pricing
      regularPrice: 0.00,
      salePrice: 0.00,
      priceIncludesTaxes: false,
      tax: 0.00,

      // Final Publish state
      publishProduct: false,
    };
  },
  mounted() {
    // In a real application, you would fetch product data based on this.productId or this.$route.params.id
    // For this example, we'll mock the data from the screenshot
    this.fetchProductData();
  },
  methods: {
    toggleSection(section) {
      this[section] = !this[section];
    },
    // Simulates fetching existing product data
    fetchProductData() {
      // Replace with actual API call, e.g., axios.get(`/api/products/${this.$route.params.id}`)
      const mockProduct = {
        productName: 'Classic Leather Loafers',
        subDescription: 'Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.',
        content: 'Your main product description would go here, possibly in rich text format from a previous save.',
        specificationsContent: `Category Mobile Manufacturer Apple Warranty 12 Months Serial number 358607726380311 Ships from United States\n\nProduct details\n• The foam sockliner feels soft and comfortable\n• Pull tab\n• Not intended for use as Personal Protective Equipment\n• Colour Shown: White/Black/Oxygen Purple/Action Grape\n• Style: 921826-109\n• Country/Region of Origin: China\n\nBenefits\n• Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort`,
        existingImages: [
          { id: 'img1', url: 'https://cdn.pixabay.com/photo/2016/09/01/08/24/shoes-1635393_1280.jpg', name: 'Green Sneakers' },
          { id: 'img2', url: 'https://cdn.pixabay.com/photo/2017/08/06/18/43/shoes-2593671_1280.jpg', name: 'Dark Loafers' },
          { id: 'img3', url: 'https://cdn.pixabay.com/photo/2016/11/29/03/49/shoes-1867149_1280.jpg', name: 'Light Boots' },
          { id: 'img4', url: 'https://cdn.pixabay.com/photo/2017/04/05/17/28/shoes-2205567_1280.jpg', name: 'Heels' },
          { id: 'img5', url: 'https://cdn.pixabay.com/photo/2017/09/16/19/21/shoe-2757271_1280.jpg', name: 'Orange Sandals' },
          { id: 'img6', url: 'https://cdn.pixabay.com/photo/2017/03/26/17/07/shoes-2176465_1280.jpg', name: 'Black Heels' },
          { id: 'img7', url: 'https://cdn.pixabay.com/photo/2017/07/03/23/00/shoes-2468305_1280.jpg', name: 'Sneakers' },
          { id: 'img8', url: 'https://cdn.pixabay.com/photo/2017/07/26/04/08/shoes-2540700_1280.jpg', name: 'Blue Sandals' },
        ],
        productCode: '38BEE271',
        productSku: 'WW75K52IIYW/SV',
        quantity: 80,
        selectedCategory: 'Shirts',
        selectedColors: ['Blue', 'Pink'],
        selectedSizes: ['7.8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'], // Example values
        tags: 'Technology, Health and Wellness, Travel, Finance, Education', // Example
        selectedGenders: ['Men'],
        saleLabel: true,
        saleLabelText: 'SALE',
        newLabel: true,
        newLabelText: 'NEW',
        regularPrice: 97.14,
        salePrice: 0.00,
        priceIncludesTaxes: false,
        tax: 10.00,
        publishProduct: true,
      };

      // Populate data properties
      Object.assign(this.$data, mockProduct);
    },
    handleFileDrop(event) {
      const droppedFiles = Array.from(event.dataTransfer.files).filter(file => file.type.startsWith('image/'));
      this.selectedFiles = [...this.selectedFiles, ...droppedFiles];
      console.log('Files dropped:', this.selectedFiles.map(f => f.name));
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const newFiles = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      console.log('Files selected:', this.selectedFiles.map(f => f.name));
      // Reset file input to allow selecting the same file again if needed
      event.target.value = null;
    },
    getFilePreviewUrl(file) {
      return URL.createObjectURL(file);
    },
    removeImage(index, isExisting) {
      if (isExisting) {
        // In a real app, you'd mark this image for deletion on the server
        console.log('Marked existing image for deletion:', this.existingImages[index].name);
        this.existingImages.splice(index, 1);
      } else {
        // Just remove from the temporary selectedFiles array
        console.log('Removed newly selected image:', this.selectedFiles[index].name);
        URL.revokeObjectURL(this.getFilePreviewUrl(this.selectedFiles[index])); // Clean up URL object
        this.selectedFiles.splice(index, 1);
      }
    },
    removeAllImages() {
      // In a real app, you'd mark all existing images for deletion
      console.log('Marked all existing images for deletion.');
      this.existingImages = [];
      // Also clear all newly selected files and revoke their URLs
      this.selectedFiles.forEach(file => URL.revokeObjectURL(this.getFilePreviewUrl(file)));
      this.selectedFiles = [];
    },
    uploadNewImages() {
      if (this.selectedFiles.length === 0) {
        alert('No new images selected for upload.');
        return;
      }
      // In a real app, you'd send this.selectedFiles to your backend
      console.log('Initiating upload for:', this.selectedFiles.map(f => f.name));
      alert('Simulated upload initiated!');
      // After successful upload, you'd typically:
      // 1. Add uploaded image info (e.g., URLs from server) to existingImages
      // 2. Clear selectedFiles
      this.selectedFiles = []; // For demo, clear after 'upload'
    },
    formatPrice(event, model) {
      let value = parseFloat(event.target.value);
      if (isNaN(value)) {
        value = 0;
      }
      this[model] = parseFloat(value.toFixed(2));
      if (model === 'tax') {
        this[model] = Math.min(100, Math.max(0, this[model])); // Ensure tax is between 0 and 100
      }
    },
    saveChanges() {
      // This method would typically send the updated form data to your backend API
      console.log('--- Product Data Updated ---');
      console.log('Product Name:', this.productName);
      console.log('Sub Description:', this.subDescription);
      console.log('Content:', this.content);
      console.log('Specifications Content:', this.specificationsContent);
      console.log('Existing Images (after removals):', this.existingImages.map(img => img.url));
      console.log('New Images to Upload:', this.selectedFiles.map(f => f.name));
      console.log('Product Code:', this.productCode);
      console.log('Product SKU:', this.productSku);
      console.log('Quantity:', this.quantity);
      console.log('Category:', this.selectedCategory);
      console.log('Colors:', this.selectedColors);
      console.log('Sizes:', this.selectedSizes);
      console.log('Tags:', this.tags);
      console.log('Gender:', this.selectedGenders);
      console.log('Sale Label:', this.saleLabel, 'Text:', this.saleLabelText);
      console.log('New Label:', this.newLabel, 'Text:', this.newLabelText);
      console.log('Regular Price:', this.regularPrice);
      console.log('Sale Price:', this.salePrice);
      console.log('Price Includes Taxes:', this.priceIncludesTaxes);
      console.log('Tax (%):', this.tax);
      console.log('Publish Product:', this.publishProduct);
      console.log('------------------------------');

      alert('Product update initiated! Check console for data.');
      // You would typically make an API call here, e.g., using axios.put(`/api/products/${this.$route.params.id}`, { ...data });
      // After successful save, you might redirect: this.$router.push('/admin/products/list');
    },
  },
  beforeUnmount() {
    // Revoke any created object URLs to prevent memory leaks
    this.selectedFiles.forEach(file => URL.revokeObjectURL(this.getFilePreviewUrl(file)));
  }
};
</script>

<style scoped>
/* Scoped styles for this component only.
   Ensure Font Awesome is globally available if you use the i-tags for icons.
*/

/* Custom toggle switch styling (using Tailwind's peer utility) */
.peer:checked + div {
  background-color: var(--tw-bg-blue-600); /* Use Tailwind's default blue */
}
.peer-focus\:ring-green-300:focus + div {
  --tw-ring-color: #A7F3D0; /* Tailwind green-300 */
}
.peer-checked:after:translate-x-full:checked + div:after {
  transform: translateX(100%);
}
.peer-checked:after:border-white:checked + div:after {
  border-color: #fff;
}

.after\:absolute::after {
  position: absolute;
}

.after\:bg-white::after {
  background-color: #fff;
}
.after\:border-gray-300::after {
  border-color: #D1D5DB;
}
.after\:border::after {
  border-width: 1px;
}
.after\:rounded-full::after {
  border-radius: 9999px;
}
.after\:h-5::after {
  height: 1.25rem;
}
.after\:w-5::after {
  width: 1.25rem;
}
.after\:transition-all::after {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>