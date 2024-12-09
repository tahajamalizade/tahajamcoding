<template>
    <div class="q-pa-md">
      <q-btn-dropdown color="dark" label="Dropdown Button" class="border-radius">
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>messi</q-item-label>
            </q-item-section>
          </q-item>
  
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>adidas</q-item-label>
            </q-item-section>
          </q-item>
  
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>neymar</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </template>

  <script>
export default {
  setup () {
    return {
      onItemClick () {
        // console.log('Clicked on an Item')
      }
    }
  }
}
</script>