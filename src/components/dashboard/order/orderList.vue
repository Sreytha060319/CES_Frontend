<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Breadcrumbs -->
    

    <h1 class="text-2xl font-semibold text-gray-800 mb-6">List</h1>
 <nav class="flex items-center text-sm text-gray-600">
          <router-link to="/admin/home" class="hover:underline">Dashboard</router-link>
          <span class="before:content-['•'] before:mx-2 before:text-gray-400"></span>
          <router-link to="/admin/order/orderlist" class="hover:underline">Order</router-link>
          <span class="before:content-['•'] before:mx-2 before:text-gray-400"></span>
          <span> List</span>
        </nav>
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-6">
        <button
          v-for="tab in orderTabs"
          :key="tab.status"
          @click="selectTab(tab.status)"
          :class="[
            'px-4 py-2 text-sm font-medium focus:outline-none',
            activeTab === tab.status
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          {{ tab.name }}
          <span
            v-if="tab.count !== undefined"
            :class="[
              'ml-1 px-2 py-0.5 rounded-full text-xs font-medium',
              tab.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : tab.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : tab.status === 'cancelled'
                ? 'bg-red-100 text-red-800'
                : tab.status === 'refunded'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800',
            ]"
            >{{ tab.count }}</span
          >
        </button>
      </div>

      <!-- Filters Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div class="relative">
          <input
            type="date"
            v-model="startDate"
            placeholder="Start date"
            class="form-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm pl-10"
          />
          <i class="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        <div class="relative">
          <input
            type="date"
            v-model="endDate"
            placeholder="End date"
            class="form-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm pl-10"
          />
          <i class="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        <div class="relative col-span-1 md:col-span-2">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search customer or order number..."
            class="form-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm pl-10"
          />
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        <div class="lg:col-span-1 flex justify-end items-center">
            <button class="text-gray-500 hover:text-gray-700 text-lg">
                <i class="fas fa-ellipsis-h"></i>
            </button>
        </div>
      </div>

      <!-- Applied Filters & Results -->
      <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div class="flex items-center gap-2">
          <span>{{ filteredOrders.length }} results found</span>
          <div v-if="activeTab !== 'all'" class="flex items-center px-3 py-1 bg-gray-100 rounded-full text-gray-800">
            Status: <span class="font-medium ml-1 capitalize">{{ activeTab }}</span>
            <button @click="clearStatusFilter" class="ml-2 text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-xs"></i>
            </button>
          </div>
          <button v-if="searchTerm || startDate || endDate || activeTab !== 'all'" @click="clearAllFilters" class="text-red-500 hover:text-red-700 ml-2">
            <i class="fas fa-trash-alt mr-1"></i>Clear
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="p-4">
                <input
                  type="checkbox"
                  @change="toggleAllCheckboxes"
                  :checked="allOrdersSelected"
                  :indeterminate="someOrdersSelected && !allOrdersSelected"
                  class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="handleSort('orderId')"
              >
                <div class="flex items-center">
                  Order
                  <i
                    class="ml-1 fas"
                    :class="{
                      'fa-sort': sortedColumn !== 'orderId',
                      'fa-sort-up': sortedColumn === 'orderId' && sortDirection === 'asc',
                      'fa-sort-down': sortedColumn === 'orderId' && sortDirection === 'desc',
                    }"
                  ></i>
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Items
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody :class="[isDense ? 'divide-y divide-gray-200' : '']">
            <tr v-for="order in paginatedOrders" :key="order.orderId" class="hover:bg-gray-50">
              <td class="p-4">
                <input
                  type="checkbox"
                  :checked="selectedOrders.has(order.orderId)"
                  @change="toggleOrderCheckbox(order.orderId)"
                  class="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </td>
              <td :class="['px-6', isDense ? 'py-2' : 'py-4', 'whitespace-nowrap']">
                <div class="text-sm font-medium text-gray-900">#{{ order.orderId }}</div>
              </td>
              <td :class="['px-6', isDense ? 'py-2' : 'py-4', 'whitespace-nowrap']">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      class="h-10 w-10 rounded-full object-cover"
                      :src="order.customer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(order.customer.name)}&background=random&color=fff`"
                      :alt="order.customer.name"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ order.customer.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ order.customer.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td :class="['px-6', isDense ? 'py-2' : 'py-4', 'whitespace-nowrap']">
                <div class="text-sm text-gray-900">{{ formatDate(order.date) }}</div>
                <div class="text-xs text-gray-500">{{ formatTime(order.date) }}</div>
              </td>
              <td :class="['px-6', isDense ? 'py-2' : 'py-4', 'whitespace-nowrap']">
                <div class="text-sm text-gray-900">{{ order.items }}</div>
              </td>
              <td :class="['px-6', isDense ? 'py-2' : 'py-4', 'whitespace-nowrap']">
                <div class="text-sm text-gray-900">${{ order.price.toFixed(2) }}</div>
              </td>
              <td :class="['px-6', isDense ? 'py-2' : 'py-4', 'whitespace-nowrap']">
                <OrderStatusBadge :status="order.status" />
              </td>
              <td :class="['px-6', isDense ? 'py-2' : 'py-4', 'whitespace-nowrap', 'text-right', 'text-sm', 'font-medium']">
                <button class="text-gray-500 hover:text-gray-700 text-lg">
                  <i class="fas fa-chevron-down mr-2 text-xs"></i>
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </td>
            </tr>
            <tr v-if="paginatedOrders.length === 0">
                <td colspan="8" class="text-center py-8 text-gray-500 text-lg">No orders found matching your criteria.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table Footer / Pagination -->
      <div class="flex items-center justify-between py-3 border-t border-gray-200 mt-4">
        <!-- Dense Toggle -->
        <div class="flex items-center">
          <label for="dense-toggle" class="mr-2 text-sm text-gray-700">Dense</label>
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id="dense-toggle"
              v-model="isDense"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="dense-toggle"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex items-center text-sm text-gray-700">
          <div class="mr-4">
            Rows per page:
            <select
              v-model="rowsPerPage"
              class="ml-2 py-1 px-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
          </div>
          <div class="mr-4">
            {{ paginationRange }}
          </div>
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage * rowsPerPage >= filteredOrders.length"
            class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
// import OrderStatusBadge from '../components/OrderStatusBadge.vue'; // Adjust path if needed

// --- Data ---
const orderTabs = ref([
  { name: 'All', status: 'all', count: 20 },
  { name: 'Pending', status: 'pending', count: 6 },
  { name: 'Completed', status: 'completed', count: 10 },
  { name: 'Cancelled', status: 'cancelled', count: 2 },
  { name: 'Refunded', status: 'refunded', count: 2 },
]);

const orders = ref([
  {
    orderId: '60110',
    customer: {
      name: 'Soren Durham',
      email: 'vergie.block82@hotmail.com',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    date: '2025-06-04T10:07:00',
    items: 5,
    price: 400.41,
    status: 'Pending',
  },
  {
    orderId: '60114',
    customer: {
      name: 'Aspen Schmitt',
      email: 'mireya13@hotmail.com',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    date: '2025-05-31T06:07:00',
    items: 5,
    price: 400.41,
    status: 'Pending',
  },
  {
    orderId: '60116',
    customer: {
      name: 'Angelique Morse',
      email: 'benny89@yahoo.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    date: '2025-05-29T04:07:00',
    items: 5,
    price: 400.41,
    status: 'Completed',
  },
  {
    orderId: '60120',
    customer: {
      name: 'Deja Brady',
      email: 'milo.farrell@hotmail.com',
      avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    },
    date: '2025-06-12T06:07:00',
    items: 5,
    price: 400.41,
    status: 'Pending',
  },
  {
    orderId: '60140',
    customer: {
      name: 'Reece Chung',
      email: 'letha.lubowitz24@yahoo.com',
      avatar: 'https://randomuser.me/api/portraits/men/70.jpg',
    },
    date: '2025-06-10T04:07:00',
    items: 5,
    price: 400.41,
    status: 'Pending',
  },
  {
    orderId: '60150',
    customer: {
      name: 'Olivia Williams',
      email: 'olivia.w@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    date: '2025-05-25T11:30:00',
    items: 2,
    price: 120.00,
    status: 'Completed',
  },
  {
    orderId: '60160',
    customer: {
      name: 'Liam Johnson',
      email: 'liam.j@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    date: '2025-06-01T09:15:00',
    items: 1,
    price: 50.00,
    status: 'Cancelled',
  },
  {
    orderId: '60170',
    customer: {
      name: 'Emma Smith',
      email: 'emma.s@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    date: '2025-05-28T14:00:00',
    items: 3,
    price: 250.75,
    status: 'Refunded',
  },
  {
    orderId: '60180',
    customer: {
      name: 'Noah Davis',
      email: 'noah.d@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    },
    date: '2025-06-07T16:45:00',
    items: 7,
    price: 700.00,
    status: 'Completed',
  },
  {
    orderId: '60190',
    customer: {
      name: 'Ava Martinez',
      email: 'ava.m@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    date: '2025-06-08T08:00:00',
    items: 4,
    price: 300.00,
    status: 'Pending',
  },
  {
    orderId: '60200',
    customer: {
      name: 'Isabella Garcia',
      email: 'isabella.g@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    date: '2025-06-09T10:00:00',
    items: 6,
    price: 550.00,
    status: 'Completed',
  },
  {
    orderId: '60210',
    customer: {
      name: 'Sophia Rodriguez',
      email: 'sophia.r@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    date: '2025-06-11T13:00:00',
    items: 2,
    price: 99.99,
    status: 'Pending',
  },
  {
    orderId: '60220',
    customer: {
      name: 'Mia Miller',
      email: 'mia.m@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    },
    date: '2025-06-13T17:00:00',
    items: 1,
    price: 75.00,
    status: 'Cancelled',
  },
  {
    orderId: '60230',
    customer: {
      name: 'Charlotte Davis',
      email: 'charlotte.d@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    date: '2025-06-14T09:00:00',
    items: 8,
    price: 900.00,
    status: 'Refunded',
  },
]);

// --- State Variables ---
const activeTab = ref('pending'); // Initial tab is 'Pending' based on image
const searchTerm = ref('');
const startDate = ref('');
const endDate = ref('');
const isDense = ref(false); // For table row density
const selectedOrders = ref(new Set()); // Using Set for efficient ID tracking
const sortedColumn = ref('orderId');
const sortDirection = ref('asc'); // 'asc' or 'desc'
const currentPage = ref(1);
const rowsPerPage = ref(5); // Default rows per page

// --- Computed Properties ---

const filteredOrders = computed(() => {
  let filtered = [...orders.value];

  // Filter by active tab status
  if (activeTab.value !== 'all') {
    filtered = filtered.filter(order => order.status.toLowerCase() === activeTab.value);
  }

  // Filter by search term (customer name, email, or orderId)
  if (searchTerm.value) {
    const lowerSearchTerm = searchTerm.value.toLowerCase();
    filtered = filtered.filter(
      order =>
        order.customer.name.toLowerCase().includes(lowerSearchTerm) ||
        order.customer.email.toLowerCase().includes(lowerSearchTerm) ||
        order.orderId.includes(lowerSearchTerm)
    );
  }

  // Filter by date range
  if (startDate.value) {
    const start = new Date(startDate.value);
    filtered = filtered.filter(order => new Date(order.date) >= start);
  }
  if (endDate.value) {
    const end = new Date(endDate.value);
    // Add a day to end date to include orders from that entire day
    end.setDate(end.getDate() + 1);
    filtered = filtered.filter(order => new Date(order.date) < end);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let valA, valB;
    if (sortedColumn.value === 'orderId') {
      valA = parseInt(a.orderId);
      valB = parseInt(b.orderId);
    } else {
      // Default to string comparison for other columns, extend as needed
      valA = a[sortedColumn.value];
      valB = b[sortedColumn.value];
    }

    if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1;
    return 0;
  });

  return filtered;
});

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredOrders.value.slice(start, end);
});

const allOrdersSelected = computed(() => {
  return paginatedOrders.value.length > 0 && paginatedOrders.value.every(order => selectedOrders.value.has(order.orderId));
});

const someOrdersSelected = computed(() => {
  return paginatedOrders.value.some(order => selectedOrders.value.has(order.orderId));
});

const paginationRange = computed(() => {
  const total = filteredOrders.value.length;
  if (total === 0) return '0 of 0';
  const start = (currentPage.value - 1) * rowsPerPage.value + 1;
  const end = Math.min(start + rowsPerPage.value - 1, total);
  return `${start}-${end} of ${total}`;
});

// --- Watchers ---
watch(activeTab, () => {
  currentPage.value = 1; // Reset page when tab changes
});
watch(rowsPerPage, () => {
    currentPage.value = 1; // Reset page when rows per page changes
});
watch(filteredOrders, () => {
    // If current page is out of bounds after filtering, reset to 1
    const maxPage = Math.ceil(filteredOrders.value.length / rowsPerPage.value);
    if (currentPage.value > maxPage && maxPage > 0) {
        currentPage.value = maxPage;
    } else if (maxPage === 0) {
        currentPage.value = 1;
    }
});


// --- Methods ---
const selectTab = (status) => {
  activeTab.value = status;
};

const clearStatusFilter = () => {
  activeTab.value = 'all'; // Go back to 'All' tab
};

const clearAllFilters = () => {
  activeTab.value = 'all';
  searchTerm.value = '';
  startDate.value = '';
  endDate.value = '';
  currentPage.value = 1;
  selectedOrders.value.clear(); // Clear selections too
};

const toggleAllCheckboxes = (event) => {
  if (event.target.checked) {
    paginatedOrders.value.forEach(order => selectedOrders.value.add(order.orderId));
  } else {
    paginatedOrders.value.forEach(order => selectedOrders.value.delete(order.orderId));
  }
};

const toggleOrderCheckbox = (orderId) => {
  if (selectedOrders.value.has(orderId)) {
    selectedOrders.value.delete(orderId);
  } else {
    selectedOrders.value.add(orderId);
  }
};

const handleSort = (column) => {
  if (sortedColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortedColumn.value = column;
    sortDirection.value = 'asc';
  }
};

const nextPage = () => {
  if (currentPage.value * rowsPerPage.value < filteredOrders.value.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// --- Utility Functions (for date/time formatting) ---
const formatDate = (isoString) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatTime = (isoString) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).toLowerCase();
};
</script>

<style scoped>
/* Custom styles for the Dense toggle switch */
.toggle-checkbox:checked {
  right: 0;
  border-color: #4f46e5; /* indigo-600 */
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #4f46e5; /* indigo-600 */
}
.toggle-label {
  @apply bg-gray-300;
  transition: background-color 0.2s ease-in-out;
}
.toggle-checkbox {
  transition: right 0.2s ease-in-out, border-color 0.2s ease-in-out;
}
</style>