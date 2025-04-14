<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <q-tabs v-model="activeTab" class="text-black" align="left">
          <q-tab name="users" label="User Management" />
          <q-tab name="products" label="Product Management" />
        </q-tabs>
      </q-card-section>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <!-- User Management Panel -->
        <q-tab-panel name="users">
          <q-card-section>
            <div class="row justify-between items-center">
              <div class="text-h6">User Management</div>
              <q-btn
                color="secondary"
                label="Add User"
                @click="openUserModal()"
              />
            </div>
          </q-card-section>

          <q-card-section>
            <q-table :rows="users" :columns="userColumns" row-key="id">
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    color="green-6"
                    dense
                    icon="edit"
                    flat
                    @click="openUserModal(props.row, props.rowIndex)"
                  />
                  <q-btn
                    color="red-6"
                    dense
                    icon="delete"
                    flat
                    @click="deleteUser(props.rowIndex)"
                  />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-tab-panel>

        <!-- Product Management Panel -->
        <q-tab-panel name="products">
          <q-card-section>
            <div class="row justify-between items-center">
              <div class="text-h6">Product Management</div>
              <q-btn
                color="secondary"
                label="Add Product"
                @click="openProductModal()"
              />
            </div>
          </q-card-section>

          <q-card-section>
            <q-table :rows="products" :columns="productColumns" row-key="id">
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    color="green-6"
                    dense
                    icon="edit"
                    flat
                    @click="openProductModal(props.row, props.rowIndex)"
                  />
                  <q-btn
                    color="red-6"
                    dense
                    icon="delete"
                    flat
                    @click="deleteProduct(props.rowIndex)"
                  />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <!-- User Modal -->
    <q-dialog v-model="isUserModalOpen">
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

    <!-- Product Modal -->
    <q-dialog v-model="isProductModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ isProductEdit ? "Edit Product" : "Add Product" }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="productForm.name"
            label="Product Name"
            color="secondary"
          />
          <q-input
            v-model="productForm.price"
            label="Price"
            type="number"
            color="secondary"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="secondary" label="Save" @click="saveProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref("users");

// ===== USERS =====
const users = ref([
  { id: 1, name: "taha jam", email: "jam@example.com" },
  { id: 2, name: "agha abolfazl", email: "agha@example.com" },
]);

const isUserModalOpen = ref(false);
const isUserEdit = ref(false);
const userForm = ref({ name: "", email: "" });
const selectedUserIndex = ref(null);

const userColumns = [
  { name: "name", label: "Name", field: "name", align: "left" },
  { name: "email", label: "Email", field: "email", align: "left" },
  { name: "actions", label: "Actions", field: "actions", align: "right" },
];

function openUserModal(user = null, index = null) {
  isUserEdit.value = !!user;
  selectedUserIndex.value = index;
  userForm.value = user ? { ...user } : { name: "", email: "" };
  isUserModalOpen.value = true;
}

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

function deleteUser(index) {
  users.value.splice(index, 1);
}

// ===== PRODUCTS =====
const products = ref([
  { id: 1, name: "t-shirt", price: 50 },
  { id: 2, name: "soocks", price: 80 },
]);

const isProductModalOpen = ref(false);
const isProductEdit = ref(false);
const productForm = ref({ name: "", price: null });
const selectedProductIndex = ref(null);

const productColumns = [
  { name: "name", label: "Product Name", field: "name", align: "left" },
  { name: "price", label: "Price", field: "price", align: "left" },
  { name: "actions", label: "Actions", field: "actions", align: "right" },
];

function openProductModal(product = null, index = null) {
  isProductEdit.value = !!product;
  selectedProductIndex.value = index;
  productForm.value = product ? { ...product } : { name: "", price: null };
  isProductModalOpen.value = true;
}

function saveProduct() {
  if (isProductEdit.value) {
    products.value[selectedProductIndex.value] = {
      ...productForm.value,
      id: products.value[selectedProductIndex.value].id,
    };
  } else {
    products.value.push({ ...productForm.value, id: Date.now() });
  }
  isProductModalOpen.value = false;
}

function deleteProduct(index) {
  products.value.splice(index, 1);
}
</script>
