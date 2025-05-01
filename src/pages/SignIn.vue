<template>
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
      <div class="text-h6 text-center text-black">Sign In</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <!-- <q-input
        dense
        v-model="username"
        label="Name"
        color="black"
        autofocus
        class="q-mb-sm"
        input-style="background-color: white; border-radius: 8px"
      />

      <q-input
        dense
        v-model="password"
        label="Password"
        color="black"
        type="password"
        input-style="background-color: white; border-radius: 8px"
      />

      <q-input
        dense
        v-model="confirmPassword"
        label="Confirm Password"
        color="black"
        type="password"
        input-style="background-color: white; border-radius: 8px"
      /> -->
      <br />
      <q-input color="green-8" v-model="username" label="youname" filled>
      </q-input>
      <br />
      <q-input
        color="green-8"
        v-model="password"
        label="password"
        filled
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <!--
      <q-input color="green-8" v-model="confirmPassword" label="confirm your Password" filled :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input> -->
    </q-card-section>

    <q-card-actions
      align="right"
      class="text-black"
      style="background-color: #e6fffa; border-top: 1px solid #98f5e1"
    >
      <q-btn flat label="Cancel" color="black" v-close-popup />
      <q-btn flat label="Sign In" color="mint" @click="login" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const router = useRouter();
const username = ref("");
const name = ref("");
const password = ref("");
const isPwd = ref(true);

const login = async () => {
  if (!username.value || !password.value) {
    $q.notify({
      type: "negative",
      message: "All fields are required.",
    });
    return;
  }

  if (password.value.length < 8) {
    $q.notify({
      type: "negative",
      message: "Password must be at least 8 characters long.",
    });
    return;
  }

  try {
    const res = await api.post("/auth/login", {
      username: username.value, // ✅ try this
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    $q.notify({
      type: "positive",
      message: "Logged in successfully!",
    });

    window.location.href = "/product";
  } catch (err) {
    console.error(err);
    $q.notify({
      type: "negative",
      message: "Login failed. Please check your credentials.",
    });
  }
};
</script>
