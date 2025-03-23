<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">User Management</div>
          <q-btn color="secondary" label="Add User" @click="openModal()" />
        </div>
      </q-card-section>

      <q-card-section>
        <q-table :rows="users" :columns="columns" row-key="id">
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn color="green-6" dense icon="edit" flat @click="openModal(props.row, props.rowIndex)" />
              <q-btn color="red-6" dense icon="delete" flat @click="deleteUser(props.rowIndex)" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <q-dialog v-model="isModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ isEdit ? 'Edit User' : 'Add User' }}</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.name" label="Name" color="secondary" />
          <q-input v-model="form.email" label="Email" type="email" color="secondary" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="secondary" label="Save" @click="saveUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
  { id: 1, name: 'taha jam', email: 'jam@example.com' },
  { id: 2, name: 'agha abolfazl', email: 'agha@example.com' },
]);

const isModalOpen = ref(false);
const isEdit = ref(false);
const selectedIndex = ref(null);
const form = ref({ name: '', email: '' });

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'right' },
];

function openModal(user = null, index = null) {
  isEdit.value = !!user;
  selectedIndex.value = index;
  form.value = user ? { ...user } : { name: '', email: '' };
  isModalOpen.value = true;
}

function saveUser() {
  if (isEdit.value) {
    users.value[selectedIndex.value] = { ...form.value, id: users.value[selectedIndex.value].id };
  } else {
    users.value.push({ ...form.value, id: Date.now() });
  }
  isModalOpen.value = false;
}

function deleteUser(index) {
  users.value.splice(index, 1);
}
</script>
