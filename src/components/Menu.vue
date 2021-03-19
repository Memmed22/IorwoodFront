<template>

  <v-bottom-navigation v-model="value"
  
  grow
  tile
  width="70%"
  >
    <v-btn value="recent" height="100%">
      <span>Recent</span>

      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites" height="100%">
      <span>Favorites</span>

      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby" height="100%">
      <span>Nearby</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    data: () => ({ value: 'recent' }),
  }
</script>