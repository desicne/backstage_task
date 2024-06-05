<template>
    <main class="p-10">
        <NuxtLink to="/">
            Back Home
        </NuxtLink>

        <h1 class="my-10">Create new product</h1>
        
        <form @submit.prevent="submitForm" class="max-w-2xl">
            <div class="mb-5">
                <label for="title" class="block mb-2">Title</label>
                <input v-model="title" type="text" id="title" class="w-full p-2 border border-gray-300 rounded" required>
            </div>
            <div class="mb-5">
                <label for="description" class="block mb-2">Description</label>
                <textarea v-model="description" id="description" class="w-full p-2 border border-gray-300 rounded" required></textarea>
            </div>
            <div class="mb-5">
                <label for="price" class="block mb-2">Price</label>
                <input v-model="price" type="number" id="price" class="w-full p-2 border border-gray-300 rounded" required>
            </div>
            <button type="submit" class="submit-button">Add Product</button>
        </form>

        <div v-if="notification.message" :class="notificationClass" class="absolute top-2 right-2 mt-5 p-4 rounded">
            {{ notification.message }}
        </div>

    </main>
</template>
<script setup>
import { ref, computed } from 'vue'

const title = ref('')
const description = ref('')
const price = ref(0)
const notification = ref({ message: '', type: '' })

const submitForm = async () => {
  try {
    const newProduct = { title: title.value, description: description.value, price: parseFloat(price.value) }
    await $fetch('/api/products', {
      method: 'POST',
      body: newProduct
    })
    notification.value = { message: 'Product added successfully!', type: 'success' }
    title.value = ''
    description.value = ''
    price.value = 0
  } catch (error) {
    console.error('Error adding product:', error)
    notification.value = { message: 'Failed to add product.', type: 'error' }
  } finally {
    setTimeout(() => {
        notification.value = { message: '', type: '' }
    }, 3000)
  }
}

const notificationClass = computed(() => {
  return notification.value.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
})
</script>

<style scoped>
.product-form {
  max-width: 600px;
  margin: 0 auto;
}

.submit-button {
    @apply my-4 py-2 px-4 rounded bg-orange-400
}
</style>