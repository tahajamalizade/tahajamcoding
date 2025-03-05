<template>
  <q-page>
    <div class="page">
      <div class="photoSlider">
        <q-carousel class="photos" animated v-model="slide" thumbnails infinite>
          <q-carousel-slide :name="1" :img-src="product.image" />
        </q-carousel>
      </div>
      <div class="info">
        <h4 style="margin: 0px">{{ product.name }}</h4>
        <br />
        <p>{{ product.info }}</p>
        <br />
        <h5 style="margin: 0%">{{ product.price }}</h5>
        <br />
        <q-btn
          align="center"
          class="btn-fixed-width"
          label="Add to Checkout"
          @click="addProductToCart(product)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const slide = ref(1);

const products = ref([
  {
    id: 1,
    name: "Jeans",
    price: "$10",
    image: "../src/assets/jeans.jpeg",
    info: "Great jeans!",
  },
  {
    id: 2,
    name: "T-shirt",
    price: "$20",
    image: "../src/assets/T-shirt.jpeg",
    info: "Comfortable!",
  },
  {
    id: 3,
    name: "Shirt",
    price: "$40",
    image: "../src/assets/shirt.jpeg",
    info: "Formal & casual",
  },
  {
    id: 4,
    name: "Gloves",
    price: "$50",
    image: "../src/assets/gloves.jpeg",
    info: "Warm & stylish",
  },
  {
    id: 5,
    name: "Socks",
    price: "$50",
    image: "../src/assets/socks.jpeg",
    info: "Soft & cozy",
  },
]);

const product = computed(() =>
  products.value.find((p) => p.id === Number(route.params.id))
);

const cart = ref([]);

const addProductToCart = (product) => {
  const existingProduct = cart.value.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
};
</script>

<style lang="scss">
.page {
  display: flex;
  justify-content: space-evenly;
  .photos{
    width: 350px;

  }
  .photoSlider {
    width: 600px;
    height: 400px;
    margin: 30px;
  }
  .info {
    width: 600px;
    height: 400px;
    padding: 30px;
    .btn-fixed-width {
      width: 200px;
      background-color: #7fcfa8;
    }
  }
}
</style>
