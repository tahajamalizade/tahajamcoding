<template>
  <q-card class="my-card" @click="goToPage(product.id)">
    <img class="image" :src="product.image" />

    <q-card-section>
      <div class="text-h6">{{ product.name }}</div>
      <div class="text-subtitle2">{{ product.price }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">

    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["product"]);

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
