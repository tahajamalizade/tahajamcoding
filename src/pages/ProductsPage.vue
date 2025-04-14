<template>
  <q-page>
    <!-- Category Buttons -->
    <div class="head">
      <q-btn
        label="All"
        size="md"
        padding="7px"
        inline
        color="secondary"
        @click="goPage"
      />
      <q-btn
        v-for="cat in categories"
        :key="cat"
        :label="cat"
        size="md"
        padding="7px"
        inline
        color="secondary"
        @click="changequery(cat)"
      />
    </div>

    <!-- Product Cards -->
    <div class="products">
      <ProductCart
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "boot/axios";

import ProductCart from "src/components/ProductCart.vue";

const router = useRouter();
const route = useRoute();

// Initialize category from the query parameter
const category = ref(route.query.category || null);

// Watch for changes in the query parameter
watch(
  () => route.query.category,
  (newCategory) => {
    category.value = newCategory;
  }
);

const changequery = (newCategory) => {
  router.push({ query: { category: newCategory } });
};

const goPage = () => {
  router.push(`/products`);
};

const products = ref([]);

onMounted(async () => {
  try {
    const res = await api.get("/products");
    products.value = res.data;
  } catch (err) {
    console.error("Error loading products:", err);
  }
});

const filteredProducts = computed(() => {
  if (!category.value) {
    return products.value;
  }
  return products.value.filter(
    (product) => product.category === category.value
  );
});

// List of categories
const categories = ["pants", "shirts", "socks"];
</script>

<style lang="scss">
.head {
  width: 300px;
  // height: 80px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-between;
  margin: 30px;
}
.products {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: start;
  gap: 1em;
  padding: 30px;
}
</style>
