<template>
<v-container>


 <div id="mainContainer" class="backgroundWhiteBorder">
                 <div id="secondContainer" class="container">
                <div class="card">
                   
                    <div class="card-body">
                        <div class="container rounded p-2">
                            <div class="row">

                                <div class="col-12 col-lg-5 pb-4">
                                    <!-- <div class="row pt-n5">
                                        
                                            <span class="text-info font-weight-light h6">Customer Contact</span>
                                        
                                    </div> -->
                                    
                                    <div>
    <v-text-field
      label="Full Name"
      hide-details="auto"
      v-model="fullName"
    ></v-text-field>
  <v-text-field  label="Tel No(599-00-00-00)" v-model="telNo"></v-text-field> 
    <v-text-field counter="50" v-model="adress" label="Adress"></v-text-field>
    
    <v-text-field counter="120" v-model="comment" label="Comment"></v-text-field>
  </div>
                                

                                   
                                </div>

                                <!-- <div class="col-12 col-lg-5 offset-lg-1">
                                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                                        <span class="text-info">Order Summary:</span>
                                    </h4>
                                    <ul id="orderListContainer" class="list-group mb-3">
                                        <li>aa</li>
                                    </ul>
                                </div> -->
                                <div class="col-12 col-lg-6 offset-lg-1">
<v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      color="dark"
      dark
flat
    >
      <v-toolbar-title >Order Summary</v-toolbar-title>

    </v-toolbar>

    <v-list two-line>
    
        <template v-for="(item, index) in shopList">
          <v-list-item :key="item.name" class="mb-n3 mt-n2" >
            <template >
              <v-list-item-content >
                <v-list-item-title v-text="item.name" ></v-list-item-title>

                <v-list-item-subtitle v-text="'quantity : ' + item.stockQuantity" ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.sum + ' (₾)'"></v-list-item-action-text>
              </v-list-item-action>
              
            </template>
          </v-list-item>

          <v-divider
            v-if="index < shopList.length - 1"
            :key="index" inset
          ></v-divider>
          
        </template>
    </v-list>
    
  </v-card>

  <v-card     class="mx-auto mt-5"
     min-width="10"
    outlined>
    <v-list-item>
         <v-list-item-content>
                 <div class="overline mb-4">
          TOTAL(GEL) : {{this.$store.state.totalAmount}}
        </div>
         </v-list-item-content>
    </v-list-item>

  </v-card>
                                </div>
                            </div>
                        </div>
                    </div>

                
                </div>
            </div>    <div >
                        <div class="row">
                            <div class="col-12 col-md-3 offset-md-6">
                            
<v-btn
      class=""
      outlined 
      block
      color="dark" @click="backToShop()"
    >
      Back to Shop
    </v-btn>

                            </div>
  <div class="col-12 text-left col-md-3 ml-n3">
      <v-btn
       block
      dark
      color="primary" @click="placeOrder()"
    >
      Place Order
    </v-btn>

                                <!-- <button type="submit" id="btnPlaceOrder" onclick="return placeOrder()"
                                 class="btn  btn-success form-control">Place Order</button> -->
                                 </div>
                            
                        </div>
                    </div>

</div>   
</v-container>
</template>


<script>
import axios from 'axios'
export default {
    
    name:"orderSummary",
    data:() => ({
        shopList:[],
        fullName:"",
        adress:"",
        comment:'',
        telNo:'',
   result:false
    }),
    methods:{
        backToShop(){
           this.$emit("backToShop");
        },
        placeOrder(){  
           
let formData = new FormData();

formData.append('postOrderString', (this.fullName.trim() == '' ? "Local Sale Process" : this.fullName) + ','
            +(this.adress.trim() == '' ? "Local Sale Process" : this.adress) +',' + 
            (this.telNo.trim() == '' ? "Local Sale Process" : this.telNo) + ',' 
            +(this.comment.trim() == ''? "Local Sale Process" : this.comment)+"," 
            +this.$store.state.totalAmount);

            this.shopList.forEach((key, val) => {
                    formData.append('postOrderDetailList[]', this.shopList[val].stockQuantity +', '+
                    this.shopList[val].price+', '+ 
                    this.shopList[val].name+','+
                    this.shopList[val].id)

            })
      
        

        axios.
        post("https://localhost:44376/admin/order/localSaleSubmitted",formData).
        then(response => {this.result = response.data
         if(response.data.success == true)
       this.$router.go(0); 
       this.$emit("orderSubmitted");


        }). catch(error => {
            alert(error.message);
        });

        }
    }
    ,
    mounted(){
       this.shopList = this.$store.state.dess;
       
    }
}
</script>