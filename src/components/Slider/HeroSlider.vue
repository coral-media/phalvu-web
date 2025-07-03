<template>
  <v-carousel
    height="800"
    hide-delimiters
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :aspect-ratio="16/9"
      cover
      gradient="180deg,
      rgba(13, 20, 32, 0.45) 0%,
      rgba(13, 20, 33, 0.9) 80%,
      #0d1421 100%"
      :src="item.src"
    >
      <v-container class="carousel-content">
        <h2>Movie Title</h2>
        <p>Movie Content Lorem Lorem</p>
      </v-container>
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts" setup>

  const items = [
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    },
  ]
</script>

<style lang="scss" scoped>
@import "src/styles/variables";
.v-carousel {

}
.v-carousel-item {

}

.carousel-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
  @media screen and (max-device-width: 480px) {
  }
}
</style>
