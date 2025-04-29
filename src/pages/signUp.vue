<template>
  <q-card
    style="min-width: 350px; background-color: #f0fff4; border: 2px solid #98f5e1; border-radius: 16px;"
  >
    <q-card-section style="background-color: #c6f6d5; border-bottom: 1px solid #98f5e1">
      <div class="text-h6 text-center text-black">Create an Account</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input color="green-8" v-model="username" label="Your Name" filled />
      <br />
      <q-input color="green-8" v-model="email" label="Email" filled />
      <br />
      <q-input
        color="green-8"
        v-model="password"
        label="Password"
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
      <br />
      <q-input
        color="green-8"
        v-model="confirm"
        label="Confirm Password"
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
    </q-card-section>

    <q-card-actions align="right" class="text-black" style="background-color: #e6fffa; border-top: 1px solid #98f5e1">
      <q-btn flat label="Cancel" color="black" v-close-popup />
      <q-btn flat label="Create Account" color="mint" @click="signup" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const $q = useQuasar();
const username = ref("");
const email = ref("");
const password = ref("");
const confirm = ref("");
const isPwd = ref(true);

const signup = async () => {
  if (password.value.length < 8) {
    $q.notify({ type: "negative", message: "Password must be at least 8 characters long." });
    return;
  }

  if (!confirm.value) {
    $q.notify({ type: "negative", message: "Please confirm your password." });
    return;
  }

  if (password.value !== confirm.value) {
    $q.notify({ type: "negative", message: "Passwords do not match." });
    return;
  }

  try {
    // 1. Signup the user
    await api.post("/auth/signup", {
      username: username.value,
      password: password.value,
      email: email.value,
    });

    // 2. Then login immediately
    const res = await api.post("/auth/login", {
      username: username.value,
      password: password.value,
    });

    // 3. Save the token to localStorage
    localStorage.setItem("token", res.data.token);

    $q.notify({
      type: "positive",
      message: "Signed up and logged in successfully!",
    });

    // 4. Redirect to home page
    window.location.href = "/";
  } catch (err) {
    console.error("Signup/Login error:", err);
    $q.notify({
      type: "negative",
      message: err.response?.data?.message || "Signup/Login failed. Please try again.",
    });
  }
};
</script>
