<template>
  <v-app style="background: #f8f8f8">
    <v-row>
      <v-col>
        <v-card style="padding: 3%; margin: 40px 50px 10px 50px" class="rounded-xl">
          <v-card-title>Datos de la Operación</v-card-title>
          <v-row style="padding: 16px;">

            <v-col cols="6" sm="4" md="4" lg="4">
              <p>Seleccionar Cartera</p>
              <v-autocomplete v-model="nombreCartera" item-text="nombre" :items="this.carteras" dense filled ></v-autocomplete>
            </v-col>

            <v-col class="ml-4" cols="6" sm="4" md="4" lg="4">
              <p>Días por Año</p>
              <v-autocomplete v-model="diasxanio" :items="dxa" dense filled ></v-autocomplete>
            </v-col>

            <v-col class="ml-4" cols="6" sm="4" md="4" lg="3">
              <p>Tipo de Retención</p>
              <v-container fluid>
                <v-radio-group v-model="radiob2" row>
                  <v-radio
                      label="Porcentaje"
                      value="1"
                  ></v-radio>
                  <v-radio
                      label="Monto"
                      value="2"
                  ></v-radio>
                </v-radio-group>
              </v-container>


            </v-col>

          </v-row>

          <v-row style="padding: 16px;">

            <v-col cols="6" sm="4" md="4" lg="4">
              <p>Monto de Retención</p>
              <v-text-field v-model="montoRetencion" @keypress="validateNumber"></v-text-field>
            </v-col>

            <v-col class="ml-4" cols="6" sm="4" md="4" lg="4">
              <v-row>
              <p class="mr-8">Tasa %</p>
              <v-tooltip
                  v-model="show"
                  top
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      class="pb-3"
                  >
                    <v-icon color="#299856">
                      mdi-information
                    </v-icon>
                  </v-btn>
                </template>
                <span>Ingresar tasa como valor porcentual</span>
              </v-tooltip>
              </v-row>
              <v-text-field v-model="montoTasa" suffix="%" @keypress="validateNumber" ></v-text-field>
            </v-col>

            <v-col class="ml-4" cols="6" sm="4" md="4" lg="3">
              <v-row>
                <p>Fecha de Descuento</p>
                <v-tooltip
                    v-model="show2"
                    top
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        class="pb-3"
                    >
                      <v-icon color="#299856">
                        mdi-information
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Fecha en la que se descuentan todas las letras de una cartera</span>
                </v-tooltip>
              </v-row>
              <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"

                  max-width="250px"
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="computedDateFormatted"
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

          <v-row style="padding: 16px;">
            <v-col cols="6" sm="4" md="4" lg="4">
              <p>Periodo</p>
              <v-autocomplete v-model="per" item-text="nombre" :items="this.periodos" dense filled ></v-autocomplete>
            </v-col>


            <v-col v-if="radiob3==2" class="ml-4" cols="6" sm="4" md="4" lg="4">
              <p>Periodo de Capitalización</p>
              <v-autocomplete v-model="percap" item-text="nombre" :items="this.periodos" dense filled ></v-autocomplete>
            </v-col>

            <v-col class="ml-4" cols="6" sm="4" md="4" lg="3">
              <v-row>
              <p>Tipo de Tasa</p>
              <v-col cols="12" md="3">
                <v-dialog
                    v-model="dialog1"
                    persistent
                    max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon class="pb-3"  v-bind="attrs" v-on="on" >
                      <v-icon color="#299856">
                        mdi-information
                      </v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Información sobre Tasas </span>
                    </v-card-title>

                      <v-card-text>
                        <b>Tasa nominal:</b> La tasa nominal es el porcentaje que se calcula tomando
                        como referencia un monto de dinero durante un periodo establecido.
                      </v-card-text>
                    <center >
                      <img  width="70%" src="../assets/Formula-TasaNominalaTasaEfectiva.jpeg" alt="Formula1">
                    </center>
                    <v-card-text>
                      <b>Tasa efectiva:</b> La tasa efectiva es la tasa de interés que realmente se gana o se
                      paga en una inversión, préstamo u otro producto financiero, debido al resultado de
                      la capitalización en un período de tiempo determinado.
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="#299856"
                          text
                          @click="dialog1 = false"
                      >
                        Cerrar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              </v-row>
              <v-container fluid>
                <v-radio-group v-model="radiob3" row>
                  <v-radio
                      label="Efectiva"
                      value="1"
                  ></v-radio>
                  <v-radio
                      label="Nominal"
                      value="2"
                  ></v-radio>
                </v-radio-group>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

    </v-row>
    <v-row style="margin: 10px 50px">
      <v-col style="margin-right: 10px">
        <v-card style="padding: 6.7%;" class="mx-auto, rounded-xl">
          <v-card-title>Costos/Gastos Iniciales</v-card-title>

          <v-row>
            <v-col cols="6" ms="4" md="4">
              <v-card-subtitle>Valor Expresado</v-card-subtitle>
              <v-text-field v-if="radiob1==='1'" style="margin-left: 16px" v-model="montoCostoInicial" suffix="%" @keypress="validateNumber" ></v-text-field>
              <v-text-field v-else style="margin-left: 16px" v-model="montoCostoInicial" @keypress="validateNumber" ></v-text-field>
            </v-col>

            <v-col class="ml-12" cols="6" ms="6" md="6" >
              <v-card-subtitle>Tipo de Valor</v-card-subtitle>
              <v-container fluid>
                <v-radio-group style="margin-left: 16px" v-model="radiob1" row>
                  <v-radio
                      label="Porcentaje"
                      value="1"
                  ></v-radio>
                  <v-radio
                      label="Monto"
                      value="2"
                  ></v-radio>
                </v-radio-group>
              </v-container>

            </v-col>
          </v-row>

          <v-row>

            <v-col cols="6" sm="6" md="5" class="mr-10">
              <v-autocomplete style="margin-left: 16px" v-model="motivoI" item-text="nombre" :items="this.costos" dense filled label="Motivo"></v-autocomplete>
            </v-col>

            <v-col cols="6" sm="6" md="3">
              <v-btn style="margin-left: 16px; background-color: #299856; color: white; border-radius: 50px;" small @click="addCosto(true)">Agregar</v-btn>
            </v-col>

          </v-row>

          <v-simple-table height="100px">
            <template v-slot:default>
              <tbody>
              <tr
                  v-for="item in listaCostosI"
                  :key="item.id"
              >
                <td>{{ item.nombre }}</td>
                <td>{{ item.monto }}</td>
                <td>
                  <v-btn icon @click="deleteCosto(item.id,true)">
                    <v-icon
                        medium
                        color="pink"
                    >
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>

      <v-col style="margin-left: 10px">
        <v-card style="padding: 6.7%;" class="mx-auto, rounded-xl">
          <v-card-title>Costos/Gastos Finales</v-card-title>

          <v-row >
            <v-col cols="6" ms="4" md="4">
              <v-card-subtitle>Valor Expresado</v-card-subtitle>
              <v-text-field v-if="radiob4==='1'" style="margin-left: 16px" v-model="montoCostoFinal" suffix="%" @keypress="validateNumber"></v-text-field>
              <v-text-field v-else style="margin-left: 16px" v-model="montoCostoFinal" @keypress="validateNumber"></v-text-field>
            </v-col>

            <v-col class="ml-12" cols="6" ms="6" md="6" >
              <v-card-subtitle>Tipo de Valor</v-card-subtitle>
              <v-container fluid>
                <v-radio-group style="margin-left: 16px" v-model="radiob4" row>
                  <v-radio
                      label="Porcentaje"
                      value="1"
                  ></v-radio>
                  <v-radio
                      label="Monto"
                      value="2"
                  ></v-radio>
                </v-radio-group>
              </v-container>

            </v-col>
          </v-row>

          <v-row >

            <v-col cols="6" sm="6" md="5" class="mr-10">
              <v-autocomplete  style="margin-left: 16px" v-model="motivoF" item-text="nombre" :items="this.costos" dense filled label="Motivo"></v-autocomplete>
            </v-col>

            <v-col cols="6" sm="6" md="3">
              <v-btn style="margin-left: 16px; background-color: #299856; color: white; border-radius: 50px;" small @click="addCosto(false)">Agregar</v-btn>
            </v-col>


          </v-row>

          <v-simple-table height="100px">
            <template v-slot:default>
              <tbody>
              <tr
                  v-for="item in listaCostosF"
                  :key="item.id"
              >
                <td>{{ item.nombre }}</td>
                <td>{{ item.monto }}</td>
                <td>
                  <v-btn icon @click="deleteCosto(item.id,false)">
                    <v-icon
                        medium
                        color="pink"
                    >
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <!--    <v-btn @click="navigateToResultadoId(1,1)">Calcular</v-btn>-->
    <v-btn style="margin: 30px 1200px 30px 50px; background-color: #299856; color: white; border-radius: 50px; height: 40px" @click="saveTasa()">Calcular</v-btn>

  </v-app>
</template>

<script>
import OperacionesApiService from "@/services/operaciones-api.service"
import CostosApiService from "@/services/costos-api.service"
import PerfilesApiService from "@/services/perfiles-api.service"
import PeriodoApiService from "@/services/periodo-api.service"
import TasaApiService from "@/services/tasas-api.service"
import UsuariosApiService from "@/services/usuarios-api.service"
import CarterasApiService from "@/services/carteras-api.service"
import Costo from "../models/costo";
export default {
  name: "calculadora-letras",

  data: vm => ({
    dialog1: false,
    show: false,
    show2: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    radiob1:'2',
    radiob2:'2',
    radiob3:'1',
    radiob4:'2',
    diasxanio:'',
    per:'',
    percap:'',
    montoTasa:'',
    tasaBool:true,
    tasas:[],
    montoRetencion:0,
    retencionBool:true,
    aniobool:true,
    operacionId:0,

    nombreCartera:'',


    dxa: ['360','365'],


    valorNominal:0,
    fechaGiro:'0/00/0000',
    fechaVencimiento:'0/00/0000',
    nombreGirador:'',

    costos:[],
    costosQuieto:[],

    montoCostoInicial:0,
    porcentaje:true,
    motivoI:'',

    montoCostoFinal:0,
    porcentaje2:true,
    motivoF:'',



    CI:'1',
    CF:'1',


    carteras:[],
    periodos:[],

    listaCostosI:[],

    listaCostosF:[],

  }),

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
    currentUser(){
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
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
    this.getPerfil();
    this.retrieveCostos();
    this.retrievePeriodos();
    this.retrieveTasas();
  },
  methods: {

    getPerfil(){
      UsuariosApiService.getPerfilbyUserId(this.currentUser.id).then(
          response=>{
            console.log(response.data);
            this.retrieveCarteras(response.data.id);
          }).catch(e=>{
            console.log(e);
      })
      ;
    },

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

    costoPorcentaje(costoInicial){
      var v1=true;
      if(costoInicial){
        v1=this.radiob1;
      }
      else{
        v1=this.radiob4;
      }


      if(v1==='1'){
        return this.porcentaje=true;
      }
      else{
        this.porcentaje=false;
      }

      return this.porcentaje;
    },

    valorCostoInicial:function(costoInicial){

      var v1=true;

      if(costoInicial){
        v1=this.radiob1;
      }
      else{
        v1=this.radiob4;
      }

      if(costoInicial){
        if(v1==='2'){
          return this.montoCostoInicial
        }
        else{
          return this.montoCostoInicial/100
        }
      }
      else{
        if(v1==='2'){
          return this.montoCostoFinal
        }
        else{
          return this.montoCostoFinal/100
        }
      }


    },

    tipoTasa:function(){
      var v1=this.radiob3;
      if(v1==='1'){
        this.tasaBool=false

        return this.tasaBool
      }
      else{
        return this.tasaBool
      }
    },

    tipoRetencion:function(){
      var v1=this.radiob2;
      if(v1==='2'){
        this.retencionBool=false

        return this.retencionBool
      }
      else{
        return this.retencionBool
      }
    },

    tipoAnio:function(){
      var v1=this.diasxanio;
      if(v1==='360'){
        this.aniobool=false

        return this.aniobool
      }
      else{
        return this.aniobool
      }
    },

    perId:function(){
      var v1=this.per;

      for (let i = 0; i <this.periodos.length ; i++) {

        if(v1===this.periodos[i].nombre){
          return this.periodos[i].id
        }
      }
    },

    perCapId:function(){
      var v1=this.percap;
      if(this.radiob3==="1"){
        return 1
      }

      for (let i = 0; i <this.periodos.length ; i++) {
        if(v1===this.periodos[i].nombre){
          return this.periodos[i].id
        }
      }

    },

    valorRetencion:function(){
      var v1=this.radiob2;
      if(v1==='2'){
        return this.montoRetencion
      }
      else{
        return this.montoRetencion/100
      }
    },

    motivoId:function(costoInicial){

      var v1=true;

      if(costoInicial){
        v1=this.motivoI;
      }
      else{
        v1=this.motivoF;
      }

      for (let i = 0; i <this.costos.length ; i++) {
        if(v1===this.costos[i].nombre){
          return this.costos[i].id
        }
      }
    },

    addCosto:function(costoInicial){

      let toAdd=new Costo(this.motivoId(costoInicial), this.costosQuieto[this.motivoId(costoInicial)-1].nombre ,costoInicial, this.costoPorcentaje(costoInicial), this.valorCostoInicial(costoInicial));

      if(costoInicial){
        this.listaCostosI.push(toAdd);
      }
      else{
        this.listaCostosF.push(toAdd);
      }

      let pos=0;

      for (let i = 0; i < this.costos.length; i++) {
        if(this.motivoId(costoInicial)===this.costos[i].id){
          pos=i;
          break;
        }
      }

      this.costos.splice(pos,1);

      console.log(toAdd);
      console.log(this.listaCostosI);
      this.retrieveCostos(true);
      console.log(`pEPE${this.costosQuieto}`);
    },

    deleteCosto:function(costoId, costoInicial ){
      let pos=-1;

      console.log("Entró al delete")

      if(costoInicial){
        for (let i = 0; i <this.listaCostosI.length ; i++) {
          console.log(`id comparado: ${this.listaCostosI[i].id}`)
          if (costoId===this.listaCostosI[i].id){
            pos=i;
            let toAdd=new Costo(this.listaCostosI[i].id,this.listaCostosI[i].nombre,"","","");
            this.costos.push(toAdd);
            this.listaCostosI.splice(pos,1)
            break;
          }
        }
        console.log(this.listaCostosI);
      }
      else{
        for (let i = 0; i <this.listaCostosF.length ; i++) {
          if (costoId===this.listaCostosF[i].id){
            pos=i;
            let toAdd=new Costo(this.listaCostosF[i].id,this.listaCostosF[i].nombre,"","","");
            this.costos.push(toAdd);
            this.listaCostosF.splice(pos,1)
            break;
          }
        }
      }

      console.log(costoId);
      console.log(pos);
    },

    saveForCostos(operacionId){
      for (let i = 0; i <this.listaCostosI.length ; i++) {
        this.saveCostos(operacionId,this.listaCostosI[i].id,this.listaCostosI[i],false);
      }
      for (let i = 0; i <this.listaCostosF.length ; i++) {
        if(i===this.listaCostosF.length-1 ){
          this.saveCostos(operacionId,this.listaCostosF[i].id,this.listaCostosF[i],true);
        }
        else{
          this.saveCostos(operacionId,this.listaCostosF[i].id,this.listaCostosF[i],false);

        }
      }
    },

    saveCostos(operacionId,costoId,data,doCartera){
      OperacionesApiService.createCostosOperacion(operacionId, costoId,{
        costoInicial: data.costoInicial,
        porcentaje: data.porcentaje,
        monto: data.monto

      }).then((result)=>{
        console.log(result)
        if (doCartera){
          this.saveCarteraOperacion(operacionId);
        }

      })
    },

    saveTasa(){
      console.log(this.getCartera());
       PeriodoApiService.createTasa(this.perId(), this.perCapId(),{
        monto: this.montoTasa/100,
        nominal:this.tipoTasa()

      }).then((result)=>{
        console.log(result);
        this.saveOperacion(result.data.id);
      })
    },

    saveOperacion(id){
       TasaApiService.createOperacion(id,{

        añoCalendario: this.tipoAnio(),
        fechaDescuento: this.date,
        retencion: this.valorRetencion(),
        retencionPorcentaje: this.tipoRetencion()

      }).then((result)=>{
        console.log(result);
        this.operacionId=result.data.id;
        this.saveForCostos(result.data.id);
      })
    },

    saveCarteraOperacion(operacionId){
      CarterasApiService.createOperacionCarteras(this.getCartera(),operacionId).
      then((result)=>{
        console.log(result);
        this.navigateToResultadoId(this.getCartera(),operacionId);
      })
      .catch((e) => {
        console.log(e);
      });

    },

    retrieveCostos(cq){
      CostosApiService.getAll()
          .then(response => {
            if(cq){
              this.costosQuieto=response.data;
            }
            else{
              this.costos=response.data;
            }
            console.log(this.costos);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    retrieveCarteras(id){
      PerfilesApiService.getAllCartera(id)
          .then(response => {
            this.carteras = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
    },

    retrievePeriodos(){
      PeriodoApiService.getAll()
          .then(response => {
            this.periodos = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
    },

    retrieveTasas(){
      TasaApiService.getAll()
          .then(response => {
            this.tasas = response.data;

          })
          .catch((e) => {
            console.log(e);
          });
    },

    getCartera(){
      this.nombreCartera;
      for (let i = 0; i < this.carteras.length; i++) {
        if(this.carteras[i].nombre===this.nombreCartera){
          console.log(this.carteras[i]);
          return this.carteras[i].id;
        }
      }
    },

    navigateToResultadoId(carteraid,operacionid) {
      this.$router.push({name: 'cartera-letras', params: { carteraId: carteraid,operacionId:operacionid}});
    },


  },
  mounted() {
    this.getPerfil();
    this.retrieveCostos(false);
    this.retrieveCostos(true);
    this.retrievePeriodos();
    this.retrieveTasas();

  }

}
</script>

<style scoped>

*{
 /* border:2px black solid;*/
  margin: 0;
  padding: 0;
}
</style>