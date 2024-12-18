<template>
  <div class="card" v-for="product in products" :key="product.id">
    <img
      :src="product.image"
      :alt="product.name"
      style="width: 70%; padding: 0px 30px; border-radius: 15px; padding: 20px"
    />
    <div class="info">
      <ul class="list">
        <li>
          <h4>{{ product.name }}</h4>
          <h5>{{ product.price }}</h5>
        </li>
      </ul>
    </div>

    <div style="left: 20px">
      <p><button>Add to Cart</button></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "jeans",
          price: "10$",
          image: "../src/assets/jeans.jpeg",
        },
        {
          id: 2,
          name: "Tshirt",
          price: "20$",
          image: "../src/assets/tshirt.jpeg",
        },
        {
          id: 3,
          name: "shirt",
          price: "40$",
          image: "../src/assets/shirt.jpeg",
        },
        {
          id: 4,
          name: "gloves",
          price: "50$",
          image: "../src/assets/gloves.jpeg",
        },
        {
          id: 5,
          name: "socks",
          price: "50$",
          image: "../src/assets/socks.jpeg",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 300px;
  height: 450px;
  text-align: center;
  font-family: arial;
  background-color: #7fcfa8;
  border-radius: 20px;
  cursor: pointer;
  // height: fit-content;

  .list li {
    list-style-type: none;
  }
  .list {
    padding-left: 0px;
  }
  .list li h4,
  h5 {
    margin: 0;
    color: #4a5c53;
    padding-bottom: 5px;
  }
}

.card button {
  border: none;
  color: #558b71;
  /* background-color: #000; */
  text-align: center;
  cursor: pointer;
  width: 100px;
  height: 50px;
  font-size: 18px;
  transition: 0.4s;
  border-radius: 20px;
  padding: 4px;
}

.card button:hover {
  background-color: #558b71;
  color: white;
}
</style>
