<template>
  <div class="font-kantumruy bg-white text-gray-800">
    <div v-if="loading" class="text-center py-40">
      <p class="text-xl text-gray-500">Loading Product...</p>
    </div>

    <div v-else-if="!products" class="text-center py-40">
      <p class="text-xl text-gray-700 mb-4">Product not found</p>
      <router-link to="/dashboard" class="text-pink-600 hover:underline">
        Back to Shop
      </router-link>
    </div>

    <div v-else class="container mx-auto px-4 py-8">
      <!-- Breadcrumbs -->
      <nav class="text-sm text-gray-500 mb-6">
        <ol class="list-none p-0 inline-flex">
          <li class="flex items-center">
            <router-link to="/dashboard" class="hover:text-pink-700">Home</router-link>
            <span class="mx-2">/</span>
          </li>
          <li class="flex items-center">
            <router-link to="/women" class="hover:text-pink-700">Women</router-link>
            <span class="mx-2">/</span>
          </li>
          <li class="text-gray-700">{{ products.name }}</li>
        </ol>
      </nav>

      <!-- Main Section -->
      <main class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <!-- Image Gallery -->
        <div class="flex flex-col-reverse md:flex-row gap-4">
          <div class="flex md:flex-col gap-3 justify-center md:justify-start">
            <button
              v-for="(image, index) in products.images"
              :key="index"
              @click="activeImage = image"
              class="w-16 h-20 rounded-md overflow-hidden border-2 transition"
              :class="activeImage === image ? 'border-pink-600' : 'border-transparent hover:border-gray-300'"
            >
              <img :src="image" :alt="`${products.name} view ${index + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
          <div class="flex-1">
            <img :src="products.image" :alt="products.name" class="w-full h-auto object-contain rounded-lg shadow-sm" />
          </div>
        </div>

        <!-- Product Details -->
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{{ products.name }}</h1>
          <!-- <p class="text-sm text-gray-500 mb-4">SKU: {{ products.sku }}</p> -->
          <p class="text-3xl font-bold text-pink-700 mb-6">{{ products.price }}</p>

          <!-- Color -->
          <div class="mb-6" v-if="products?.colors?.length > 0">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Color: <span class="font-semibold">{{ selectedColor.name }}</span>
            </label>
            <div class="flex space-x-2">
              <button
                v-for="color in products.colors"
                :key="color.name"
                @click="selectedColor = color"
                class="w-8 h-8 rounded-full border-2"
                :class="selectedColor.name === color.name ? 'border-pink-600' : 'border-gray-300'"
                :style="{ backgroundColor: color.hex }"
                :aria-label="`Select color ${color.name}`"
              ></button>
            </div>
          </div>

          <!-- Size -->
          <div class="mb-6" v-if="products?.size?.length > 0">
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700">Size</label>
              <a href="#" class="text-sm text-pink-600 hover:underline">Size Guide</a>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="size in products?.size"
                :key="size"
                @click="selectedSize = size"
                class="px-4 py-2 border rounded-md text-sm font-medium"
                :class="selectedSize === size ? 'bg-pink-700 text-white border-pink-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity -->
             <label class="block text-sm font-medium text-gray-700">Qty:</label>
          <div class="flex items-stretch gap-4 my-8">
            
            <div class="flex items-center border border-gray-300 rounded-md">
              
              <button @click="decreaseQuantity" class="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
              <span class="px-4 text-center w-12">{{ quantity }}</span>
              <button @click="increaseQuantity" class="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
            </div>
            <button 
              @click="addToCart"
              class="flex-1 bg-pink-700 text-white font-bold py-3 px-6 rounded-md hover:bg-pink-800"
            >
              ADD TO BAG
            </button>
            <button 
              @click="toggleWishlist"
              class="p-3 border border-gray-300 rounded-md text-gray-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-600"
              :class="{ 'text-pink-600 border-pink-600': isInWishlist }"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 18.75l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
            </button>
          </div>

          <!-- Accordion -->
          <div class="border-t">
            <div class="border-b">
              <button @click="toggleAccordion('description')" class="w-full flex justify-between items-center py-4">
                <span class="font-semibold text-gray-800">Product Description</span>
                <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': activeAccordion === 'description' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="activeAccordion === 'description'" class="pb-4 text-gray-600 text-sm space-y-2">
                <p>{{ products.description }}</p>
                <ul class="list-disc list-inside pl-2" v-if="products?.details?.length > 0">
                  <li v-for="(detail, i) in products?.details" :key="i">{{ detail }}</li>
                </ul>
              </div>
            </div>
            <div class="border-b">
              <button @click="toggleAccordion('delivery')" class="w-full flex justify-between items-center py-4">
                <span class="font-semibold text-gray-800">Delivery & Returns</span>
                <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': activeAccordion === 'delivery' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="activeAccordion === 'delivery'" class="pb-4 text-gray-600 text-sm">
                <p>Standard delivery within 3–5 working days. Free returns within 30 days of purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Related Products -->
      <div v-if="relatedProducts?.length > 0" class="mt-16">
        <h3 class="text-xl font-bold mb-4">Related Products</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="related in relatedProducts"
            :key="related.id"
            class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <router-link :to="`/product/${related.id}`" @click.native="handleProductClick(related.id)">
              <img :src="related.images[0]" :alt="related.name" class="w-full h-48 object-cover rounded-md mb-2" />
              <h4 class="text-lg font-semibold">{{ related.name }}</h4>
              <p class="text-pink-600 font-bold">{{ related.price }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import api from '../../../axios/Axios';
import { useRoute } from 'vue-router';


const route = useRoute();

const products = ref([]); // This will be populated from the API

// --- Function to Fetch Products ---
const fetchProducts = async () => {
  try {
    const productId = route.params.id; // get ":id" from URL

        const response = await api.get(
          `/public/products/${productId}`,
        );
       products.value = response.data.data;
      console.log(response.data.data)
    } catch (error) {
      console.error("Failed to fetch products:", error.response?.data || error.message);
      // alert("Failed to fetch products. Please try again.");
      products.value = [];
    }
};

onMounted(() => {
  fetchProducts();
});

// export default {
//   name: 'ProductDetailPage',
//   props: ['id'], // Receives the id from route params
//   data() {
//     return {
//       product: null,
//       loading: true,
//       activeImage: '',
//       selectedColor: {},
//       selectedSize: '',
//       quantity: 1,
//       activeAccordion: 'description',
//       allProducts: mockProducts,
//       wishlist: []
//     }
//   },
//   computed: {
//     relatedProducts() {
//       if (!this.product) return []
//       return this.allProducts
//         .filter(p => p.id !== this.product.id)
//         .slice(0, 4)
//     },
//     isInWishlist() {
//       return this.wishlist.some(item => item.id === this.product?.id)
//     }
//   },
//   created() {
//     this.fetchProductData()
//     this.loadWishlist()
//   },
//   watch: {
//     '$route.params.id': {
//       handler: 'fetchProductData',
//       immediate: true
//     }
//   },
//   methods: {
//     fetchProductData() {
//       this.loading = true
//       const productId = parseInt(this.id)
      
//       // In a real app, you would fetch from an API here
//       // For now we'll use the mock data
//       const foundProduct = this.allProducts.find(p => p.id === productId)
      
//       if (foundProduct) {
//         this.product = foundProduct
//         this.activeImage = foundProduct.images[0]
//         this.selectedColor = foundProduct.colors?.[0] || {}
//         this.selectedSize = foundProduct.sizes?.[0] || ''
//       } else {
//         this.$router.push('/404')
//       }
      
//       this.loading = false
//     },
//     loadWishlist() {
//       const savedWishlist = localStorage.getItem('wishlist')
//       this.wishlist = savedWishlist ? JSON.parse(savedWishlist) : []
//     },
//     saveWishlist() {
//       localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
//     },
//     decreaseQuantity() {
//       if (this.quantity > 1) this.quantity--
//     },
//     increaseQuantity() {
//       this.quantity++
//     },
//     toggleAccordion(section) {
//       this.activeAccordion = this.activeAccordion === section ? null : section
//     },
//     addToCart() {
//       if (!this.product) return
      
//       const cartItem = {
//         id: this.product.id,
//         name: this.product.name,
//         price: this.product.price,
//         image: this.activeImage,
//         color: this.selectedColor,
//         size: this.selectedSize,
//         quantity: this.quantity
//       }
      
//       let cart = JSON.parse(localStorage.getItem('cart') || [])
      
//       const existingIndex = cart.findIndex(item => 
//         item.id === cartItem.id && 
//         item.color.name === cartItem.color.name && 
//         item.size === cartItem.size
//       )
      
//       if (existingIndex >= 0) {
//         cart[existingIndex].quantity += cartItem.quantity
//       } else {
//         cart.push(cartItem)
//       }
      
//       localStorage.setItem('cart', JSON.stringify(cart))
      
//       this.$toast.success('Item added to cart!', {
//         position: 'top-right',
//         duration: 3000
//       })
//     },
//     toggleWishlist() {
//       if (!this.product) return
      
//       if (this.isInWishlist) {
//         this.wishlist = this.wishlist.filter(item => item.id !== this.product.id)
//       } else {
//         this.wishlist.push({
//           id: this.product.id,
//           name: this.product.name,
//           price: this.product.price,
//           image: this.activeImage
//         })
//       }
      
//       this.saveWishlist()
      
//       const message = this.isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist!'
//       this.$toast.info(message, {
//         position: 'top-right',
//         duration: 2000
//       })
//     },
//     handleProductClick() {
//       window.scrollTo(0, 0)
//       this.quantity = 1
//       this.activeAccordion = 'description'
//     }
//   }
// }
</script>

<script>
export default {
  name: 'ProductDetailPage',
  props: ['id'], // Receives the id from route params
  data() {
    return {
      product: null,
      loading: true,
      activeImage: '',
      selectedColor: {},
      selectedSize: '',
      quantity: 1,
      activeAccordion: 'description',
      wishlist: []
    }
  },
  computed: {
  },
  created() {
    this.fetchProductData()
    this.loadWishlist()
  },
  watch: {
    '$route.params.id': {
      handler: 'fetchProductData',
      immediate: true
    }
  },
  methods: {
    fetchProductData() {
      this.loading = true
      const productId = parseInt(this.id)
      
      // In a real app, you would fetch from an API here
      // For now we'll use the mock data
      
      this.loading = false
    },
    loadWishlist() {
      const savedWishlist = localStorage.getItem('wishlist')
      this.wishlist = savedWishlist ? JSON.parse(savedWishlist) : []
    },
    saveWishlist() {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--
    },
    increaseQuantity() {
      this.quantity++
    },
    toggleAccordion(section) {
      this.activeAccordion = this.activeAccordion === section ? null : section
    },
    addToCart() {
      if (!this.product) return
      
      const cartItem = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        image: this.activeImage,
        color: this.selectedColor,
        size: this.selectedSize,
        quantity: this.quantity
      }
      
      let cart = JSON.parse(localStorage.getItem('cart') || [])
      
      const existingIndex = cart.findIndex(item => 
        item.id === cartItem.id && 
        item.color.name === cartItem.color.name && 
        item.size === cartItem.size
      )
      
      if (existingIndex >= 0) {
        cart[existingIndex].quantity += cartItem.quantity
      } else {
        cart.push(cartItem)
      }
      
      localStorage.setItem('cart', JSON.stringify(cart))
      
      this.$toast.success('Item added to cart!', {
        position: 'top-right',
        duration: 3000
      })
    },
    toggleWishlist() {
      if (!this.product) return
      
      if (this.isInWishlist) {
        this.wishlist = this.wishlist.filter(item => item.id !== this.product.id)
      } else {
        this.wishlist.push({
          id: this.product.id,
          name: this.product.name,
          price: this.product.price,
          image: this.activeImage
        })
      }
      
      this.saveWishlist()
      
      const message = this.isInWishlist ? 'Added to wishlist!' : 'Removed from wishlist!'
      this.$toast.info(message, {
        position: 'top-right',
        duration: 2000
      })
    },
    handleProductClick() {
      window.scrollTo(0, 0)
      this.quantity = 1
      this.activeAccordion = 'description'
    }
  }
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>