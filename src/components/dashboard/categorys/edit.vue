<template>
  <!-- ... (keep all previous template code until the edit button) ... -->
  <button @click="openEditModal(item)" class="text-blue-600 hover:text-blue-800 mr-4 transition duration-150 ease-in-out transform hover:scale-105">
    <i class="fas fa-edit mr-1"></i> Edit
  </button>
  <!-- ... (rest of the template remains the same) ... -->

  <!-- Edit Category Modal -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Edit Category</h3>
          <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <form @submit.prevent="submitEditForm">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="edit-name">
              Category Name
            </label>
            <input
              id="edit-name"
              v-model="editForm.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="edit-level">
              Level
            </label>
            <select
              id="edit-level"
              v-model="editForm.level"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Featured
            </label>
            <ToggleSwitch v-model="editForm.featured" />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="edit-image">
              Category Image
            </label>
            <div class="flex items-center">
              <div v-if="editForm.image" class="mr-4">
                <img :src="editForm.image" class="w-16 h-16 object-cover rounded-md" alt="Current image">
              </div>
              <input
                id="edit-image"
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeEditModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">
                <i class="fas fa-spinner fa-spin mr-1"></i> Saving...
              </span>
              <span v-else>
                Save Changes
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../axios/Axios';

const router = useRouter();

// ... (keep all previous script setup code) ...

// Edit Modal State
const showEditModal = ref(false);
const isSubmitting = ref(false);
const editForm = ref({
  id: null,
  name: '',
  level: '1',
  featured: false,
  image: null,
  imageFile: null
});

// Methods for editing
const openEditModal = (category) => {
  editForm.value = {
    id: category.id,
    name: category.name,
    level: category.level.toString(),
    featured: category.featured,
    image: category.image,
    imageFile: null
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editForm.value = {
    id: null,
    name: '',
    level: '1',
    featured: false,
    image: null,
    imageFile: null
  };
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    editForm.value.imageFile = file;
    // Create a preview URL for the image
    editForm.value.image = URL.createObjectURL(file);
  }
};

const submitEditForm = async () => {
  try {
    isSubmitting.value = true;
    const token = sessionStorage.getItem("auth_token");
    
    // Prepare form data for potential file upload
    const formData = new FormData();
    formData.append('name', editForm.value.name);
    formData.append('level', editForm.value.level);
    formData.append('featured', editForm.value.featured);
    
    if (editForm.value.imageFile) {
      formData.append('image', editForm.value.imageFile);
    }

    const response = await api.put(`/categories/${editForm.value.id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    // Update the local categories list
    const updatedCategory = response.data.data;
    const index = categories.value.findIndex(c => c.id === updatedCategory.id);
    if (index !== -1) {
      categories.value[index] = updatedCategory;
    }

    closeEditModal();
  } catch (error) {
    console.error("Error updating category:", error);
    alert("Failed to update category. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

// ... (keep all remaining code) ...
</script>