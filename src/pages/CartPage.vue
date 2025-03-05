<template>
  <div class="cart-page">
    <h2>Cart</h2>
    <div class="cart-container">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="item.id">
            <td class="product-info">
              <div>
                <strong>{{ item.name }}</strong>
                <p>{{ item.color }} | {{ item.size }}</p>
              </div>
            </td>
            <td>
              <button
                @click="updateQuantity(index, item.quantity - 1)"
                :disabled="item.quantity <= 1"
              >
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(index, item.quantity + 1)">
                +
              </button>
            </td>
            <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button @click="removeItem(index)" class="remove-btn">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>


      <div class="summary">
        <p><strong>Subtotal:</strong> ${{ subtotal.toFixed(2) }}</p>
        <p><strong>Discount:</strong> $0.00</p>
        <p class="grand-total">
          <strong>Grand Total:</strong> ${{ subtotal.toFixed(2) }}
        </p>
        <button class="checkout-btn">Checkout Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [
        {
          id: 1,
          name: "Cardigan",
          color: "Green",
          size: "M",
          price: 2500,
          quantity: 1,
        },
        {
          id: 2,
          name: "Cahier Leather Shoulder Bag",
          color: "Grey",
          size: "",
          price: 2500,
          quantity: 1,
        },
        {
          id: 3,
          name: " Watches",
          color: "Brown",
          size: "M",
          price: 2500,
          quantity: 1,
        },
      ],
    };
  },
  computed: {
    subtotal() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    updateQuantity(index, newQuantity) {
      if (newQuantity > 0) {
        this.cart[index].quantity = newQuantity;
      }
    },
    removeItem(index) {
      this.cart.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.cart-page {
  width: 80%;
  margin: auto;
}
.cart-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.product-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.product-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
button {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 3px;
}
.remove-btn {
  background-color: #dc3545;
}
.checkout-btn {
  background-color: black;
  color: white;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
}
.grand-total {
  font-size: 18px;
  font-weight: bold;
}
</style>
