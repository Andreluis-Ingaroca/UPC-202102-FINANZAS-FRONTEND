<template >
  <v-app style="background: #f8f8f8">
    <div class="contenedor" >
      <v-card  height="100%" class="mx-auto, rounded-xl">
        <v-card-title class="pa-5">Mis Operaciones de la Cartera {{this.carteraNombre}}</v-card-title>
        <v-divider></v-divider>
        <div class="contenedor2" >
          <v-data-table hide-default-footer height="350px"
                        :headers="headers"
                        :items="operaciones">

            <template v-slot:item.actions="{ item }">
              <v-btn small @click="navigateToDetalles(item.id)">Más Detalles</v-btn>
            </template>

          </v-data-table>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import CarteraApiService from "@/services/carteras-api.service"
import moment from 'moment'

export default {
  name: "operaciones-registradas",

  data(){
    return{
      operaciones:[],

      periodos:[],

      headers: [
        { text: 'Fecha de Descuento', value: 'fechaDescuento' },
        { text: 'Tipo de Tasa', value: 'nominal' },
        { text: 'Monto de Tasa', value: 'tasaMonto' },
        { text: 'TCEA Cartera', value: 'tceaCartera' },
        { text: '', value: 'actions' },
      ],

      carteraId:this.$route.params.id,
      carteraNombre:'',
    }
  },
  created() {
    this.retrieveOperaciones()
  },

  methods:{

    filter(value) {
      return moment(String(value)).format('DD/MM/YYYY')
    },

    retrieveOperaciones(id){
      CarteraApiService.getOperaciones(id)
          .then(response => {
            this.operaciones = response.data;
            console.log(this.operaciones);

            for (let i = 0; i < this.operaciones.length; i++) {
              this.operaciones[i].fechaDescuento=this.filter(this.operaciones[i].fechaDescuento);
              if( this.operaciones[i].nominal===false){
                this.operaciones[i].nominal="Efectiva";
              }
              else{
                this.operaciones[i].nominal="Nominal";
              }
            }

            console.log(this.operaciones);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToDetalles(id){
      this.$router.push({name: 'cartera-letras', params: { carteraId: this.$route.params.id,operacionId:id}});
    },
    retrieveCarteraById(){
      CarteraApiService.getById(this.carteraId)
          .then(response => {
            this.carteraNombre = response.data.nombre;

            console.log(this.operaciones);
            //this.displayPosts = response.data.map(this.getDisplayPost);
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },


  mounted() {
    this.retrieveOperaciones(this.$route.params.id);
    this.retrieveCarteraById();
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