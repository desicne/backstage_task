<template>
  <main class="p-10">
    <NuxtLink to="/">Back Home</NuxtLink>

    <NuxtLink to="/products/create" class="absolute right-8">Add New</NuxtLink>

    <h1 class="my-10">Products</h1>

    <div v-if="loading && !error" class="text-center my-5">
      Loading products...
    </div>

    <div v-else-if="error">
        There was an issue loading products. Please refresh the page.
    </div>

    <div v-else class="flex flex-row justify-start flex-wrap">
        <div v-for="product in products" :key="product.id" class="product">
            <img :src="product.image" alt="Product Image" class="h-48 w-full object-cover" />
            <h2>{{ product.title }}</h2>
            <p class="text-sm">{{ product.description }}</p>
            <p class="absolute top-1 right-0 text-green-600 text-lg font-bold">${{ product.price }}</p>
        </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const error = ref(false)
const products = ref([])

const fetchProducts = async () => {
  try {
    error.value = false
    const data = await $fetch('/api/products')
    products.value = data
    loading.value = false
  } catch (error) {
    console.error('Error fetching products:', error)
    error.value = true
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

</script>

<style scoped>
.product {
    position: relative;
    width: 220px;
    max-width: 360px;
    @apply my-6 mx-6 border-2 border-gray-300 dark:border-slate-300 rounded overflow-hidden cursor-pointer drop-shadow-sm
}

.product h2 {
    @apply text-xl font-bold py-2 px-2
}

.product p {
    @apply px-2 pb-2
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
