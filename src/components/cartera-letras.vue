<template>
  <div>
    <div>
      <v-card class="mx-auto" elevation="5" max-width="600px" style="margin-bottom: 50px; margin-top: 10px">
        <v-card-title style="margin-left: 40%">Resultados</v-card-title>
        <v-row>
          <v-col cols="12" md="8">
            <v-card-subtitle>(VR)   Valor Total a Recibir por la cartera</v-card-subtitle>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field background-color="#CDCDCD" v-model="operacionCartera.valorRecibidoTotal" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <div style="display: flex; flex-direction: row">
              <v-card-subtitle>(TCEA) Tasa de Coste Efectiva Anual de la cartera</v-card-subtitle>
              <v-dialog
                  v-model="dialogCartera"
                  persistent
                  max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon class="pt-3"  v-bind="attrs" v-on="on" >
                    <v-icon color="#299856">
                      mdi-information
                    </v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <center >
                    <img  style="margin-top: 30px" width="70%" src="../assets/Formula-TIR.jpeg" alt="Formula1">
                    <img  width="80%" src="../assets/Formula-DescripcionTIR.jpeg" alt="Formula1">
                  </center>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="#299856"
                        text
                        @click="dialogCartera = false"
                    >
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field background-color="#CDCDCD" v-model="operacionCartera.tceaCartera" disabled></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div>
      <v-card elevation="5">
        <v-row>
        <v-card-title>Cartera de Letras</v-card-title>
        <v-col cols="12" md="3">
          <v-dialog
              v-model="dialog1"
              persistent
              max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="pt-2"  v-bind="attrs" v-on="on" >
                <v-icon color="#299856">
                  mdi-information
                </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">Información de Variables de Resultados </span>
              </v-card-title>

              <div>
                <v-btn
                    block
                    text
                    @click="show = !show"
                >
                  <b>ID</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                      Identificador de la letra.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show2 = !show2"
                >
                  <b>F Giro</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show2">
                    <v-divider></v-divider>

                    <v-card-text>
                      Fecha de Giro de la letra.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show3 = !show3"
                >
                  <b>V Nom.</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show3">
                    <v-divider></v-divider>

                    <v-card-text>
                      Valor Nominal de la letra.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show4 = !show4"
                >
                  <b>F Ven.</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show4">
                    <v-divider></v-divider>

                    <v-card-text>
                      Fecha de Vencimiento de la letra.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show5 = !show5"
                >
                  <b>F Desc.</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show5">
                    <v-divider></v-divider>

                    <v-card-text>
                      Fecha de Descuento de la letra.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show6 = !show6"
                >
                  <b>Días</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show6">
                    <v-divider></v-divider>

                    <v-card-text>
                      Días transcurridos entre la fecha de vencimiento y la fecha de descuento.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show7 = !show7"
                >
                  <b>Ret.</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show7">
                    <v-divider></v-divider>

                    <v-card-text>
                      Valor de la retención.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show8 = !show8"
                >
                  <b>TE%</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show8">
                    <v-divider></v-divider>

                    <v-card-text>
                      Valor porcentual de la Tasa Efectiva.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show9 = !show9"
                >
                  <b>d%</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show9">
                    <v-divider></v-divider>

                    <v-card-text>
                      Tasa descontada.
                    </v-card-text>
                    <center >
                      <img  width="30%" src="../assets/Formula-TasaDescontada.jpeg" alt="Formula1">
                    </center>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show10 = !show10"
                >
                  <b>Desc.</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show10">
                    <v-divider></v-divider>

                    <v-card-text>
                      Descuento efectuado a la letra.
                    </v-card-text>
                    <center >
                      <img  width="50%" src="../assets/Formula-Descuento.jpeg" alt="Formula1">
                    </center>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show11 = !show11"
                >
                  <b>C Ini.</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show11">
                    <v-divider></v-divider>

                    <v-card-text>
                      Suma de Costos Iniciales.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show12 = !show12"
                >
                  <b>C Fin.</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show12">
                    <v-divider></v-divider>

                    <v-card-text>
                      Suma de Costos Finales.
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show13 = !show13"
                >
                  <b>V Neto</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show13">
                    <v-divider></v-divider>

                    <v-card-text>
                      Valor Neto de la letra.
                    </v-card-text>
                    <center >
                      <img  width="60%" src="../assets/Formula-ValorNeto.jpeg" alt="Formula1">
                    </center>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show14 = !show14"
                >
                  <b>V Rec.</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show14">
                    <v-divider></v-divider>

                    <v-card-text>
                      Valor Recibido de la letra.
                    </v-card-text>
                    <center >
                      <img  width="80%" src="../assets/Formula-ValorRecibido.jpeg" alt="Formula1">
                    </center>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show15 = !show15"
                >
                  <b>V Ent.</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show15">
                    <v-divider></v-divider>

                    <v-card-text>
                      Valor Entregado de la letra.
                    </v-card-text>
                    <center >
                      <img  width="94%" src="../assets/Formula-ValorEntregado.jpeg" alt="Formula1">
                    </center>
                  </div>
                </v-expand-transition>
              </div>

              <div>
                <v-btn
                    block
                    text
                    @click="show16 = !show16"
                >
                  <b>V TCEA%</b>
                </v-btn>
                <v-expand-transition>
                  <div v-show="show16">
                    <v-divider></v-divider>

                    <v-card-text>
                      Valor Porcentual de la TCEA de la letra.
                    </v-card-text>
                    <center >
                      <img  width="65%" src="../assets/Formula-TCEA.jpeg" alt="Formula1">
                    </center>
                  </div>
                </v-expand-transition>
              </div>


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
        <v-simple-table fixed-header height="400px">

          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-center" style="font-weight: bolder; color: black">ID</th>
              <th class="text-center" style="font-weight: bolder; color: black">F Giro</th>
              <th class="text-center" style="font-weight: bolder; color: black">V Nom.</th>
              <th class="text-center" style="font-weight: bolder; color: black">F Ven.</th>
              <th class="text-center" style="font-weight: bolder; color: black">F Desc.</th>
              <th class="text-center" style="font-weight: bolder; color: black">Dias</th>
              <th class="text-center" style="font-weight: bolder; color: black">Ret.</th>
              <th class="text-center" style="font-weight: bolder; color: black">TE%</th>
              <th class="text-center" style="font-weight: bolder; color: black">d%</th>
              <th class="text-center" style="font-weight: bolder; color: black">Desc.</th>
              <th class="text-center" style="font-weight: bolder; color: black">C Ini.</th>
              <th class="text-center" style="font-weight: bolder; color: black">C Fin.</th>
              <th class="text-center" style="font-weight: bolder; color: black">V Neto</th>
              <th class="text-center" style="font-weight: bolder; color: black">V Rec.</th>
              <th class="text-center" style="font-weight: bolder; color: black">V Ent.</th>
              <th class="text-center" style="font-weight: bolder; color: black">V TCEA%</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in operacionLetras" :key="item.id">
              <td class="text-center">{{ item.letraId }}</td>
              <td class="text-center">{{ item.fechaGiro }}</td>
              <td class="text-center">{{ item.valorNominal }}</td>
              <td class="text-center">{{ item.fechaVencimiento }}</td>
              <td class="text-center">{{ item.fechaDescuento }}</td>
              <td class="text-center">{{ item.nDias }}</td>
              <td class="text-center">{{ item.retencion }}</td>
              <td class="text-center">{{ item.tep }}</td>
              <td class="text-center">{{ item.d }}</td>
              <td class="text-center">{{ item.descuento }}</td>
              <td class="text-center">{{ item.costosIniciales }}</td>
              <td class="text-center">{{ item.costosFinales }}</td>
              <td class="text-center">{{ item.valorNeto }}</td>
              <td class="text-center">{{ item.valorRecibido }}</td>
              <td class="text-center">{{ item.valorEntregado }}</td>
              <td class="text-center">{{ item.tcea }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import CarterasApiService from "@/services/carteras-api.service";
import UsuarioApiService from "@/services/usuarios-api.service";
import OperacionApiService from "@/services/operaciones-api.service";
import moment from "moment";
export default {
  name: "cartera-letras",
  data () {
    return {
      dialog1: false,
      dialogCartera:false,
      show: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false,
      show10: false,
      show11: false,
      show12: false,
      show13: false,
      show14: false,
      show15: false,
      show16: false,


      carteras:[],
      resultados:[],
      cartera: '',
      letras:[],
      operacionCartera:'',
      operacionLetras:[],
      perfilId :0,
      carteraId:0,
      letra : ''
    }
  },
  created() {
  },

  computed:{
    currentUser(){
      return this.$store.state.auth.user;
    }
  },

  methods:{

    filter(value) {
      return moment(String(value)).format('DD/MM/YYYY')
    },

    getPerfil(){
      this.carteraId=this.$route.params.carteraId;
      UsuarioApiService.getPerfilbyUserId(this.currentUser.id).then(
          response=>{
            console.log(response.data);
            this.perfilId=response.data.id;
            this.retrieveResultados();
          }).catch(e=>{
        console.log(e)
      })
      ;
    },

    retrieveResultados(){
      CarterasApiService.getById(this.$route.params.carteraId).then(result=>
          {
            this.cartera= result.data;
            this.carteraId=result.data.id;

            this.getLetras();


          }
      ).catch(error=>{
        console.log(error)
      });
    },
    getLetras(){
      CarterasApiService.getLetras(this.carteraId).then(result=>
          {
            this.letras=result.data;
            this.retrieveOperacionCartera();
          }
      ).catch(error=>{
        console.log(error);
      });
    },
    retrieveOperacionCartera(){
      CarterasApiService.getOperacionCarteraByCarteraIdAndOperacionId(this.carteraId,this.$route.params.operacionId)
      .then(result=>{
        console.log(result);
        this.operacionCartera=result.data;
        this.retrieveOperacionLetras();
      }).catch(error=>{
        console.log(error);
      });
    },
    retrieveOperacionLetras(){
      OperacionApiService.getResults(this.$route.params.operacionId)
      .then(result=>{
        this.operacionLetras=result.data;

        console.log(this.operacionLetras);

        for (let i = 0; i < this.operacionLetras.length; i++) {
          this.operacionLetras[i].fechaGiro=this.filter(this.operacionLetras[i].fechaGiro);
          this.operacionLetras[i].fechaVencimiento=this.filter(this.operacionLetras[i].fechaVencimiento);
          this.operacionLetras[i].fechaDescuento=this.filter(this.operacionLetras[i].fechaDescuento);
        }

      }).catch(error=>{
        console.log(error);
      });
    }
  },

  mounted() {
    this.getPerfil();
  }
}
</script>

<style scoped>
</style>