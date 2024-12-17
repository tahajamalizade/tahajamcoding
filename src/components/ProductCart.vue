<template>
  <div class="card" v-for="product in products" :key="product.id">
    <img
      src="../assets/propic.jpg"
      alt="Denim Jeans"
      style="width: 80%; padding: 0px 30px; border-radius: 15px; padding: 20px"
    />
    <ul class="list">
      <li>
        <h4>{{ product.name }}</h4>
        <h5>{{ product.price }}</h5>
      </li>
    </ul>

    <div style="left: 20px">
      <p><button>Add to Cart</button></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ShowProducts: true,
      products: [
        { id: 1, name: "jeans", price: '10$', },
        { id: 2, name: "Tshirt", price: '20$' },
        { id: 3, name: "shirt", price: '40$' },
        { id: 4, name: "gloves", price: '50$' },
        { id: 5, name: "socks", price: '50$' },
      ],
    };
  },
};
</script>

<style lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  text-align: center;
  font-family: arial;
  background-color: #7fcfa8;
  border-radius: 20px;
  cursor: pointer;
  height: fit-content;

  .list li{
    list-style-type: none;
    float: left;
  }
  .list li h4,h5{
    margin: 0;
    color: #4a5c53;
    padding-bottom: 5px;

  }
}

.card button {
  border: none;
  outline: 0;
  padding: 12px;
  color: #558b71;
  /* background-color: #000; */
  text-align: right;
  cursor: pointer;
  width: 40%;
  font-size: 18px;
  transition: 0.4s;
  border-radius: 20px;
  float: floor($number: 0);
}

.card button:hover {
  background-color: #558b71;
  color: white;
}
</style>
