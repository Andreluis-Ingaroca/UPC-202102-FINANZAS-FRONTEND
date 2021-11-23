<template >
  <v-app style="background: #f8f8f8">
    <div class="contenedor" >
      <v-card  height="100%" class="mx-auto, rounded-xl">
        <v-row>
          <v-col cols="12" md="4" >
            <v-card-title class="pa-5">Mis Letras de la Cartera {{this.carteraNombre}}</v-card-title>
          </v-col>
          <v-col cols="12" md="3">
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="my-5" x-small color="#299856" dark fab v-bind="attrs" v-on="on" > + </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="text-h5">Agregar Letra </span>
                </v-card-title>
                <v-card-text>

                  <v-row>
                    <v-col cols="12" sm="4" md="4" class="mr-8">
                      <v-text-field v-model="nombreGirador" label="Nombre del Girador"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="computedDateFormatted"
                              label="Fecha de Giro"
                              v-bind="attrs"
                              @blur="date = parseDate(dateFormatted)"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            no-title
                            @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="4" md="4" class="mr-8">
                      <v-text-field v-model="valorNominal" label="Valor Nominal" @keypress="validateNumber"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="computedDateFormatted2"
                              label="Fecha de Vencimiento"
                              v-bind="attrs"
                              @blur="date2 = parseDate(dateFormatted2)"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date2"
                            no-title
                            @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                  </v-row>

                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="#299856"
                      text
                      @click="dialog = false"
                  >
                    Cerrar
                  </v-btn>
                  <v-btn
                      color="#299856"
                      text
                      @click="dialog = false,saveLetra()"
                  >
                    Crear
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-data-table hide-default-footer height="400px"
                      :headers="headers"
                      :items="letras2"
        ></v-data-table>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import CarteraApiService from "@/services/carteras-api.service"
import moment from 'moment'

export default {
  name: "letras-registradas",

  data: vm => ({
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),

    menu1: false,
    menu2: false,

    dialog: false,

    letras2:[],
    periodos:[],
    carteraOperaciones:[],

    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Fecha de Emisión', value: 'fechaGiro' },
      { text: 'Nombre de la Empresa', value: 'nombreGirador' },
      { text: 'Monto', value: 'valorNominal' },
      { text: 'Fecha de Pago', value: 'fechaVencimiento' }
    ],

    valorNominal: null,
    fechaGiro: '',
    fechaVencimiento: '',
    nombreGirador: '',
    carteraActual:0,

    carteraNombre:'',

  }),

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },

    computedDateFormatted2 () {
      return this.formatDate(this.date2)
    },

    p1:function (){
      return this.costoPorcentaje();
    },

    p2:function (){
      return this.costoPorcentaje2();
    }
  },

  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    },
  },

  created() {
    this.retrieveLetras();
  },

  methods:{

    validateNumber: event => {
      const charCode = String.fromCharCode(event.keyCode);
      if (!/[0-9,.]/.test(charCode)) {
        event.preventDefault();
      }
    },

    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    filter(value) {
        return moment(String(value)).format('DD/MM/YYYY')
    },

    retrieveLetras(id){
      this.carteraId=id;
      CarteraApiService.getLetras(id)
          .then(response => {
            this.letras2 = response.data;

            for (let i = 0; i < this.letras2.length; i++) {
              this.letras2[i].fechaGiro=this.filter(this.letras2[i].fechaGiro);
              this.letras2[i].fechaVencimiento=this.filter(this.letras2[i].fechaVencimiento);
            }

          })
          .catch((e) => {
            console.log(e);
          });
      console.log(this.$route.params.id)
    },

    async saveLetra(){
      await CarteraApiService.createLetras(this.carteraId, {
        valorNominal: this.valorNominal,
        fechaGiro: this.date,
        fechaVencimiento: this.date2,
        nombreGirador: this.nombreGirador
      }).then((result)=>{
        console.log(result)
        console.log(this.nombreCartera)
        this.retrieveLetras(this.$route.params.id)
        this.forCarteraOperaciones();
      })
    },
    deleteCarteraOperacion(operacionId){
      CarteraApiService.deleteOperacionCarteras(this.carteraId,operacionId).then(
          result=>{
            console.log(result.data);
            this.createCarteraOperacion(operacionId);
          }
      ).catch(error=>{
        console.log(error);
      })
    },
    createCarteraOperacion(operacionId){
      CarteraApiService.createOperacionCarteras(this.carteraId,operacionId).then(
          result=>{
            console.log(result.data);
          }
      ).catch(error=>{
        console.log(error);
      })
    },
    forCarteraOperaciones(){
      for (let i = 0; i < this.operacionCartera.length; i++) {
        this.deleteCarteraOperacion(this.operacionCartera[i].operacionId);
      }
    },
    retrieveCarteraById(){
      CarteraApiService.getById(this.carteraId)
          .then(response => {
            this.carteraNombre = response.data.nombre;
            console.log(this.operaciones);
            this.retrieveCarteraOperaciones();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    retrieveCarteraOperaciones(){
      CarteraApiService.getOperacionCarterasByCartera(this.carteraId).then(
          result=>{
            this.carteraOperaciones=result.data;
          }
      ).catch(error=>{
        console.log(error)
      });
    },
  },

  mounted() {
    this.retrieveLetras(this.$route.params.id);
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


</style>