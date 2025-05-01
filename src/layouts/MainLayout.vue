<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #fffaf0">
    <section id="header">
      <div style="cursor: pointer; justify-content: ">
        <q-btn
          flat
          round
          icon="brightness_4"
          @click="toggleDarkMode"
          padding="20px"
        />
        <router-link class="home" to="/">home</router-link>
        <q-btn
          flat
          v-if="userRole === 'admin'"
          label="Admin Panel"
          class="cart"
          @click="goToAdminPanel"
          margin="20px"
        />
      </div>

      <div>
        <ul class="navbar">
          <li>
            <router-link to="/products">products</router-link>
          </li>
          <li><router-link class="cart" to="/cart">cart</router-link></li>
          <li>
            <router-link class="checkout" to="/checkout">checkout</router-link>
          </li>
          <li v-if="token">
            <q-btn flat color="secondary" label=" profile">
              <q-menu auto-close>
                <q-list style="min-width: 100px">
                  <q-item clickable @click.stop="edit = true">
                    <q-item-section>
                      <q-btn> Edit Profile </q-btn>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <q-btn @click="logOut"> log out</q-btn>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </li>
          <li v-if="!token">
            <q-btn class="signin" label="sign in" @click="prompt = true" />
          </li>
          <li v-if="!token">
            <q-btn class="signin" label="sign up" @click="signupModal = true" />
          </li>
        </ul>
      </div>

      <q-dialog v-model="edit">
        <profile />
      </q-dialog>

      <!-- Sign In Dialog -->
      <q-dialog v-model="prompt">
        <SignIn />
      </q-dialog>

      <!-- Sign Up Dialog -->
      <q-dialog v-model="signupModal">
        <SignUp />
      </q-dialog>
    </section>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import profile from "src/components/profilePage.vue";
import SignIn from "src/pages/SignIn.vue";
import signUp from "src/pages/signUp.vue";
import { ref, onMounted } from "vue";
import { useQuasar, Dark } from "quasar";
import SignUp from "src/pages/signUp.vue";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
const router = useRouter();
const token = localStorage.getItem("token");

const userRole = ref(null);

const $q = useQuasar();

// Dialog state
const prompt = ref(false);
const signupModal = ref(false);
const edit = ref(false);

const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/";
};

const toggleDarkMode = () => {
  const newDarkMode = !Dark.isActive;
  Dark.set(newDarkMode);
  localStorage.setItem("darkMode", newDarkMode);
};
onMounted(() => {
  const darkMode = localStorage.getItem("darkMode") === "true";
  Dark.set(darkMode);
});

const fetchUserRole = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    userRole.value = user?.role;
  } catch (err) {
    console.error("Failed to fetch user role", err);
  }
};

const goToAdminPanel = () => {
  router.push("/admin");
};

onMounted(fetchUserRole);
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
    cursor: pointer;
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
}
//////////////////  dark style

body.body--dark {
  #header {
    background-color: #1e1e1e;
    box-shadow: 0 15px 15px rgba(255, 255, 255, 0.06);
    border-bottom: #333 5px solid;

    .navbar {
      color: #e0e0e0;

      .signin {
        background-color: #4caf50;
        border: #388e3c solid 3px;
        color: #ffffff;
      }
    }

    .navbar li a,
    .home {
      color: #cccccc;
    }

    .navbar li a:hover,
    .navbar li a.active {
      color: #66ffcc;
    }
  }

  q-layout {
    background-color: #121212 !important;
  }

  q-page-container {
    background-color: #121212;
    color: #e0e0e0;
  }
}
</style>
