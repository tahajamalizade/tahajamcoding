<template>
  <div>
    <h2>Your Cart</h2>
    <div v-if="cart.length === 0">Cart is empty</div>
    <div v-for="(item, index) in cart" :key="item.id">
      <div>{{ item.name }} - {{ item.price }} x {{ item.quantity }}</div>
      <q-btn icon="remove" @click="removeItem(index)" />
      <q-input
        type="number"
        v-model.number="item.quantity"
        @change="updateQuantity(index, item.quantity)"
        style="width: 100px"
      />
    </div>
    <div>Subtotal: {{ subtotal }}</div>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref, computed, onMounted } from "vue";

// Replace this with your auth logic or Vuex/store logic
const user = JSON.parse(localStorage.getItem("user"))

const cart = ref([]);

onMounted(async () => {
  await fetchCart();
});

async function fetchCart() {
  try {
    const response = await api.get(`/cart/${user.id}`);
    cart.value = response.data;
  } catch (error) {
    console.error("Error fetching cart data:", error.response?.data || error.message);
  }
}

// async function updateQuantity(index, newQuantity) {
//   const item = cart.value[index];
//   if (newQuantity > 0) {
//     try {
//       await api.put(`/cart/${userId}/item/item.id`, {
//         quantity: newQuantity
//       });
//       item.quantity = newQuantity;
//     } catch (error) {
//       console.error("Error updating quantity:", error.response?.data || error.message);
//     }
//   }


async function removeItem(index) {
  const item = cart.value[index];
  try {
    await api.delete(`/cart/${userId}/item/${item.id}`);
    cart.value.splice(index, 1);
  } catch (error) {
    console.error("Error removing item:", error.response?.data || error.message);
  }
}

const subtotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
</script>
