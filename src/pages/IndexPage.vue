<template>
  <q-page>
    <header>
      <div class="header"></div>
    </header>

    <div class="title"><h4>new products</h4></div>

    <div class="product">
      <ProductCart
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import dropDown from "src/components/dropDown.vue";
import ProductCart from "src/components/ProductCart.vue";
import { info } from "autoprefixer";

const products = ref([
  {
    id: 1,
    name: "jeans",
    price: "10$",
    image: "../src/assets/jeans.jpeg",
    info: "loremdaddkkrrfawdwooeoeoecp34-r-sddqwewdsffvdslwerf;dsdewlfgmgtjigeropsfd'asaelellelelelleekftr",
  },
  {
    id: 2,
    name: "Tshirt",
    price: "20$",
    image: "../src/assets/tshirt.jpeg",
    info: "loremdaddkkrrfawdwooeoeoecp34-r-sddqwewdsffvdslwerf;dsdewlfgmgtjigeropsfd'asaelellelelelleekftr",
  },
  {
    id: 3,
    name: "shirt",
    price: "40$",
    image: "../src/assets/shirt.jpeg",
    info: "loremdaddkkrrfawdwooeoeoecp34-r-sddqwewdsffvdslwerf;dsdewlfgmgtjigeropsfd'asaelellelelelleekftr",
  },
  {
    id: 4,
    name: "gloves",
    price: "50$",
    image: "../src/assets/gloves.jpeg",
    info: "loremdaddkkrrfawdwooeoeoecp34-r-sddqwewdsffvdslwerf;dsdewlfgmgtjigeropsfd'asaelellelelelleekftr",
  },
  {
    id: 5,
    name: "socks",
    price: "50$",
    image: "../src/assets/socks.jpeg",
    info: "loremdaddkkrrfawdwooeoeoecp34-r-sddqwewdsffvdslwerf;dsdewlfgmgtjigeropsfd'asaelellelelelleekftr",
  },
]);
</script>

<style lang="scss">
.header {
  background: url(../assets/hero.jpg);
  height: 400px;
  width: 100%;
  // display: flex;
}
.categories {
  padding: 20px;
  .categories ul {
    list-style: none;
    padding: 0;
    .categories li {
      margin: 5px 0;
    }
  }
}
.droplayout {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
}
.title {
  color: rgb(77, 73, 73);
  justify-content: space-between;
  padding: 30px;
  h4 {
    margin: 0%;
  }
}
.product {
  display: flex;
  flex-wrap: wrap;
  // align-items: flex-end;
  justify-content: space-between;
  gap: 1em;
  padding: 30px;
}

///////////////// TODO:    dark theme
body.body--dark {
  .header {
    background: url(../assets/hero.jpg);
    background-blend-mode: darken;
    background-color: rgba(0, 0, 0, 0.5);
    background-size: cover;
    background-position: center;
  }

  .title {
    color: #f0f0f0;
    background-color: #121212ec ;

    h4 {
      color: inherit;
    }
  }

  .product {
    background-color: #121212;
    color: #e0e0e0;
  }

  .categories {
    background-color: #1a1a1a;

    ul {
      li {
        color: #bbbbbb;
      }
    }
  }
}
</style>
