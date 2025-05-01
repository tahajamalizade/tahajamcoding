<template>
  <q-dialog >
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ isUserEdit ? "Edit User" : "Add User" }}</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="userForm.name" label="Name" color="secondary" />
        <q-input
          v-model="userForm.email"
          label="Email"
          type="email"
          color="secondary"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn color="secondary" label="Save" @click="saveUser" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const isProductModalOpen = ref(false);

function saveUser() {
  if (isUserEdit.value) {
    users.value[selectedUserIndex.value] = {
      ...userForm.value,
      id: users.value[selectedUserIndex.value].id,
    };
  } else {
    users.value.push({ ...userForm.value, id: Date.now() });
  }
  isUserModalOpen.value = false;
}
</script>
