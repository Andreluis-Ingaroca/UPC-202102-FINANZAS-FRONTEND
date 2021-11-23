<template>
  <v-app>
    <body>
    <main>
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <form action="index.html" autocomplete="off" class="sign-in-form">
              <div class="logo">
                <img src="../assets/lacartera.svg" alt="Lacartera">
              </div>
              <div class="heading">
                <h2>Bienvenido</h2>
                <h6>No tienes cuenta?</h6>
                <a href="#" class="toggle">Regístrate</a>
              </div>
              <div class="actual-form">
                <div class="input-wrap">

                  <v-text-field v-model="usuario.correo"
                                label="Correo"
                                class="input-field"
                                required>
                  </v-text-field>
                </div>
                <div class="input-wrap">


                  <v-text-field v-model="usuario.contraseña"
                                label="Contraseña"
                                type="password"
                                class="input-field"
                                required>
                  </v-text-field>
                </div>

                <v-btn color="black"
                       class="sign-btn"
                       @click="handleLogin">
                  INICIAR SESION
                </v-btn>

                <p class="text">
                  Este proyecto fue desarrollado por alumnos
                  de la UPC para el curso de Finanzas e
                  Ingeniería Económica.
                </p>
              </div>
            </form>
            <form action="index.html" autocomplete="off" class="sign-up-form">
              <div class="logo">
                <!--              <img src="./img/Logo.svg" alt="Lacartera">-->
                <img src="../assets/lacartera.svg" alt="Lacartera">
              </div>
              <div class="heading">
                <h2>Empecemos</h2>
                <h6>Ya tienes cuenta?</h6>
                <a href="#" class="toggle">Inicia Sesión</a>
              </div>

              <div class="actual-form">
                <div class="input-wrap">
                  <v-text-field v-model="toSavePerfil.nombre"
                                label="Nombre"
                                class="input-field"
                                required>
                  </v-text-field>
                </div>
                <div class="input-wrap" style="display: flex; flex-direction: row" >

                    <v-text-field v-model="toSavePerfil.doi"
                                label="Doi"
                                class="input-field"
                                required>

                  </v-text-field>
                   <v-tooltip
                      v-model="show"
                      top
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn

                          icon
                          v-bind="attrs"
                          v-on="on"
                          style="margin-left: 85%"
                      >
                        <v-icon color="#299856">
                          mdi-information
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Documento de Identidad</span>
                  </v-tooltip>

                </div>
                <div class="input-wrap">
                  <v-text-field v-model="newUsuario.correo"
                                label="Correo"
                                class="input-field"
                                required>
                  </v-text-field>
                </div>
                <div class="input-wrap">
                  <v-text-field v-model="newUsuario.contraseña"
                                label="Contraseña"
                                class="input-field"
                                type="password"
                                required>
                  </v-text-field>
                </div>


                <v-btn color="black"
                       class="sign-btn"
                       @click="handlerRegister">
                  REGISTRARME
                </v-btn>
                <p class="text">
                  Este proyecto fue desarrollado por alumnos
                  de la UPC para el curso de Finanzas e
                  Ingeniería Económica.
                </p>
              </div>
            </form>
          </div>

          <div class="carousel">
            <div class="images-wrapper">
              <!--            <img src="./img/Dinero.svg" class="image img-1 show" alt="">-->
              <img src="../assets/Dinero.svg" alt="Dinero">
            </div>

            <div class="text-slider">
              <div class="text-group">
                <h2>Administra tu cartera de <br>descuentos de letras</h2>
                <hr style="margin-top:4.5%;height: 3px;border:none;color:white;background-color:white;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </body>
  </v-app>
</template>

<script>
import Usuario from "@/models/usuario";
import Perfil from "@/models/perfil";
import UsuariosApiService from "@/services/usuarios-api.service";

export default {
  name: "login",
  data(){
    return{
      usuario : new Usuario("","",""),
      newUsuario : new Usuario("","",""),
      toSavePerfil : new Perfil("","",""),
      valid: true,
      correo: '',
      contraseña : '',
      perfilId: 0,
    }
  },
  computed:{
    loggedIn(){
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    }
  },
  created(){
    if(this.loggedIn){
      this.$router.push({name: 'carteras-registradas'});
    }
  },
  methods :{
    handleLogin(){
      if (!this.valid){
        console.log('Invalid');
        return;
      }
      if (this.usuario.correo && this.usuario.contraseña){
        console.log('Starting Request');
        this.$store.dispatch('auth/login',this.usuario).then(
            (data)=>{
              console.log('Logged In');
              console.log(data);
              this.$router.push({name:'cartera-registradas'});
            },
            error=>{
              console.log('Error');
              this.loading = false;
              this.message = (error.response && error.response.data)
                  || error.message || error.toString();
            }
        )
      }
    },
    handlerRegister(){
      this.message ='';
      console.log(this.newUsuario);
      if(this.valid){
        this.$store.dispatch('auth/register',this.newUsuario).then(
            data=>{
              this.message=data.message;
              console.log(data);
              UsuariosApiService.createPerfil(data.id,this.toSavePerfil).then(
                  (response)=>{
                    this.perfilId=response.data.id;
                    console.log(response.data);
                    console.log(this.perfilId);
                    this.usuario.correo = this.newUsuario.correo;
                    this.usuario.contraseña= this.newUsuario.contraseña;
                    this.handleLogin();
                  }
              )
            },
            error=>{
              this.message=(error.response && error.response.data)
                  || error.message || error.toString();
            }
        )
      }
    }
  },
  mounted(){

    const inputs = document.querySelectorAll(".input-field");
    const toggle_btn = document.querySelectorAll(".toggle");
    const main = document.querySelector("main");

    inputs.forEach((inp) => {
      inp.addEventListener("focus",() => {
        inp.classList.add("active");
      });
      inp.addEventListener("blur", () => {
        if(inp.value != "") return;
        inp.classList.remove("active");
      });
    });

    toggle_btn.forEach((btn) => {
      btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
      });
    });

  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap');


*,
*::before,
*::after {
  padding:0;
  margin:0;
  box-sizing: border-box;
}

body, input{
  font-family: "Poppins", sans-serif;
}

main{
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-color: #299856;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box{
  position: relative;
  width: 100%;
  max-width: 1020px;
  height: 640px;
  background-color: white;
  border-radius: 3.3rem;
  box-shadow: 0 60px 40px -30px rgba(0,0,0,0.27);
}

.inner-box{
  position: absolute;
  width: calc(100% - 4.1rem);
  height: calc(100% - 4.1rem);
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.forms-wrap{
  position: absolute;
  height: 100%;
  width: 45%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  transition: 0.8s ease-in-out;
}

.carousel{
  position: absolute;
  height: 100%;
  width: 55%;
  left: 45%;
  top: 0;
  background-color: #299856;
  border-radius: 2rem;
  display: grid;
  grid-template-rows: auto 1fr;
  padding-bottom: 2rem;
  overflow: hidden;
  transition: 0.8s ease-in-out;
}

form{
  max-width: 260px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: opacity 0.02s 0.4s;
}

form.sign-up-form{
  opacity: 0;
  pointer-events: none;
}

.logo{
  display: flex;
  align-items: center;
}

.logo img{
  width: 150px;
  margin-right: 0.3rem;
}

.logo h4 {
  font-size: 1.1rem;
  margin-top: -9px;
  letter-spacing: -0.5px;
  color: #151111;
}

.heading h2{
  font-size: 2.1rem;
  font-weight: 600;
  color: #151111;
}

.heading h6{
  color: #bababa;
  font-weight: 400;
  font-size: 0.75rem;
  display: inline;
}

.toggle {
  color: #151111;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  transition: 0.3s;
}

.toggle:hover{
  color: #8371fd;
}

.input-wrap{
  position: relative;
  height: 37px;
  margin-bottom: 2rem;
}

.input-field{
  position: absolute;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  font-size: 0.95rem;
  color: #151111;
  transition: 0.4s;
}

label{
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.95rem;
  color: #bbb;
  pointer-events: none;
  transition: 0.4s;
}

.input-field.active{
  border-bottom-color: #151111;
}

.input-field.active + label{
  font-size: 0.75rem;
  top: -2px;
}

.sign-btn{
  display: inline-block;
  width: 100%;
  height: 43px;
  background-color: #151111;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: .8rem;
  font-size: .8rem;
  margin-bottom: 2rem;
  transition: .3s;
}

.sign-btn:hover{
  background-color: #8371fd;
}

.text{
  color: #bbbbbb;
  font-size: 0.7rem;
}

main.sign-up-mode form.sign-in-form{
  opacity: 0;
  pointer-events: none;
}

main.sign-up-mode form.sign-up-form{
  opacity: 1;
  pointer-events: all;
}

main.sign-up-mode .forms-wrap{
  left: 55%;
}

main.sign-up-mode .carousel{
  left: 0%;
}

.images-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.image {
  width: 100%;
  grid-column: 1/2;
  grid-row: 1/2;
  opacity: 0;
  transition: opacity 0.3s, transform 0.5s;
}

.img-1 {
  transform: translate(0, -50px);
}

.image.show {
  opacity: 1;
  transform: none;
}

.text-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.text-group h2 {
  line-height: 2.2rem;
  font-weight: 600;
  font-size: 1.6rem;
  color: #F7F7F7;
  text-align: center;
}

@media (max-width: 850px) {
  .box {
    height: auto;
    max-width: 550px;
    overflow: hidden;
  }

  .inner-box {
    position: static;
    transform: none;
    width: revert;
    height: revert;
    padding: 2rem;
  }

  .forms-wrap {
    position: revert;
    width: 100%;
    height: auto;
  }

  form {
    max-width: revert;
    padding: 1.5rem 2.5rem 2rem;
    transition: transform 0.8s ease-in-out, opacity 0.45s linear;
  }

  .heading {
    margin: 2rem 0;
  }

  form.sign-up-form {
    transform: translateX(100%);
  }

  main.sign-up-mode form.sign-in-form {
    transform: translateX(-100%);
  }

  main.sign-up-mode form.sign-up-form {
    transform: translateX(0%);
  }

  .carousel {
    position: revert;
    height: auto;
    width: 100%;
    padding: 3rem 2rem;
    display: flex;
  }

  .images-wrapper {
    display: none;
  }

  .text-slider {
    width: 100%;
  }
}

@media (max-width: 530px) {
  main {
    padding: 1rem;
  }

  .box {
    border-radius: 2rem;
  }

  .inner-box {
    padding: 1rem;
  }

  .carousel {
    padding: 1.5rem 1rem;
    border-radius: 1.6rem;
  }

  .text-wrap {
    margin-bottom: 1rem;
  }

  .text-group h2 {
    font-size: 1.2rem;
  }

  form {
    padding: 1rem 2rem 1.5rem;
  }
}
</style>