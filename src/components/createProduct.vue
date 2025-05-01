<template>
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
</template>

<script setup>
import { ref } from "vue";

const isProductModalOpen = ref(false);

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




</script>
