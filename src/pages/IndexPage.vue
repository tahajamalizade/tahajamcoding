<template>
  <q-page>
    <header>
      <div class="header"></div>
    </header>
    <div class="droplayout">
      <dropDown></dropDown>
      <dropDown></dropDown>
      <dropDown></dropDown>
    </div>
    <div class="title"><h4>new products</h4></div>

    <div class="product">
      <ProductCart></ProductCart>
     
    </div>
  </q-page>
</template>

<script>
import dropDown from "/home/taha/Documents/shopesite2/src/components/dropDown.vue";
import ProductCart from "/home/taha/Documents/shopesite2/src/components/ProductCart.vue";
export default {
  name: "IndexPage",
  components: {
    dropDown,
    ProductCart,
  },
};
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
</style>
