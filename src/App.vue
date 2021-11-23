<template>
  <v-app>
    <v-app-bar app color="white" fixed >
      <div class="d-flex align-center">
        <v-img src="./assets/lacartera.svg" max-width="50%"  ></v-img>
      </div>

      <v-spacer></v-spacer>
      <v-btn text to="/">Mis Carteras</v-btn>
      <v-btn text to="/calculadora-letras">Calculadora de Letras</v-btn>

      <div v-if="currentUser">
        <v-btn text color="success" to="/profile">{{ currentUser.correo }}</v-btn>
        <v-btn text color="success" @click.prevent="logout">CERRAR SESIÓN</v-btn>
      </div>
      <div v-else>
        <v-btn text color="success" @click.prevent="login">INICIAR SESIÓN</v-btn>
      </div>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed:{
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },

  components: {
  },

  data: () => ({
  }),
  methods:{
    logout(){
      this.$store.dispatch('auth/logout');
      this.$router.push({name:'login'})
    },
    login(){
      this.$router.push({name:'login'})
    }
  }
};
</script>
