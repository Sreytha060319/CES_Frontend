<template>
  <!-- Wrapper for Overall Page Structure -->
  <div
    class="page-center-wrapper w-full overflow-x-hidden flex flex-col min-h-screen font-kantumruy bg-white text-gray-800"
  >
 <div
      class="header-bar fixed top-0 left-0 w-full shadow-md bg-white h-20 z-50"
    >
      <div
        class="container mx-auto h-full flex flex-row items-center justify-between px-4 sm:px-6"
      >
        <!-- Left: Nav Links (Desktop) / Hamburger (Mobile) -->
        <div class="flex items-center">
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden text-gray-700 hover:text-pink-700 focus:outline-none mr-3"
            aria-label="Open menu"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        <!-- Dropdown Navigation -->
<ul class="hidden md:flex md:space-x-6 lg:space-x-8 font-medium text-sm">
  <!-- The `relative group` classes on the <li> are essential for the dropdown to work -->
  <li class="relative group">
    <!-- Main Navigation Link -->
    <router-link
      to="/women"
      class="flex items-center gap-1 py-2 text-gray-900 hover:text-pink-700"
      active-class="text-pink-700 font-semibold"
    >
      <span>Women</span>
      <!-- Dropdown Arrow -->
      <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </router-link>
    <!-- Dropdown Menu Panel -->
    <div class="absolute left-1/2 -translate-x-1/2 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
      <ul class="py-1">
        <li><router-link to="/women/new" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">New Arrivals</router-link></li>
        <li><router-link to="/women/dresses" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">Dresses</router-link></li>
        <li><router-link to="/women/tops" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">Tops</router-link></li>
      </ul>
    </div>
  </li>

  <li class="relative group">
    <router-link to="/men" class="flex items-center gap-1 py-2 text-gray-900 hover:text-pink-700" active-class="text-pink-700 font-khmer-moul">
      <span>Men</span>
      <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </router-link>
    <div class="absolute left-1/2 -translate-x-1/2 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
      <ul class="py-1">
        <li><router-link to="/men/shirts" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">Shirts</router-link></li>
        <li><router-link to="/men/pants" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">Pants</router-link></li>
        <li><router-link to="/men/jackets" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">Jackets</router-link></li>
      </ul>
    </div>
  </li>

  <li class="relative group">
    <router-link to="/boy" class="flex items-center gap-1 py-2 text-gray-900 hover:text-pink-700" active-class="text-pink-700 font-khmer-moul">
      <span>Boy</span>
      <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </router-link>
    <div class="absolute left-1/2 -translate-x-1/2 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
      <ul class="py-1">
        <li><router-link to="/boy/t-shirts" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">T-Shirts</router-link></li>
        <li><router-link to="/boy/shorts" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">Shorts</router-link></li>
      </ul>
    </div>
  </li>

  <li class="relative group">
    <router-link to="/girl" class="flex items-center gap-1 py-2 text-gray-900 hover:text-pink-700" active-class="text-pink-700 font-khmer-moul">
      <span>Girl</span>
      <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </router-link>
    <div class="absolute left-1/2 -translate-x-1/2 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
      <ul class="py-1">
        <li><router-link to="/girl/dresses" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">Dresses</router-link></li>
        <li><router-link to="/girl/skirts" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-700">Skirts</router-link></li>
      </ul>
    </div>
  </li>
</ul>
        </div>
        <router-link
          to="/dashboard"
          class="font-mervale-script text-3xl text-pink-800 hover:text-pink-900 whitespace-nowrap"
          style="font-family: 'Mervale Script', cursive"
          >Clothes Shop</router-link
        >
        <div class="hidden md:flex items-center gap-3 lg:gap-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search..."
              class="search-input bg-gray-100 border border-gray-300 rounded-md py-1.5 px-3 pl-10 text-sm focus:ring-pink-500 focus:border-pink-500"
              style="width: 150px"
            />
            <img
              class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              alt="Search Icon"
              src="/images/material-symbols-light-search.svg"
            />
          </div>
          <div class="bar-menu-parent flex items-center space-x-3 md:space-x-4">
                
                
                <button class="p-1.5 hover:bg-gray-100 rounded-full">
                        <svg class="w-6 h-6 text-gray-700" viewBox="0 0 25 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_1046)">
                                <path
                                    d="M22.0067 19.0531C21.3638 18.48 20.801 17.823 20.3334 17.0998C19.8223 16.1017 19.5163 15.0114 19.4334 13.8931V10.5998C19.4378 8.84351 18.8007 7.14609 17.6419 5.82642C16.483 4.50675 14.8821 3.65568 13.14 3.43311V2.57311C13.14 2.33706 13.0463 2.11069 12.8794 1.94378C12.7124 1.77687 12.4861 1.68311 12.25 1.68311C12.014 1.68311 11.7876 1.77687 11.6207 1.94378C11.4538 2.11069 11.36 2.33706 11.36 2.57311V3.44644C9.63354 3.68506 8.05201 4.54128 6.90839 5.85651C5.76476 7.17174 5.13652 8.85687 5.14003 10.5998V13.8931C5.05707 15.0114 4.75106 16.1017 4.24003 17.0998C3.78062 17.8213 3.22683 18.4783 2.59337 19.0531C2.52225 19.1156 2.46526 19.1925 2.42618 19.2787C2.38709 19.3649 2.36682 19.4584 2.3667 19.5531V20.4598C2.3667 20.6366 2.43694 20.8062 2.56196 20.9312C2.68699 21.0562 2.85656 21.1264 3.03337 21.1264H21.5667C21.7435 21.1264 21.9131 21.0562 22.0381 20.9312C22.1631 20.8062 22.2334 20.6366 22.2334 20.4598V19.5531C22.2332 19.4584 22.213 19.3649 22.1739 19.2787C22.1348 19.1925 22.0778 19.1156 22.0067 19.0531ZM3.75337 19.7931C4.3735 19.1938 4.91961 18.5223 5.38003 17.7931C6.02389 16.5877 6.39915 15.2573 6.48003 13.8931V10.5998C6.45359 9.81846 6.58465 9.03982 6.8654 8.31022C7.14614 7.58061 7.57084 6.91496 8.1142 6.35291C8.65755 5.79085 9.30846 5.34388 10.0282 5.03862C10.7478 4.73336 11.5216 4.57604 12.3034 4.57604C13.0851 4.57604 13.8589 4.73336 14.5786 5.03862C15.2983 5.34388 15.9492 5.79085 16.4925 6.35291C17.0359 6.91496 17.4606 7.58061 17.7413 8.31022C18.0221 9.03982 18.1531 9.81846 18.1267 10.5998V13.8931C18.2076 15.2573 18.5828 16.5877 19.2267 17.7931C19.6871 18.5223 20.2332 19.1938 20.8534 19.7931H3.75337Z"
                                    fill="currentColor" />
                                <path
                                    d="M12.3329 23.353C12.7529 23.3433 13.1559 23.1855 13.4707 22.9073C13.7854 22.6291 13.9917 22.2486 14.0529 21.833H10.5463C10.6092 22.2599 10.8251 22.6493 11.1538 22.9289C11.4825 23.2085 11.9015 23.3592 12.3329 23.353Z"
                                    fill="currentColor" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_1046">
                                    <rect width="24" height="24" fill="white" transform="translate(0.333374 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                  
                    <button class="p-1.5 hover:bg-gray-100 rounded-full">
                        <svg class="w-6 h-6 text-gray-700" viewBox="0 0 25 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.0209 4.25C15.0849 4.25 13.3899 5.0825 12.3334 6.48969C11.2768 5.0825 9.58181 4.25 7.64587 4.25C6.10484 4.25174 4.62741 4.86468 3.53773 5.95436C2.44806 7.04404 1.83511 8.52146 1.83337 10.0625C1.83337 16.625 11.5637 21.9369 11.9781 22.1562C12.0873 22.215 12.2094 22.2458 12.3334 22.2458C12.4574 22.2458 12.5795 22.215 12.6887 22.1562C13.1031 21.9369 22.8334 16.625 22.8334 10.0625C22.8316 8.52146 22.2187 7.04404 21.129 5.95436C20.0393 4.86468 18.5619 4.25174 17.0209 4.25ZM12.3334 20.6375C10.6215 19.64 3.33337 15.0959 3.33337 10.0625C3.33486 8.91921 3.78969 7.82317 4.59812 7.01475C5.40655 6.20632 6.50258 5.75149 7.64587 5.75C9.46931 5.75 11.0002 6.72125 11.6396 8.28125C11.6961 8.41881 11.7923 8.53646 11.9158 8.61926C12.0393 8.70207 12.1847 8.74627 12.3334 8.74627C12.4821 8.74627 12.6274 8.70207 12.751 8.61926C12.8745 8.53646 12.9706 8.41881 13.0271 8.28125C13.6665 6.71844 15.1974 5.75 17.0209 5.75C18.1642 5.75149 19.2602 6.20632 20.0686 7.01475C20.8771 7.82317 21.3319 8.91921 21.3334 10.0625C21.3334 15.0884 14.0434 19.6391 12.3334 20.6375Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                    <button class="p-1.5 hover:bg-gray-100 rounded-full">
                        <svg class="w-6 h-6 text-gray-700" viewBox="0 0 25 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.3334 7.5H16.3334V6.5C16.3334 5.43913 15.9119 4.42172 15.1618 3.67157C14.4117 2.92143 13.3942 2.5 12.3334 2.5C11.2725 2.5 10.2551 2.92143 9.50495 3.67157C8.7548 4.42172 8.33337 5.43913 8.33337 6.5V7.5H5.33337C5.06816 7.5 4.8138 7.60536 4.62627 7.79289C4.43873 7.98043 4.33337 8.23478 4.33337 8.5V19.5C4.33337 20.2956 4.64944 21.0587 5.21205 21.6213C5.77466 22.1839 6.53772 22.5 7.33337 22.5H17.3334C18.129 22.5 18.8921 22.1839 19.4547 21.6213C20.0173 21.0587 20.3334 20.2956 20.3334 19.5V8.5C20.3334 8.23478 20.228 7.98043 20.0405 7.79289C19.8529 7.60536 19.5986 7.5 19.3334 7.5ZM10.3334 6.5C10.3334 5.96957 10.5441 5.46086 10.9192 5.08579C11.2942 4.71071 11.8029 4.5 12.3334 4.5C12.8638 4.5 13.3725 4.71071 13.7476 5.08579C14.1227 5.46086 14.3334 5.96957 14.3334 6.5V7.5H10.3334V6.5ZM18.3334 19.5C18.3334 19.7652 18.228 20.0196 18.0405 20.2071C17.8529 20.3946 17.5986 20.5 17.3334 20.5H7.33337C7.06816 20.5 6.8138 20.3946 6.62627 20.2071C6.43873 20.0196 6.33337 19.7652 6.33337 19.5V9.5H8.33337V10.5C8.33337 10.7652 8.43873 11.0196 8.62627 11.2071C8.8138 11.3946 9.06816 11.5 9.33337 11.5C9.59859 11.5 9.85294 11.3946 10.0405 11.2071C10.228 11.0196 10.3334 10.7652 10.3334 10.5V9.5H14.3334V10.5C14.3334 10.7652 14.4387 11.0196 14.6263 11.2071C14.8138 11.3946 15.0682 11.5 15.3334 11.5C15.5986 11.5 15.8529 11.3946 16.0405 11.2071C16.228 11.0196 16.3334 10.7652 16.3334 10.5V9.5H18.3334V19.5Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                    <a href="#" class="bar-menu1 px-3 py-2 rounded-md hover:bg-gray-100 text-sm">Register</a>
                    <a href="#" class="bar-menu1 px-3 py-2 rounded-md hover:bg-gray-100 text-sm">Login</a>
                </div>
          
        </div>
        <div class="md:hidden w-6"></div>
        <!-- Placeholder for mobile layout balance -->
      </div>
      <!-- Mobile Menu Dropdown -->

      <div
        v-if="isMobileMenuOpen"
        class="md:hidden fixed top-20 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40"
      >
        <ul class="flex flex-col p-4 space-y-2">
          <li>
            <router-link
              to="/category/women"
              @click="isMobileMenuOpen = false"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:text-pink-700"
              active-class="bg-pink-50 text-pink-700 font-semibold"
              >WOMEN</router-link
            >
          </li>
          <li>
            <router-link
              to="/category/men"
              @click="isMobileMenuOpen = false"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:text-pink-700"
              active-class="bg-pink-50 text-pink-700 font-semibold"
              >MEN</router-link
            >
          </li>
          <li>
            <router-link
              to="/category/boys"
              @click="isMobileMenuOpen = false"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:text-pink-700"
              active-class="bg-pink-50 text-pink-700 font-semibold"
              >BOY</router-link
            >
          </li>
          <li>
            <router-link
              to="/category/girls"
              @click="isMobileMenuOpen = false"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:text-pink-700"
              active-class="bg-pink-50 text-pink-700 font-semibold"
              >GIRL</router-link
            >
          </li>
              <li>
            <router-link
              to="/product/list"
              @click="isMobileMenuOpen = false"
              class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:text-pink-700"
              active-class="bg-pink-50 text-pink-700 font-semibold"
              >list</router-link
            >
          </li>
          
        
           
          <li class="pt-2 border-t border-gray-200">
            <input
              type="text"
              placeholder="Search..."
              class="w-full search-input bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-pink-500 focus:border-pink-500"
            />
          </li>
      
        </ul>
      </div>
    </div>
    <!-- Header Bar (Reused from WomenCollectionPage for consistency) -->
     <!-- <header class="header-bar sticky top-0 left-0 w-full bg-white shadow-md z-40">
            <div class="bg-pink-700 h-4"></div>
            <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                <nav class="bar-menu-parent flex items-center space-x-2 md:space-x-4">
                    <a href="#"
                        class="bar-menu px-3 py-2 rounded-md text-pink-700 hover:bg-pink-50 font-semibold">Women</a>
                    <a href="#" class="bar-menu1 px-3 py-2 rounded-md hover:bg-gray-100">Men</a>
                    <a href="#" class="bar-menu1 px-3 py-2 rounded-md hover:bg-gray-100">Boys</a>
                    <a href="#" class="bar-menu1 px-3 py-2 rounded-md hover:bg-gray-100">Girls</a>
                </nav>

                <div class="frame-wrapper flex-grow max-w-xl mx-4">
                    <div
                        class="material-symbols-lightsearch-parent relative flex items-center border border-gray-400 rounded-md px-3 py-1.5 h-10">
                        <svg class="w-6 h-6 text-gray-500 mr-2" viewBox="0 0 33 33" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M26.6466 27.3721L18.2972 19.0227C17.6306 19.5907 16.8639 20.0303 15.9972 20.3414C15.1306 20.6525 14.2595 20.8081 13.3839 20.8081C11.2488 20.8081 9.44167 20.069 7.96256 18.5907C6.48345 17.1125 5.7439 15.3058 5.7439 13.1707C5.7439 11.0356 6.48256 9.22806 7.9599 7.74806C9.43723 6.26806 11.2435 5.52717 13.3786 5.52539C15.5137 5.52362 17.3217 6.26317 18.8026 7.74406C20.2835 9.22495 21.0239 11.0325 21.0239 13.1667C21.0239 14.0929 20.8599 14.9894 20.5319 15.8561C20.2039 16.7227 19.7728 17.4641 19.2386 18.0801L27.5879 26.4281L26.6466 27.3721ZM13.3852 19.4734C15.1541 19.4734 16.6475 18.8645 17.8652 17.6467C19.083 16.4289 19.6919 14.9352 19.6919 13.1654C19.6919 11.3956 19.083 9.90228 17.8652 8.68539C16.6475 7.4685 15.1541 6.85962 13.3852 6.85873C11.6163 6.85784 10.1226 7.46673 8.9039 8.68539C7.68523 9.90406 7.07634 11.3974 7.07723 13.1654C7.07812 14.9334 7.68701 16.4267 8.9039 17.6454C10.1208 18.8641 11.6141 19.473 13.3839 19.4721"
                                fill="currentColor" />
                        </svg>
                        <input type="text" class="women w-full outline-none bg-transparent text-sm"
                            placeholder="Search">
                    </div>
                </div>

                <div class="bar-menu-parent flex items-center space-x-3 md:space-x-4">
                
                
                <button class="p-1.5 hover:bg-gray-100 rounded-full">
                        <svg class="w-6 h-6 text-gray-700" viewBox="0 0 25 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_1046)">
                                <path
                                    d="M22.0067 19.0531C21.3638 18.48 20.801 17.823 20.3334 17.0998C19.8223 16.1017 19.5163 15.0114 19.4334 13.8931V10.5998C19.4378 8.84351 18.8007 7.14609 17.6419 5.82642C16.483 4.50675 14.8821 3.65568 13.14 3.43311V2.57311C13.14 2.33706 13.0463 2.11069 12.8794 1.94378C12.7124 1.77687 12.4861 1.68311 12.25 1.68311C12.014 1.68311 11.7876 1.77687 11.6207 1.94378C11.4538 2.11069 11.36 2.33706 11.36 2.57311V3.44644C9.63354 3.68506 8.05201 4.54128 6.90839 5.85651C5.76476 7.17174 5.13652 8.85687 5.14003 10.5998V13.8931C5.05707 15.0114 4.75106 16.1017 4.24003 17.0998C3.78062 17.8213 3.22683 18.4783 2.59337 19.0531C2.52225 19.1156 2.46526 19.1925 2.42618 19.2787C2.38709 19.3649 2.36682 19.4584 2.3667 19.5531V20.4598C2.3667 20.6366 2.43694 20.8062 2.56196 20.9312C2.68699 21.0562 2.85656 21.1264 3.03337 21.1264H21.5667C21.7435 21.1264 21.9131 21.0562 22.0381 20.9312C22.1631 20.8062 22.2334 20.6366 22.2334 20.4598V19.5531C22.2332 19.4584 22.213 19.3649 22.1739 19.2787C22.1348 19.1925 22.0778 19.1156 22.0067 19.0531ZM3.75337 19.7931C4.3735 19.1938 4.91961 18.5223 5.38003 17.7931C6.02389 16.5877 6.39915 15.2573 6.48003 13.8931V10.5998C6.45359 9.81846 6.58465 9.03982 6.8654 8.31022C7.14614 7.58061 7.57084 6.91496 8.1142 6.35291C8.65755 5.79085 9.30846 5.34388 10.0282 5.03862C10.7478 4.73336 11.5216 4.57604 12.3034 4.57604C13.0851 4.57604 13.8589 4.73336 14.5786 5.03862C15.2983 5.34388 15.9492 5.79085 16.4925 6.35291C17.0359 6.91496 17.4606 7.58061 17.7413 8.31022C18.0221 9.03982 18.1531 9.81846 18.1267 10.5998V13.8931C18.2076 15.2573 18.5828 16.5877 19.2267 17.7931C19.6871 18.5223 20.2332 19.1938 20.8534 19.7931H3.75337Z"
                                    fill="currentColor" />
                                <path
                                    d="M12.3329 23.353C12.7529 23.3433 13.1559 23.1855 13.4707 22.9073C13.7854 22.6291 13.9917 22.2486 14.0529 21.833H10.5463C10.6092 22.2599 10.8251 22.6493 11.1538 22.9289C11.4825 23.2085 11.9015 23.3592 12.3329 23.353Z"
                                    fill="currentColor" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_1046">
                                    <rect width="24" height="24" fill="white" transform="translate(0.333374 0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                  
                    <button class="p-1.5 hover:bg-gray-100 rounded-full">
                        <svg class="w-6 h-6 text-gray-700" viewBox="0 0 25 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.0209 4.25C15.0849 4.25 13.3899 5.0825 12.3334 6.48969C11.2768 5.0825 9.58181 4.25 7.64587 4.25C6.10484 4.25174 4.62741 4.86468 3.53773 5.95436C2.44806 7.04404 1.83511 8.52146 1.83337 10.0625C1.83337 16.625 11.5637 21.9369 11.9781 22.1562C12.0873 22.215 12.2094 22.2458 12.3334 22.2458C12.4574 22.2458 12.5795 22.215 12.6887 22.1562C13.1031 21.9369 22.8334 16.625 22.8334 10.0625C22.8316 8.52146 22.2187 7.04404 21.129 5.95436C20.0393 4.86468 18.5619 4.25174 17.0209 4.25ZM12.3334 20.6375C10.6215 19.64 3.33337 15.0959 3.33337 10.0625C3.33486 8.91921 3.78969 7.82317 4.59812 7.01475C5.40655 6.20632 6.50258 5.75149 7.64587 5.75C9.46931 5.75 11.0002 6.72125 11.6396 8.28125C11.6961 8.41881 11.7923 8.53646 11.9158 8.61926C12.0393 8.70207 12.1847 8.74627 12.3334 8.74627C12.4821 8.74627 12.6274 8.70207 12.751 8.61926C12.8745 8.53646 12.9706 8.41881 13.0271 8.28125C13.6665 6.71844 15.1974 5.75 17.0209 5.75C18.1642 5.75149 19.2602 6.20632 20.0686 7.01475C20.8771 7.82317 21.3319 8.91921 21.3334 10.0625C21.3334 15.0884 14.0434 19.6391 12.3334 20.6375Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                    <button class="p-1.5 hover:bg-gray-100 rounded-full">
                        <svg class="w-6 h-6 text-gray-700" viewBox="0 0 25 25" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.3334 7.5H16.3334V6.5C16.3334 5.43913 15.9119 4.42172 15.1618 3.67157C14.4117 2.92143 13.3942 2.5 12.3334 2.5C11.2725 2.5 10.2551 2.92143 9.50495 3.67157C8.7548 4.42172 8.33337 5.43913 8.33337 6.5V7.5H5.33337C5.06816 7.5 4.8138 7.60536 4.62627 7.79289C4.43873 7.98043 4.33337 8.23478 4.33337 8.5V19.5C4.33337 20.2956 4.64944 21.0587 5.21205 21.6213C5.77466 22.1839 6.53772 22.5 7.33337 22.5H17.3334C18.129 22.5 18.8921 22.1839 19.4547 21.6213C20.0173 21.0587 20.3334 20.2956 20.3334 19.5V8.5C20.3334 8.23478 20.228 7.98043 20.0405 7.79289C19.8529 7.60536 19.5986 7.5 19.3334 7.5ZM10.3334 6.5C10.3334 5.96957 10.5441 5.46086 10.9192 5.08579C11.2942 4.71071 11.8029 4.5 12.3334 4.5C12.8638 4.5 13.3725 4.71071 13.7476 5.08579C14.1227 5.46086 14.3334 5.96957 14.3334 6.5V7.5H10.3334V6.5ZM18.3334 19.5C18.3334 19.7652 18.228 20.0196 18.0405 20.2071C17.8529 20.3946 17.5986 20.5 17.3334 20.5H7.33337C7.06816 20.5 6.8138 20.3946 6.62627 20.2071C6.43873 20.0196 6.33337 19.7652 6.33337 19.5V9.5H8.33337V10.5C8.33337 10.7652 8.43873 11.0196 8.62627 11.2071C8.8138 11.3946 9.06816 11.5 9.33337 11.5C9.59859 11.5 9.85294 11.3946 10.0405 11.2071C10.228 11.0196 10.3334 10.7652 10.3334 10.5V9.5H14.3334V10.5C14.3334 10.7652 14.4387 11.0196 14.6263 11.2071C14.8138 11.3946 15.0682 11.5 15.3334 11.5C15.5986 11.5 15.8529 11.3946 16.0405 11.2071C16.228 11.0196 16.3334 10.7652 16.3334 10.5V9.5H18.3334V19.5Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                    <a href="#" class="bar-menu1 px-3 py-2 rounded-md hover:bg-gray-100 text-sm">Register</a>
                    <a href="#" class="bar-menu1 px-3 py-2 rounded-md hover:bg-gray-100 text-sm">Login</a>
                </div>
            </div>
        </header> -->

    <!-- Main Home Content Wrapper -->
    <div class="home-content-wrapper pt-20 flex-grow">
      <!-- Hero Section: Welcome Title & Poster -->
      <section class="relative overflow-hidden py-16 md:py-24">
        <div class="container mx-auto px-4 sm:px-6">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <!-- Welcome Title Section -->
            <div class="welcome-title-content text-center md:text-left">
              <div
                class="text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] leading-tight uppercase font-black font-lexend-mega mb-4"
              >
                WELCOME
              </div>
              <b class="block text-3xl sm:text-4xl text-pink-700 mb-2"
                >SN. FASHION</b
              >
              <div
                class="border-t border-gray-300 w-full max-w-md mx-auto md:mx-0 my-3"
              ></div>
              <b class="block text-xl sm:text-2xl underline text-gray-700 mb-6"
                >FREEDOM & STYLE</b
              >
              <p
                class="text-sm sm:text-base text-gray-600 max-w-md mx-auto md:mx-0 mb-10"
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
                dolore quibusdam sed natus placeat? Soluta, sunt minus?
              </p>
              <router-link
                to="/women"
                class="shop-now-button inline-flex items-center justify-center rounded-full border-4 border-pink-700 px-8 py-3 gap-2 text-pink-700 hover:bg-pink-50 transition-colors"
              >
                <b class="text-lg font-semibold relative underline">SHOP WOMEN</b>
                <img
                  class="w-7 h-7"
                  alt="Shop Women"
                  src="/images/female_30dp_880E4F_FILL0_wght400_GRAD0_opsz24.svg"
                />
              </router-link>
               <router-link
                to="/men"
                class="shop-now-button inline-flex items-center justify-center rounded-full border-4 border-pink-700 px-8 py-3 gap-2 text-pink-700 hover:bg-pink-50 transition-colors"
              >
                <b class="text-lg font-semibold relative underline">SHOP MEN</b>
                <img
                  class="w-7 h-7"
                  alt="Shop Men"
                  src="/images/male_30dp_880E4F_FILL0_wght400_GRAD0_opsz24.svg"
                />
              </router-link>
            </div>

            <!-- Poster Section -->
            <div
              class="poster-content relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] mt-10 md:mt-0"
            >
              <!-- Main Portrait -->
              <img
                class="absolute top-0 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-[10%] rounded-lg shadow-xl z-10 w-[60%] sm:w-[50%] md:w-[300px] lg:w-[350px] h-auto object-cover"
                alt="Main fashion model"
                src="/images/portrait-young-woman-wearing-2000-s-fashion-style-1.png"
              />
              <!-- Secondary Portrait -->
              <img
                class="absolute bottom-0 left-[15%] md:left-0 rounded-lg shadow-lg w-[45%] sm:w-[35%] md:w-[220px] lg:w-[280px] h-auto object-cover"
                alt="Secondary fashion model"
                src="/images/portrait-young-woman-wearing-2000-s-fashion-style.png"
              />
              <!-- Background Box -->
              <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200/50 rounded-lg w-[80%] h-[70%] md:w-[350px] md:h-[450px] lg:w-[400px] lg:h-[500px]"
              ></div>

              <img
                class="absolute top-[10%] left-[5%] w-10 h-10 opacity-50"
                alt=""
                src="/images/frame-79.png"
              />
              <img
                class="absolute bottom-[5%] right-[5%] w-24 h-24 object-contain opacity-30"
                alt=""
                src="/images/group-1171276595.svg"
              />
              <img
                class="absolute top-[5%] right-[10%] w-20 h-20 object-contain opacity-30"
                alt=""
                src="/images/group-1171276596.svg"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Background Vector Section with Fashion Type -->
    

      <!-- Top Products Section -->
      <section class="top-products-section py-16 md:py-24">
        <div class="container mx-auto px-4 sm:px-6">
          <b
            class="block text-left text-2xl md:text-3xl underline text-gray-800 mb-12"
            >Deals of the Season - Women!</b
          >
           <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <router-link
      v-for="i in 8"
      :key="`product-${i}`"
      :to="`/product/${i}`"
      class="product-item group bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
    >
      <div class="relative h-72 overflow-hidden">
        <img
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          :alt="`Product ${i} image`"
          :src="
            i % 4 === 1 ? '/images/pic2.jpg' :
            i % 4 === 2 ? '/images/pic3.jpg' :
            i % 4 === 3 ? '/images/pic4.jpg' :
            '/images/pic5.jpg'
          "
        />
      </div>
      <div class="p-4 flex flex-col flex-grow">
        <b class="text-lg font-semibold text-pink-700">$13.50</b>
        <div class="text-xs text-green-600 font-medium my-1">
          IN STOCK
        </div>
        <p
          class="text-sm text-gray-600 leading-relaxed flex-grow mb-2 h-10 overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible group-hover:h-auto"
          style="
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          "
        >
          Knitting Button Short Tops Tees Patchwork Y2k Shirt Clothing {{ i }}
        </p>
        <button
          class="mt-auto w-full bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition-colors text-sm font-medium"
          @click.stop
        >
          Add to Cart
        </button>
      </div>
    </router-link>
  </div>
        </div>
      </section>
    </div>

    <!-- Footer (Reused from WomenCollectionPage for consistency) -->
   <footer class="footer bg-pink-50 py-10 md:py-16 px-4 text-gray-700">
            <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
                <!-- Column 1: Follow Us -->
                <div class="follow-us-parent">
                    <h3 class="text-lg font-semibold text-pink-800 mb-4">Follow Us</h3>
                    <ul class="space-y-2">
                        <li v-for="social in socialPlatforms" :key="social.name"
                            class="flex items-center space-x-2 hover:text-pink-600 cursor-pointer">
                            <component :is="social.iconComponent" class="w-5 h-5 fill-current" aria-hidden="true" />
                            <span class="text-sm">{{ social.name }}</span>
                            <!-- If these are links, consider wrapping in <a>:
            <a :href="social.url" class="flex items-center space-x-2"> ... </a>
            -->
                        </li>
                    </ul>
                </div>

                <!-- Column 2: Customer Services -->
                <div class="customer-services-parent">
                    <h3 class="text-lg font-semibold text-pink-800 mb-4">CUSTOMER SERVICES</h3>
                    <ul class="space-y-2">
                        <li class="flex items-center space-x-2 hover:text-pink-600 cursor-pointer">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 25" aria-hidden="true">
                                <path
                                    d="M12 1.5L3 5.5V11.5C3 17.05 6.84 22.24 12 23.5C17.16 22.24 21 17.05 21 11.5V5.5L12 1.5ZM11 7.5H13V9.5H11V7.5ZM11 11.5H13V17.5H11V11.5Z" />
                            </svg>
                            <span class="text-sm">Privacy Policy</span>
                        </li>
                        <li class="flex items-center space-x-2 hover:text-pink-600 cursor-pointer">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 25" aria-hidden="true">
                                <path
                                    d="M12 2.75C10.0716 2.75 8.18657 3.32183 6.58319 4.39317C4.97982 5.46452 3.73013 6.98726 2.99218 8.76884C2.25422 10.5504 2.06114 12.5108 2.43735 14.4021C2.81355 16.2934 3.74215 18.0307 5.10571 19.3943C6.46928 20.7579 8.20656 21.6865 10.0979 22.0627C11.9892 22.4389 13.9496 22.2458 15.7312 21.5078C17.5127 20.7699 19.0355 19.5202 20.1068 17.9168C21.1782 16.3134 21.75 14.4284 21.75 12.5C21.7473 9.91498 20.7192 7.43661 18.8913 5.60872C17.0634 3.78084 14.585 2.75273 12 2.75ZM12 18.5C11.7775 18.5 11.56 18.434 11.375 18.3104C11.19 18.1868 11.0458 18.0111 10.9606 17.8055C10.8755 17.6 10.8532 17.3738 10.8966 17.1555C10.94 16.9373 11.0472 16.7368 11.2045 16.5795C11.3618 16.4222 11.5623 16.315 11.7805 16.2716C11.9988 16.2282 12.225 16.2505 12.4305 16.3356C12.6361 16.4208 12.8118 16.565 12.9354 16.75C13.059 16.935 13.125 17.1525 13.125 17.375C13.125 17.6734 13.0065 17.9595 12.7955 18.1705C12.5845 18.3815 12.2984 18.5 12 18.5ZM12.75 13.9325V14C12.75 14.1989 12.671 14.3897 12.5303 14.5303C12.3897 14.671 12.1989 14.75 12 14.75C11.8011 14.75 11.6103 14.671 11.4697 14.5303C11.329 14.3897 11.25 14.1989 11.25 14V13.25C11.25 13.0511 11.329 12.8603 11.4697 12.7197C11.6103 12.579 11.8011 12.5 12 12.5C13.2403 12.5 14.25 11.6562 14.25 10.625C14.25 9.59375 13.2403 8.75 12 8.75C10.7597 8.75 9.75 9.59375 9.75 10.625V11C9.75 11.1989 9.67099 11.3897 9.53033 11.5303C9.38968 11.671 9.19892 11.75 9 11.75C8.80109 11.75 8.61033 11.671 8.46967 11.5303C8.32902 11.3897 8.25 11.1989 8.25 11V10.625C8.25 8.76406 9.93188 7.25 12 7.25C14.0681 7.25 15.75 8.76406 15.75 10.625C15.75 12.2544 14.46 13.6184 12.75 13.9325Z" />
                            </svg>
                            <span class="text-sm">Online exchange policy</span>
                        </li>
                    </ul>
                </div>

                <!-- Column 3: Contact Us -->
                <div class="contact-us-parent">
                    <h3 class="text-lg font-semibold text-pink-800 mb-4">Contact Us</h3>
                    <ul class="space-y-2">
                        <li class="flex items-center space-x-2 hover:text-pink-600 cursor-pointer">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 25" aria-hidden="true">
                                <path
                                    d="M4 20.5C3.45 20.5 2.97933 20.3043 2.588 19.913C2.19667 19.5217 2.00067 19.0507 2 18.5V6.5C2 5.95 2.196 5.47933 2.588 5.088C2.98 4.69667 3.45067 4.50067 4 4.5H20C20.55 4.5 21.021 4.696 21.413 5.088C21.805 5.48 22.0007 5.95067 22 6.5V18.5C22 19.05 21.8043 19.521 21.413 19.913C21.0217 20.305 20.5507 20.5007 20 20.5H4ZM12 13.5L20 8.5V6.5L12 11.5L4 6.5V8.5L12 13.5Z" />
                            </svg>
                            <span class="text-sm">infome@gmail.com</span>
                        </li>
                        <li class="flex items-center space-x-2 hover:text-pink-600 cursor-pointer">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 25" aria-hidden="true">
                                <path
                                    d="M19.95 21.5C17.8667 21.5 15.8043 21.05 13.763 20.15C11.7217 19.25 9.86733 17.9667 8.2 16.3C6.53267 14.6333 5.24933 12.7833 4.35 10.75C3.45067 8.71667 3.00067 6.65 3 4.55V3.5H8.9L9.825 8.525L6.975 11.4C7.34167 12.05 7.75 12.6667 8.2 13.25C8.65 13.8333 9.13333 14.375 9.65 14.875C10.1333 15.3583 10.6627 15.821 11.238 16.263C11.8133 16.705 12.434 17.1173 13.1 17.5L16 14.6L21 15.625V21.5H19.95Z" />
                            </svg>
                            <span class="text-sm">(+855) 016 356624</span>
                        </li>
                        <li class="flex items-center space-x-2 hover:text-pink-600 cursor-pointer">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 25" aria-hidden="true">
                                <path
                                    d="M12 2.5C6.48 2.5 2 6.98 2 12.5C2 18.02 6.48 22.5 12 22.5C17.52 22.5 22 18.02 22 12.5C22 6.98 17.52 2.5 12 2.5ZM16.64 9.3C16.49 10.88 15.84 14.72 15.51 16.49C15.37 17.24 15.09 17.49 14.83 17.52C14.25 17.57 13.81 17.14 13.25 16.77C12.37 16.19 11.87 15.83 11.02 15.27C10.03 14.62 10.67 14.26 11.24 13.68C11.39 13.53 13.95 11.2 14 10.99C14.0069 10.9582 14.006 10.9252 13.9973 10.8938C13.9886 10.8624 13.9724 10.8337 13.95 10.81C13.89 10.76 13.81 10.78 13.74 10.79C13.65 10.81 12.25 11.74 9.52 13.58C9.12 13.85 8.76 13.99 8.44 13.98C8.08 13.97 7.4 13.78 6.89 13.61C6.26 13.41 5.77 13.3 5.81 12.95C5.83 12.77 6.08 12.59 6.55 12.4C9.47 11.13 11.41 10.29 12.38 9.89C15.16 8.73 15.73 8.53 16.11 8.53C16.19 8.53 16.38 8.55 16.5 8.65C16.6 8.73 16.63 8.84 16.64 8.92C16.63 8.98 16.65 9.16 16.64 9.3Z" />
                            </svg>
                            <span class="text-sm">@vann_norey</span>
                        </li>
                    </ul>
                </div>

                <!-- Column 4: We Accept (Spans 2 columns on large screens) -->
                <div class="we-accept-parent lg:col-span-2">
                    <h3 class="text-lg font-semibold text-pink-800 mb-4">WE ACCEPT</h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <img class="h-10 w-auto object-contain rounded" alt="Visa" src="/images/visa.jpg">
                        <img class="h-10 w-auto object-contain rounded" alt="payaba" src="/images/payaba.png">
                        <img class="h-10 w-auto object-contain rounded" alt="unionpay"
                            src="/images/UnionPay_logo.svg.png">

                        <img class="h-10 w-auto object-contain rounded" alt="AC" src="/images/rectangle-73.png">
                        <img class="h-10 w-auto object-contain rounded" alt="Mastercard"
                            src="/images/3e4c39c969d4d6d2ed446dd7091f7c66.jpg">
                        <img class="h-10 w-auto object-contain rounded" alt="ABA" src="/images/chipnpng.png">

                        <img class="h-10 w-auto object-contain rounded" alt="Banktransfer"
                            src="/images/rectangle-72.png">
                        <img class="h-10 w-auto object-contain rounded" alt="Banktransfer"
                            src="/images/JCB_logo.svg.png">
                        <img class="h-10 w-auto object-contain rounded" alt="Banktransfer"
                            src="/images/BankTransfer_logo_1200x600.png">

                        <img class="h-10 w-auto object-contain rounded" alt="Cash on Delivery"
                            src="/images/cash-on-delivery.png">
                    </div>
                </div>

                <!-- Column 5: Delivery Options -->
                <div class="zando-app-qr-container text-center p-4">
                    <h3 class="text-xl font-semibold mb-3">SN.Fashion APP</h3>
                    <img src="../../../../public/images/qr code.png" alt="SN.Fashion App QR Code"
                        class="qr-code-image w-40 h-40 mx-auto border border-gray-300 p-1" />

                </div>
            </div>

            <!-- Bottom Bar -->
            <div
                class="line-parent mt-10 pt-6 border-t-2 border-pink-700 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                <p class="text-xs text-gray-500 mb-4 sm:mb-0">© SN.Fashion 2024. All Rights Reserved.</p>
                <button @click="scrollToTop" class="hover:text-pink-600" aria-label="Scroll to top">
                    <svg class="w-7 h-7 stroke-current text-gray-600" viewBox="0 0 34 34" fill="none"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path
                            d="M16.9999 3.3999L26.0666 12.4666M16.9999 3.3999L7.93327 12.4666M16.9999 3.3999V27.1999M2.2666 30.5999H31.7333"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </footer>
    <div class="text-center text-xs text-gray-500 py-4 bg-gray-50">
      Powered by SN.Fashion © 2024
    </div>

    <!-- Menu Popup (Off-canvas style) -->
    <div
      v-if="isMenuOpen"
      @click="closeMenuOverlay"
      class="popup-overlay fixed inset-0 bg-black/30 flex items-start justify-start z-[100]"
    >
      <div
        @click.stop
        class="menu-popup-content w-64 sm:w-72 bg-white h-full shadow-xl flex flex-col overflow-y-auto p-5"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-pink-700">Menu</h2>
          <button @click="closeMenu" aria-label="Close menu">
            <img
              class="w-6 h-6 text-gray-600 hover:text-pink-700"
              alt="Close Menu"
              src="/images/mingcute-menu-fill.svg"
            />
          </button>
        </div>
        <nav>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/category/women"
                @click="closeMenu"
                class="block py-2 px-3 rounded hover:bg-pink-50 hover:text-pink-700"
                >Women Collection</router-link
              >
            </li>
            <li>
              <router-link
                to="/category/men"
                @click="closeMenu"
                class="block py-2 px-3 rounded hover:bg-pink-50 hover:text-pink-700"
                >Men Collection</router-link
              >
            </li>
            <li>
              <router-link
                to="/category/boys"
                @click="closeMenu"
                class="block py-2 px-3 rounded hover:bg-pink-50 hover:text-pink-700"
                >Boys Collection</router-link
              >
            </li>
            <li>
              <router-link
                to="/category/girls"
                @click="closeMenu"
                class="block py-2 px-3 rounded hover:bg-pink-50 hover:text-pink-700"
                >Girls Collection</router-link
              >
            </li>
            
            
          </ul>
        </nav>
        <div class="mt-auto pt-4 border-t border-gray-200 space-y-2">
          <router-link
            to="/login"
            @click="closeMenu"
            class="block py-2 px-3 rounded hover:bg-pink-50 hover:text-pink-700"
            >Login</router-link
          >
          <router-link
            to="/register"
            @click="closeMenu"
            class="block py-2 px-3 rounded hover:bg-pink-50 hover:text-pink-700"
            >Register</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from 'vue';


const isMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);

const openMenu = () => {
  isMenuOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const closeMenuOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closeMenu();
  }
};

const handleCollectionClick = (collectionType) => {
  console.log(`${collectionType} Collection Clicked`);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const IconFacebook = (props) => ({
  template: `<svg class="${props.class}" viewBox="0 0 24 25" fill="currentColor"><path d="M22 12.5C22 6.98 17.52 2.5 12 2.5C6.48 2.5 2 6.98 2 12.5C2 17.34 5.44 21.37 10 22.3V15.5H8V12.5H10V10C10 8.07 11.57 6.5 13.5 6.5H16V9.5H14C13.45 9.5 13 9.95 13 10.5V12.5H16V15.5H13V22.45C18.05 21.95 22 17.69 22 12.5Z"/></svg>`,
});
const IconInstagram = (props) => ({
  template: `<svg class="${props.class}" viewBox="0 0 24 25" fill="currentColor"><path d="M13.0276 2.5C14.1526 2.503 14.7236 2.509 15.2166 2.523L15.4106 2.53C15.6346 2.538 15.8556 2.548 16.1226 2.56C17.1866 2.61 17.9126 2.778 18.5496 3.025C19.2096 3.279 19.7656 3.623 20.3216 4.178C20.8303 4.67773 21.2238 5.28247 21.4746 5.95C21.7216 6.587 21.8896 7.313 21.9396 8.378C21.9516 8.644 21.9616 8.865 21.9696 9.09L21.9756 9.284C21.9906 9.776 21.9966 10.347 21.9986 11.472L21.9996 12.218V13.528C22.002 14.2574 21.9944 14.9868 21.9766 15.716L21.9706 15.91C21.9626 16.135 21.9526 16.356 21.9406 16.622C21.8906 17.687 21.7206 18.412 21.4746 19.05C21.2238 19.7175 20.8303 20.3223 20.3216 20.822C19.8219 21.3307 19.2171 21.7242 18.5496 21.975C17.9126 22.222 17.1866 22.39 16.1226 22.44L15.4106 22.47L15.2166 22.476C14.7236 22.49 14.1526 22.497 13.0276 22.499L12.2816 22.5H10.9726C10.2429 22.5026 9.51312 22.4949 8.78359 22.477L8.58959 22.471C8.3522 22.462 8.11487 22.4517 7.87759 22.44C6.81359 22.39 6.08759 22.222 5.44959 21.975C4.78242 21.7241 4.17803 21.3306 3.67859 20.822C3.16954 20.3224 2.7757 19.7176 2.52459 19.05C2.27759 18.413 2.10959 17.687 2.05959 16.622L2.02959 15.91L2.02459 15.716C2.00616 14.9868 1.99782 14.2574 1.99959 13.528V11.472C1.99682 10.7426 2.00416 10.0132 2.02159 9.284L2.02859 9.09C2.03659 8.865 2.04659 8.644 2.05859 8.378C2.10859 7.313 2.27659 6.588 2.52359 5.95C2.77529 5.2822 3.16982 4.67744 3.67959 4.178C4.17875 3.66955 4.78278 3.27607 5.44959 3.025C6.08759 2.778 6.81259 2.61 7.87759 2.56C8.14359 2.548 8.36559 2.538 8.58959 2.53L8.78359 2.524C9.51278 2.50623 10.2422 2.49857 10.9716 2.501L13.0276 2.5ZM11.9996 7.5C10.6735 7.5 9.40174 8.02678 8.46406 8.96447C7.52638 9.90215 6.99959 11.1739 6.99959 12.5C6.99959 13.8261 7.52638 15.0979 8.46406 16.0355C9.40174 16.9732 10.6735 17.5 11.9996 17.5C13.3257 17.5 14.5974 16.9732 15.5351 16.0355C16.4728 15.0979 16.9996 13.8261 16.9996 12.5C16.9996 11.1739 16.4728 9.90215 15.5351 8.96447C14.5974 8.02678 13.3257 7.5 11.9996 7.5ZM11.9996 9.5C12.3936 9.49993 12.7837 9.57747 13.1477 9.72817C13.5117 9.87887 13.8424 10.0998 14.1211 10.3783C14.3997 10.6569 14.6207 10.9875 14.7715 11.3515C14.9224 11.7154 15 12.1055 15.0001 12.4995C15.0002 12.8935 14.9226 13.2836 14.7719 13.6476C14.6212 14.0116 14.4003 14.3423 14.1218 14.621C13.8432 14.8996 13.5126 15.1206 13.1486 15.2714C12.7847 15.4223 12.3946 15.4999 12.0006 15.5C11.2049 15.5 10.4419 15.1839 9.87927 14.6213C9.31666 14.0587 9.00059 13.2956 9.00059 12.5C9.00059 11.7044 9.31666 10.9413 9.87927 10.3787C10.4419 9.81607 11.2049 9.5 12.0006 9.5M17.2506 6C16.9191 6 16.6011 6.1317 16.3667 6.36612C16.1323 6.60054 16.0006 6.91848 16.0006 7.25C16.0006 7.58152 16.1323 7.89946 16.3667 8.13388C16.6011 8.3683 16.9191 8.5 17.2506 8.5C17.5821 8.5 17.9001 8.3683 18.1345 8.13388C18.3689 7.89946 18.5006 7.58152 18.5006 7.25C18.5006 6.91848 18.3689 6.60054 18.1345 6.36612C17.9001 6.1317 17.5821 6 17.2506 6Z"/></svg>`,
});
const IconTikTok = (props) => ({
  template: `<svg class="${props.class}" viewBox="0 0 24 25" fill="currentColor"><path d="M16.5999 6.32C15.9163 5.53962 15.5396 4.53743 15.5399 3.5H12.4499V15.9C12.4261 16.571 12.1428 17.2066 11.6597 17.6729C11.1766 18.1393 10.5314 18.3999 9.85991 18.4C8.43991 18.4 7.25991 17.24 7.25991 15.8C7.25991 14.08 8.91991 12.79 10.6299 13.32V10.16C7.17991 9.7 4.15991 12.38 4.15991 15.8C4.15991 19.13 6.91991 21.5 9.84991 21.5C12.9899 21.5 15.5399 18.95 15.5399 15.8V9.51C16.7929 10.4099 18.2973 10.8926 19.8399 10.89V7.8C19.8399 7.8 17.9599 7.89 16.5999 6.32Z"/></svg>`,
});
const IconYoutube = (props) => ({
  template: `<svg class="${props.class}" viewBox="0 0 24 25" clip-path="url(#clip0_1_1077)" fill="currentColor"><g id="Group"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.5C12.855 4.5 13.732 4.522 14.582 4.558L15.586 4.606L16.547 4.663L17.447 4.724L18.269 4.788C19.1612 4.85589 20.0008 5.23643 20.64 5.8626C21.2791 6.48877 21.6768 7.3204 21.763 8.211L21.803 8.636L21.878 9.546C21.948 10.489 22 11.517 22 12.5C22 13.483 21.948 14.511 21.878 15.454L21.803 16.364L21.763 16.789C21.6768 17.6798 21.2789 18.5115 20.6396 19.1377C20.0002 19.7639 19.1604 20.1443 18.268 20.212L17.448 20.275L16.548 20.337L15.586 20.394L14.582 20.442C13.7218 20.4793 12.861 20.4986 12 20.5C11.139 20.4986 10.2782 20.4793 9.418 20.442L8.414 20.394L7.453 20.337L6.553 20.275L5.731 20.212C4.83881 20.1441 3.9992 19.7636 3.36004 19.1374C2.72089 18.5112 2.32319 17.6796 2.237 16.789L2.197 16.364L2.122 15.454C2.04583 14.4711 2.00514 13.4858 2 12.5C2 11.517 2.052 10.489 2.122 9.546L2.197 8.636L2.237 8.211C2.32316 7.32055 2.72071 6.48905 3.35966 5.86291C3.99861 5.23676 4.83799 4.85612 5.73 4.788L6.551 4.724L7.451 4.663L8.413 4.606L9.417 4.558C10.2775 4.52073 11.1387 4.50139 12 4.5ZM10 10.075V14.925C10 15.387 10.5 15.675 10.9 15.445L15.1 13.02C15.1914 12.9674 15.2673 12.8916 15.3201 12.8003C15.3729 12.709 15.4007 12.6055 15.4007 12.5C15.4007 12.3945 15.3729 12.291 15.3201 12.1997C15.2673 12.1084 15.1914 12.0326 15.1 11.98L10.9 9.556C10.8088 9.50332 10.7053 9.4756 10.5999 9.47562C10.4945 9.47563 10.3911 9.50339 10.2998 9.5561C10.2086 9.6088 10.1329 9.6846 10.0802 9.77587C10.0276 9.86713 9.99993 9.97065 10 10.076V10.075Z"/></g></svg>`,
});

const socialPlatforms = ref([
  { name: 'Facebook', iconComponent: markRaw(IconFacebook) },
  { name: 'Instagram', iconComponent: markRaw(IconInstagram) },
  { name: 'Tik Tok', iconComponent: markRaw(IconTikTok) },
  { name: 'Youtube', iconComponent: markRaw(IconYoutube) },
]);
</script>

<style>
.font-lexend-mega {
  font-family: 'Lexend Mega', sans-serif;
}
.font-kantumruy {
  font-family: 'Kantumruy Pro', 'Kantumruy', sans-serif;
}
.font-mervale-script {
  font-family: 'Mervale Script', cursive;
}

.product-item p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-item.group:hover p {
  display: block;
  -webkit-line-clamp: unset;
}

html {
  scroll-behavior: smooth;
}

</style>