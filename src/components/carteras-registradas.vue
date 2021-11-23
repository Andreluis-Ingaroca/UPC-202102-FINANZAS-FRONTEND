<template >
  <v-app style="background: #f8f8f8">
    <div class="contenedor" >
      <v-card  height="100%" class="mx-auto, rounded-xl">

        <v-row>
          <v-col cols="12" md="2" >
            <v-card-title style="margin-left: 10px;" class="pa-5">Mis Carteras</v-card-title>
          </v-col>
          <v-col cols="12" md="3">
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="my-5" x-small color="#299856" style="box-shadow: none" dark fab v-bind="attrs" v-on="on" > + </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">Agregar Cartera </span>
                </v-card-title>
                <v-card-text>
                  <v-container>

                    <v-text-field
                        label="Nombre de la Cartera *"
                        required
                        v-model="nombreCartera"
                    ></v-text-field>

                  </v-container>
                  <small>*Campo requerido</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                  >
                    Cerrar
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false,saveCartera()"

                  >
                    Crear
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <div class="contenedor2" >
          <v-data-table hide-default-footer height="350px"
                        :headers="headers"
                        :items="carteras">

            <template v-slot:item.cantidadletras="{ item }">
              <v-card-text>{{item.letras.length}}</v-card-text>
            </template>


            <template v-slot:item.cantidadoperaciones="{ item }">
              <v-card-text>{{item.operacionCarteras.length}}</v-card-text>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn small @click="navigateToLetraId(item.id)">Letras</v-btn>
              <v-btn small @click="navigateToOperacionId(item.id)">Operaciones</v-btn>
            </template>

          </v-data-table>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import PerfilApiService from "@/services/perfiles-api.service"
import UsuarioApiService from "@/services/usuarios-api.service"

import Cartera from "../models/cartera";
export default {
  name: "carteras-registradas",

  data(){
    return{
      dialog: false,

      carteras:[],
      periodos:[],

      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Cantidad de Letras', value: 'cantidadletras' },
        { text: 'Cantidad de Operaciones', value: 'cantidadoperaciones' },
        { text: '', value: 'actions' },
      ],

      nombreCartera:'',

      cartera : new Cartera("",""),

      perfilId:0,
    }
  },

  computed:{
    currentUser(){
      return this.$store.state.auth.user;
    }
  },

  created() {
    this.getPerfil();
  },

  methods:{

    getPerfil(){
     UsuarioApiService.getPerfilbyUserId(this.currentUser.id).then(
          response=>{
            console.log(response.data);
            this.perfilId=response.data.id;
            this.retrieveCarteras(response.data.id);
          }).catch(e=>{
            console.log(e)
      })
      ;
    },

    retrieveCarteras(id){
      PerfilApiService.getAllCartera(id)
          .then(response => {
            this.carteras = response.data;
            console.log(this.carteras);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToLetraId(id) {
      this.$router.push({name: 'letras-registradas', params: { id: id}});
    },
    navigateToOperacionId(id) {
      this.$router.push({name: 'operaciones-registradas', params: { id: id}});
    },

     saveCartera(){
       PerfilApiService.createCartera(this.perfilId,{
        nombre: this.nombreCartera,

      }).then((result)=>{
        console.log(result)
        console.log(this.nombreCartera)
         this.retrieveCarteras(this.perfilId);
      })
    },
  },

  mounted() {

  }
}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  /*border: black 2px solid;*/

}

.contenedor{
  margin-top: 40px;
  width: 80%;
  height: 70%;
  margin-left: auto;
  margin-right: auto;
}

.contenedor2{

  width: 100%;

}

.contenedorBotones{
  float: left;
  justify-content: space-between;

}
</style>