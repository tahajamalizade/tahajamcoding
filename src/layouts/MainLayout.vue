<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #fffaf0">
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
            <q-btn class="signin" label="sign in" @click="prompt = true" />
          </li>
          <li>
            <q-btn class="signin" label="sign up" @click="signupModal = true" />
          </li>
        </ul>
      </div>
      <q-dialog v-model="prompt" persistent>
        <q-card
          style="
            min-width: 350px;
            background-color: #f0fff4;
            border: 2px solid #98f5e1;
            border-radius: 16px;
          "
        >
          <q-card-section
            style="background-color: #c6f6d5; border-bottom: 1px solid #98f5e1"
          >
            <div class="text-h6 text-center text-black">have an acount?</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="name"
              label="Name"
              color="black"
              autofocus
              class="q-mb-sm"
              input-style="background-color: white; border-radius: 8px"
              @keyup.enter="prompt = false"
            />

            <q-input
              dense
              v-model="email"
              label="Email"
              color="black"
              input-style="background-color: white; border-radius: 8px"
              @keyup.enter="prompt = false"
            />
          </q-card-section>

          <q-card-actions
            align="right"
            class="text-black"
            style="background-color: #e6fffa; border-top: 1px solid #98f5e1"
          >
            <q-btn flat label="Cancel" color="black" v-close-popup />
            <q-btn flat label="Sign In" color="mint" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- TODO: -->
      <q-dialog v-model="signupModal" persistent>
        <q-card
          style="
            min-width: 350px;
            background-color: #f0fff4;
            border: 2px solid #98f5e1;
            border-radius: 16px;
          "
        >
          <q-card-section
            style="background-color: #c6f6d5; border-bottom: 1px solid #98f5e1"
          >
            <div class="text-h6 text-center text-black">Create an Account</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="name"
              label="Name"
              color="black"
              autofocus
              class="q-mb-sm"
              input-style="background-color: white; border-radius: 8px"
              @keyup.enter="signup = false"
            />

            <q-input
              dense
              v-model="email"
              label="Email"
              color="black"
              input-style="background-color: white; border-radius: 8px"
              @keyup.enter="signup = false"
            />
          </q-card-section>

          <q-card-actions
            align="right"
            class="text-black"
            style="background-color: #e6fffa; border-top: 1px solid #98f5e1"
          >
            <q-btn flat label="Cancel" color="black" v-close-popup />
            <q-btn flat label="Create Account" color="mint" @click="signup" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </section>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { api } from "src/boot/axios";

const router = useRouter();

// ✅ Declare the reactive properties
const prompt = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");

// TODO:
const signupModal = ref(false);

const signup = async () => {
  try {
    await api.post("/auth/signup", {
      username: name.value,
      email: email.value,
      password: password.value,
    });
  } catch (err) {
    console.error(err);
    alert("Signup failed");
  }
};
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
