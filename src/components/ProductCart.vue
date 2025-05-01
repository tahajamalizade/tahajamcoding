<template>
  <q-card class="my-card" @click="goToPage(product._id)">
    <img class="image" :src="product.image" />

    <q-card-section>
      <div class="text-h6">{{ product.name }}</div>
      <div class="text-subtitle2">{{ product.price }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none"> </q-card-section>
  </q-card>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const goToPage = (id) => {
  router.push(`/products/${id}`);
};
</script>

<style lang="scss">
.my-card {
  width: 300px;
  border-radius: 30px;
  cursor: pointer;
}

.image {
  width: 200px;
  height: 300px;
}
</style>
