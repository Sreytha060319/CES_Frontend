<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Customers</h2>
      <button @click="showForm = true" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
        <i class="fas fa-plus"></i> Add Customer
      </button>
    </div>

    <!-- Search -->
    <div class="mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="🔍 Search by name"
        class="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-lg shadow bg-white">
      <table class="min-w-full text-sm text-left text-gray-700">
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm font-bold">
          <tr>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Phone</th>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Wallet Balance</th>
            <th class="px-6 py-3">No Of Orders</th>
            <th class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in paginatedCustomers" :key="customer.email" class="border-t hover:bg-gray-50">
            <td class="flex items-center gap-3 px-6 py-4">
              <img :src="customer.avatar" class="w-8 h-8 rounded-full" alt="Avatar" />
              {{ customer.name }}
            </td>
            <td class="px-6 py-4">{{ customer.phone }}</td>
            <td class="px-6 py-4">{{ customer.email }}</td>
            <td class="px-6 py-4">${{ customer.walletBalance }}</td>
            <td class="px-6 py-4">{{ customer.orders }}</td>
            <td class="px-6 py-4">
              <div class="flex gap-3 text-gray-600">
                <i class="fas fa-pen cursor-pointer hover:text-blue-600"></i>
                <i class="fas fa-trash cursor-pointer hover:text-red-600"></i>
              </div>
            </td>
          </tr>
          <tr v-if="paginatedCustomers.length === 0">
            <td colspan="6" class="px-6 py-4 text-center text-gray-500">No customers found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-4 gap-2">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        class="px-3 py-1 rounded"
        :class="{
          'bg-blue-500 text-white': currentPage === page,
          'bg-gray-200 hover:bg-gray-300': currentPage !== page,
        }"
      >
        {{ page }}
      </button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>

    <!-- Create Customer Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4">Create New Customer</h3>
        <form @submit.prevent="addCustomer">
          <input v-model="newCustomer.name" type="text" placeholder="Name" class="mb-2 w-full px-4 py-2 border rounded" required />
          <input v-model="newCustomer.phone" type="text" placeholder="Phone" class="mb-2 w-full px-4 py-2 border rounded" required />
          <input v-model="newCustomer.email" type="email" placeholder="Email" class="mb-2 w-full px-4 py-2 border rounded" required />
          <input v-model="newCustomer.walletBalance" type="text" placeholder="Wallet Balance" class="mb-2 w-full px-4 py-2 border rounded" required />
          <input v-model="newCustomer.orders" type="text" placeholder="No Of Orders" class="mb-2 w-full px-4 py-2 border rounded" required />

          <div class="flex justify-end gap-2">
            <button type="button" @click="showForm = false" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      currentPage: 1,
      itemsPerPage: 5,
      showForm: false,
      newCustomer: {
        name: '',
        phone: '',
        email: '',
        walletBalance: '',
        orders: '',
        avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70 + 1),
      },
      customers: [
        {
          name: 'Dominic Moss',
          phone: '+12345678910',
          email: 'dominic@gmail.com',
          walletBalance: '11,345.25',
          orders: '03',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
        {
          name: 'Ethan Booth',
          phone: '+12345678910',
          email: 'ethan@gmail.com',
          walletBalance: '10,350.25',
          orders: '07',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
        // ... other initial customers
      ],
    };
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter((c) =>
        c.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    totalPages() {
      return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
    },
    paginatedCustomers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCustomers.slice(start, end);
    },
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    addCustomer() {
      const customer = {
        ...this.newCustomer,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70 + 1)}`,
      };
      this.customers.unshift(customer);
      this.showForm = false;
      this.newCustomer = {
        name: '',
        phone: '',
        email: '',
        walletBalance: '',
        orders: '',
        avatar: '',
      };
    },
  },
};
</script>

<style scoped>
table th,
table td {
  white-space: nowrap;
}
</style>
