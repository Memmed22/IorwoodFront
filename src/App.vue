<template>

  <v-app >
  <layout></layout>
 </v-app>
</template>

<script>
import layout from './components/Layout.vue';

export default {
  name: 'App',

  components: {
    layout,
  },

  data: () => ({
    //
  }),
};
</script>