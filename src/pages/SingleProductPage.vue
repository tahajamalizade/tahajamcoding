<template>
  <q-page>
    <div class="page">
      <div class="photoslider">
        <q-carousel
          class="photos"
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
        >
          <q-carousel-slide
            :name="1"
            img-src="src/assets/sweeter/swaterrr.jpeg"
          />
          <q-carousel-slide
            :name="3"
            img-src="src/assets/sweeter/wwwwww.jpeg"
          />
        </q-carousel>
      </div>
      <div class="info">
        <h4 style="margin: 0px">Peanut Long Sleave</h4>
        <br />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa aliquam
          quam ullam. Doloribus voluptates impedit ipsum. Voluptate voluptatum
          asperiores enim soluta aliquam libero, quos cum, iusto saepe illo
          nostrum dicta quia deserunt, in quisquam eius repellat vero minima
          illum officiis eaque iure architecto praesentium. Vitae possimus nam
          minus fuga iste debitis aliquam pariatur, dolores voluptate,
          molestias, magnam consequatur quae corporis tempora repudiandae
          aperiam nobis magni! Id provident, delectus non quidem eum pariatur a
          quo officiis officia, hic alias nemo voluptatem necessitatibus
          dignissimos enim aperiam dolor? Repellat voluptates architecto ratione
          blanditiis? Iste repellendus dolorum amet, a dolore ut iure. Eveniet,
          unde.
        </p>
        <br />
        <h5 style="margin: 0%">133$</h5>

        <br />
        <q-btn align="center" class="btn-fixed-width" label="Align to right" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const slide = ref(1);
</script>

<style lang="scss">
.page {
  display: flex;
  justify-content: space-evenly;

  .photoslider {
    width: 600px;
    height: 400px;
    margin: 30px;
    padding: 0px;
  }

  .info {
    float: right;
    width: 600px;
    height: 400px;
    padding: 30px;
    .btn-fixed-width {
      width: 200px;
      background-color: #7fcfa8;
    }
  }
}
</style>
