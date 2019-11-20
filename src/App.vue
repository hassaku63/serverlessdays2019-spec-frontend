<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>S.P.E.C</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn> -->
      
      <v-btn text small text-none>
        <router-link v-bind:to="{name: 'home'}" tag="pre">Home</router-link>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style scpoed>

</style>

<script>
export default {
  name: 'App',
  components: {
    
  },
  data: () => ({
    //
  }),
};
</script>
