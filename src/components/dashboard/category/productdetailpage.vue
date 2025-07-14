<template>
  <div class="font-kantumruy bg-white text-gray-800">
    <!-- You would typically have a global Header component here -->

    <div v-if="loading" class="text-center py-40">
      <p class="text-xl text-gray-500">Loading Product...</p>
    </div>

    <div v-else-if="!product" class="text-center py-40">
      <h1 class="text-3xl font-bold text-red-600">Product Not Found</h1>
      <router-link
        to="/"
        class="mt-6 inline-block bg-pink-700 text-white font-bold py-2 px-4 rounded hover:bg-pink-800"
      >
        Back to Collection
      </router-link>
    </div>

    <div v-else class="container mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="text-sm text-gray-500 mb-6">
        <ol class="list-none p-0 inline-flex">
          <li class="flex items-center">
            <router-link to="/productdetailpage" class="hover:text-pink-700">Dashboard</router-link>
            <span class="mx-2">/</span>
          </li>
          <li class="flex items-center">
            <router-link to="/women" class="hover:text-pink-700"
              >Women</router-link
            >
            <span class="mx-2">/</span>
          </li>
          <li class="text-gray-700">{{ product.name }}</li>
        </ol>
      </nav>

      <!-- Main Product Section -->
      <main class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <!-- Image Gallery (Left Column) -->
        <div class="flex flex-col-reverse md:flex-row gap-4">
          <!-- Thumbnails -->
          <div class="flex md:flex-col gap-3 justify-center md:justify-start">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              @click="activeImage = image"
              class="w-16 h-20 rounded-md overflow-hidden border-2 transition"
              :class="
                activeImage === image
                  ? 'border-pink-600'
                  : 'border-transparent hover:border-gray-300'
              "
            >
              <img
                :src="image"
                :alt="`${product.name} view ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
          <!-- Active Image -->
          <div class="flex-1">
            <img
              :src="activeImage"
              :alt="product.name"
              class="w-full h-auto object-contain rounded-lg shadow-sm"
            />
          </div>
        </div>

        <!-- Product Details (Right Column) -->
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {{ product.name }}
          </h1>
          <p class="text-sm text-gray-500 mb-4">SKU: {{ product.sku }}</p>
          <p class="text-3xl font-bold text-pink-700 mb-6">
            {{ product.price }}
          </p>

          <!-- Color Selector -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Color: <span class="font-semibold">{{ selectedColor.name }}</span>
            </label>
            <div class="flex space-x-2">
              <button
                v-for="color in product.colors"
                :key="color.name"
                @click="selectedColor = color"
                class="w-8 h-8 rounded-full border-2 transition"
                :class="
                  selectedColor.name === color.name
                    ? 'border-pink-600'
                    : 'border-gray-300'
                "
                :style="{ backgroundColor: color.hex }"
                :aria-label="`Select color ${color.name}`"
              ></button>
            </div>
          </div>

          <!-- Size Selector -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700"
                >Size</label
              >
              <a href="#" class="text-sm text-pink-600 hover:underline"
                >Size Guide</a
              >
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in product.sizes"
                :key="size"
                @click="selectedSize = size"
                class="px-4 py-2 border rounded-md text-sm font-medium transition"
                :class="
                  selectedSize === size
                    ? 'bg-pink-700 text-white border-pink-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                "
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity & Add to Cart -->
          <div class="flex items-stretch gap-4 my-8">
            <!-- Quantity Selector -->
            <div class="flex items-center border border-gray-300 rounded-md">
              <button
                @click="decreaseQuantity"
                class="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
              >
                -
              </button>
              <span class="px-4 text-center w-12">{{ quantity }}</span>
              <button
                @click="increaseQuantity"
                class="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
              >
                +
              </button>
            </div>
            <!-- Add to Cart -->
            <button
              class="flex-1 bg-pink-700 text-white font-bold py-3 px-6 rounded-md hover:bg-pink-800 transition-colors"
            >
              ADD TO BAG
            </button>
            <!-- Wishlist -->
            <button
              class="p-3 border border-gray-300 rounded-md text-gray-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-600 transition"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 18.75l-7.682-7.682a4.5 4.5 0 010-6.364z"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Accordion for Details -->
          <div class="border-t">
            <div class="border-b">
              <button
                @click="toggleAccordion('description')"
                class="w-full flex justify-between items-center py-4 text-left"
              >
                <span class="font-semibold text-gray-800"
                  >Product Description</span
                >
                <svg
                  class="w-5 h-5 transition-transform"
                  :class="{ 'rotate-180': activeAccordion === 'description' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                v-if="activeAccordion === 'description'"
                class="pb-4 text-gray-600 text-sm space-y-2"
              >
                <p>{{ product.description }}</p>
                <ul class="list-disc list-inside pl-2">
                  <li v-for="(detail, i) in product.details" :key="i">
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="border-b">
              <button
                @click="toggleAccordion('delivery')"
                class="w-full flex justify-between items-center py-4 text-left"
              >
                <span class="font-semibold text-gray-800"
                  >Delivery & Returns</span
                >
                <svg
                  class="w-5 h-5 transition-transform"
                  :class="{ 'rotate-180': activeAccordion === 'delivery' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                v-if="activeAccordion === 'delivery'"
                class="pb-4 text-gray-600 text-sm"
              >
                <p>
                  Standard delivery within 3-5 working days. Free returns within
                  30 days of purchase. See our full policy for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
// MOCK DATABASE: In a real app, you'd fetch this from an API.
const allProducts = [
  // This product has multiple images and options, matching the new design.
  {
    id: 1,
    name: 'Knitting Button Short Tops',
    sku: 'SN-2024-001',
    price: '$13.50',
    description:
      'A stylish and trendy patchwork shirt, perfect for a Y2K aesthetic. Made from comfortable, breathable fabric, it features a unique button design and a flattering cropped fit.',
    details: [
      'Regular fit',
      '95% Cotton, 5% Spandex',
      'Machine washable',
      'Made in Cambodia',
    ],
    images: [
      '/images/T-shirt (3).jpg',
      '/images/pic4.jpg', // Add more image paths for the gallery
      '/images/pic6.jpg',
      '/images/pic1.jpg',
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Pink', hex: '#FBCFE8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  // Add other products here with the same detailed structure...
  {
    id: 2,
    name: 'Elegant Summer Dress',
    sku: 'SN-2024-002',
    price: '$22.00',
    description: 'A beautiful and light floral dress...',
    details: ['Flowy fit', '100% Rayon'],
    images: ['/images/pic1.jpg'],
    colors: [{ name: 'Floral', hex: '#A7F3D0' }],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 3,
    name: 'Casual Denim Jacket',
    sku: 'SN-2024-003',
    price: '$35.90',
    description: 'A timeless denim jacket...',
    details: ['Vintage wash', '100% Cotton'],
    images: ['/images/pic2.jpg'],
    colors: [{ name: 'Blue Denim', hex: '#3B82F6' }],
    sizes: ['S', 'M', 'L', 'XL'],
  },
    {
    id: 4,
    name: 'Casual Denim Jacket',
    sku: 'SN-2024-003',
    price: '$35.90',
    description: 'A timeless denim jacket...',
    details: ['Vintage wash', '100% Cotton'],
    images: ['/images/pic2.jpg'],
    colors: [{ name: 'Blue Denim', hex: '#3B82F6' }],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export default {
  name: 'ProductDetailPage',
  data() {
    return {
      product: null,
      loading: true,
      activeImage: '',
      selectedColor: {},
      selectedSize: '',
      quantity: 1,
      activeAccordion: 'description', // Start with description open
    };
  },
  created() {
    this.fetchProductData();
  },
  methods: {
    fetchProductData() {
      const productId = parseInt(this.$route.params.id);
      // Simulate API call
      setTimeout(() => {
        const foundProduct = allProducts.find((p) => p.id === productId);
        if (foundProduct) {
          this.product = foundProduct;
          // Initialize component state with product data
          this.activeImage = this.product.images[0];
          this.selectedColor = this.product.colors[0];
          this.selectedSize = this.product.sizes[0];
        }
        this.loading = false;
      }, 500); // 0.5-second delay to simulate loading
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    increaseQuantity() {
      this.quantity++;
    },
    toggleAccordion(section) {
      if (this.activeAccordion === section) {
        this.activeAccordion = null; // Collapse if already open
      } else {
        this.activeAccordion = section; // Open the new section
      }
    },
  },
};
</script>
