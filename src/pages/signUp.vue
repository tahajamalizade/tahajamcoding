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
      <div class="text-h6 text-center text-black">Create an Account</div>
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
        @keyup.enter="signup"
      />

      <q-input
        dense
        v-model="email"
        label="email"
        color="black"
        type="text"
        input-style="background-color: white; border-radius: 8px"
        @keyup.enter="signup"
      />
      <q-input
        dense
        v-model="password"
        label="Password"
        color="black"
        type="password"
        input-style="background-color: white; border-radius: 8px"
        @keyup.enter="signup"
      />
      <q-input
        dense
        v-model="confirm"
        label="Confirm Password"
        color="black"
        type="password"
        input-style="background-color: white; border-radius: 8px"
        @keyup.enter="signup"
      /> -->
      <br />
      <q-input color="green-8" v-model="username" label="youname" filled>
      </q-input>
      <br />
      <q-input color="green-8" v-model="email" label="email" filled> </q-input>
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
      <br />
      <q-input
        color="green-8"
        v-model="confirm"
        label="confirm your password"
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

    <q-card-actions
      align="right"
      class="text-black"
      style="background-color: #e6fffa; border-top: 1px solid #98f5e1"
    >
      <q-btn flat label="Cancel" color="black" v-close-popup />
      <q-btn flat label="Create Account" color="mint" @click="signup" />
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
const password = ref("");
const confirm = ref("");
const email = ref("");
const isPwd = ref(true);

const signup = async () => {
  if (password.value.length < 8) {
    $q.notify({
      type: "negative",
      message: "Password must be at least 8 characters long.",
    });
    return;
  }
  // if (confirm.value === "") {
  //   $q.notify({
  //     type: "negative",
  //     message: "please confirm the password.",
  //   });
  // }
  if (confirm.value === "") {
    $q.notify({
      type: "negative",
      message: "Please confirm the password.",
    });
    return; // <- this was missing
  }

  if (password.value !== confirm.value) {
    $q.notify({
      type: "negative",
      message: "Passwords do not match.",
    });
    return;
  }

  try {
    const res = await api.post("/auth/signup", {
      username: username.value,
      password: password.value,
      email: email.value,
    });

    console.log("response: ", res.data);

    localStorage.setItem("token", res.data.token);

    $q.notify({
      type: "positive",
      message: "Logged in successfully!",
    });

    window.location.href = "/";
  } catch (err) {
    console.error(err);
    $q.notify({
      type: "negative",
      message:
        err.response?.data?.message || "Signup failed. Please try again.",
    });
  }
};
</script>
