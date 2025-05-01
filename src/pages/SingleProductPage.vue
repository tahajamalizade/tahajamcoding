<template>
  <q-page>
    <div class="page">
      <div v-if="product">
        <!-- <div class="photoSlider">
          <q-carousel
            class="photos"
            animated
            v-model="slide"
            thumbnails
            infinite
          >
            <q-carousel-slide :name="1" :img-src="product.image" />
          </q-carousel>

        </div> -->
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
            @click="addToCart(product)"
          />
        </div>
      </div>
      <!-- Show a fallback message if no product is found -->
      <div v-else>
        <p class="text-h4">Product not found!</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";

const route = useRoute();

const slide = ref(1);

const product = ref("");

onMounted(async () => {
  try {
    const res = await api.get(`/products/${route.params.id}`);
    product.value = res.data;
  } catch (err) {
    console.error("Error loading products:", err);
  }
});

const cart = ref([]);

async function addToCart(product) {
  try {
    // Send the product data to the backend API to add to the cart
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user: ", user);
    const response = await api.post(`/cart/add`, {
      userId: user.id,
      productId: product._id, // Product ID
      quantity: 1,
    });

    // Optionally, you can also update the UI or show a success message
    console.log("Product added to cart:", response.data);
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}

localStorage.setItem("cart", JSON.stringify(cart));
</script>

<style lang="scss">
.page {
  display: flex;
  justify-content: space-evenly;
  .photos {
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
