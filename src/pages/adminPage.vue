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
        <!-- FIXME: User Management Panel -->
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
                    @click="deleteUser(props.row._id)"
                  />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-tab-panel>

        <!-- TODO: Product Management Panel -->
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
                    @click="deleteProduct(props.row._id)"
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
          <q-input v-model="userForm.username" label="Name" color="secondary" />
          <q-input
            v-model="userForm.email"
            label="Email"
            type="email"
            color="secondary"
          />
          <q-input v-model="userForm.role" label="Role" color="secondary" />
          <q-input
            v-model="userForm.password"
            label="Password"
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
          <q-input
            v-model="productForm.category"
            label="category"
            color="secondary"
          />
          <q-input
            v-model="productForm.stock"
            label="stock"
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
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const activeTab = ref("users");

const products = ref([]);

const users = ref([]);

// ===== USERS =====

const isUserModalOpen = ref(false);
const isUserEdit = ref(false);
const userForm = ref({ username: "", email: "", password: "", role: "" });
const selectedUserIndex = ref(null);

const userColumns = [
  { name: "username", label: "Name", field: "username", align: "left" },
  { name: "email", label: "Email", field: "email", align: "left" },
  { name: "role", label: "Role", field: "role", align: "left" },
  { name: "actions", label: "Actions", field: "actions", align: "right" },
];

onMounted(async () => {
  try {
    const res = await api.get("/admin/getalluser", {});

    res.data.sort((a, b) => {
      if (a.role === "admin" && b.role !== "admin") return -1;
      if (a.role !== "admin" && b.role === "admin") return 1;
      return 0; // keep original order for same role
    });

    users.value = res.data;
  } catch (err) {
    console.error("Error loading user:", err);
  }
});

function openUserModal(user = null, index = null) {
  isUserEdit.value = !!user;
  selectedUserIndex.value = index;
  userForm.value = user
    ? { ...user }
    : { username: "", email: "", password: "", role: "" };
  isUserModalOpen.value = true;
}

const saveUser = async () => {
  try {
    if (isUserEdit.value) {
      users.value[selectedUserIndex.value] = {
        ...userForm.value,
        _id: users.value[selectedUserIndex.value]._id, // keep _id consistent
      };

      await api.put(
        `/admin/editUser/${users.value[selectedUserIndex.value]._id}`,
        {
          username: userForm.value.username,
          email: userForm.value.email,
          role: userForm.value.role,
          password: userForm.value.password,
        }
      );
    } else {
      // Add new product locally
      const newUser = { ...userForm.value };
      users.value.push(newUser);

      // Make POST request to backend
      await api.post("/admin/creatUser", newUser);
    }

    isUserModalOpen.value = false;
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (id) => {
  try {
    await api.delete(`/admin/deletUser/${id}`);
    users.value = users.value.filter((user) => user._id !== id);
  } catch (error) {
    console.error(error);
  }
};

const isProductModalOpen = ref(false);
const isProductEdit = ref(false);
const productForm = ref({ name: "", price: null, stock: null, category: "" });
const selectedProductIndex = ref(null);

const productColumns = [
  { name: "name", label: "Product Name", field: "name", align: "left" },
  { name: "price", label: "Price", field: "price", align: "left" },
  { name: "category", label: "category", field: "category", align: "left" },
  { name: "stock", label: "stock", field: "stock", align: "left" },
  { name: "actions", label: "Actions", field: "actions", align: "right" },
];

function openProductModal(product = null, index = null) {
  isProductEdit.value = !!product;
  selectedProductIndex.value = index;
  productForm.value = product ? { ...product } : { name: "", price: null };
  isProductModalOpen.value = true;
}

onMounted(async () => {
  try {
    const res = await api.get("/products", {});
    products.value = res.data;
  } catch (err) {
    console.error("Error loading products:", err);
  }
});

const saveProduct = async () => {
  try {
    if (isProductEdit.value) {
      // Update local array
      products.value[selectedProductIndex.value] = {
        ...productForm.value,
        _id: products.value[selectedProductIndex.value]._id, // keep _id consistent
      };

      // Make PUT/PATCH request to update backend
      await api.put(
        `/products/${products.value[selectedProductIndex.value]._id}`,
        {
          name: productForm.value.name,
          price: productForm.value.price,
          category: productForm.value.category,
          stock: productForm.value.stock,
        }
      );
    } else {
      // Add new product locally
      const newProduct = { ...productForm.value, id: Date.now() };
      products.value.push(newProduct);

      // Make POST request to backend
      await api.post("/products/create", newProduct);
    }

    isProductModalOpen.value = false;
  } catch (err) {
    console.error(err);
  }
};

const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    products.value = products.value.filter((product) => product._id !== id);
  } catch (error) {
    console.error(error)
  }
};
</script>

