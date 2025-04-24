<template>
  <q-card class="q-pa-md" style="width: 100%; max-width: 600px">
    <q-card-section class="row items-center q-gutter-md justify-center">
      <q-avatar size="100px"> </q-avatar>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-form @submit.prevent="saveProfile">
        <q-input
        color="purple-12"
          v-model="user.name"
          label="Name"
          :readonly="!isEditing"
          filled
        />
        <q-input
        color="purple-12"
          v-model="user.email"
          label="Email"
          :readonly="!isEditing"
          filled
          type="email"
        />

        <div class="q-mt-md row justify-center q-gutter-sm">
          <q-btn
            v-if="!isEditing"
            label="Edit Profile"
            color="secondary"
            icon="edit"
            @click="isEditing = true"
          />
          <q-btn
            v-else
            label="Save"
            type="submit"
            color="secondary"
            icon="save"
          />
          <q-btn
            v-if="isEditing"
            label="Cancel"
            color="negative"
            flat
            @click="cancelEdit"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const $q = useQuasar();

const defaultAvatar =
  "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg";

const user = ref({
  name: "",
  email: "",
});
let originalUser = {};

const isEditing = ref(false);


async function saveProfile() {
  console.log("Saving profile...", user.value);

  try {
    await api.put("/auth/updateProfile", {
      name: user.value.name,
      email: user.value.email,
    });
    originalUser = { ...user.value };
    isEditing.value = false;
  } catch (err) {
    console.error("Failed to save profile:", err);
  }
}

function cancelEdit() {
  user.value = { ...originalUser };
  isEditing.value = false;
}
</script>
