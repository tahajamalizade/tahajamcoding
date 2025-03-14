<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #fffaf0w;">
    <section id="header">
      <div style="cursor: pointer">
        <router-link class="home" to="/">home</router-link>
      </div>

      <div>
        <ul class="navbar">
          <li style="padding: 0px">
            <router-link class="product" to="/products">products</router-link>
          </li>
          <li><router-link class="cart" to="/cart">cart</router-link></li>
          <li>
            <router-link class="checkout" to="/checkout">checkout</router-link>
          </li>
          <li>
            <router-link class="signin" to="/signIn">Sign In</router-link>
          </li>
        </ul>
      </div>
    </section>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss">
body {
  width: 100%;
}

#header {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px;
  background-color: #dce9dc;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.06);
  border-bottom: #e0e0e0 5px solid;
  border-radius: 5px;
  height: 60px;
  over .home {
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    transition: 0.8s ease;
    cursor: pointer;
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    .signin {
      background-color: #83f28f;
      padding: 5px;
      border: #52d46863 solid 3px;
      border-radius: 15px;
    }
  }

  .navbar li {
    list-style: none;
    padding: 0px 20px;
    position: relative;
  }
  .navbar li a,
  .home {
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    transition: 0.8s ease;
    cursor: pointer;
  }
  .navbar li a:hover,
  .navbar li a.active {
    color: #088178;
  }

  // .navbar li a.active::after,
  // .navbar li a:hover::after {
  //   content: "";
  //   width: 30%;
  //   height: 2px;
  //   background-color: #000000;
  //   position: absolute;
  //   bottom: -4px;
  //   left: 20px;
  // }
}
</style>
