// clipboard-arrow-down-outline
//cash-refund
<template>
 <v-card> 

     <v-data-table
      :headers="headers"
      :items="productList"
      :search="search"
      class="elevation-1"
    >
    
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text--secondary">PRODUCT LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
 <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>

                <v-dialog v-model="refundDialog"  max-height="300px" max-width="400px" >
            <v-card>
             
              <v-card-title>
                <span class="headline">{{editItem.name}}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="12">
                      <v-text-field
                        v-model="editItem.quantity"
                        label="Quantity"
                        value=""
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="12">
                      <v-text-field
                        v-model="editItem.price"
                        label="Price (₾)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="refundDialog = false">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          
          medium
          class="mr-2 d-flex p-2"
          @click="addToRefund(item)"
          
        >
          mdi-cash-refund
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" > Reset </v-btn>
      </template>
     </v-data-table>
 </v-card>    
</template>


<script>
import axios from "axios"

export default {
    name:'productList',
    data:()=>{
        return{
            productList:[],
            search:'',
            editItem:{
id:0,
name:'',
category:'',
price:0,
quantity:0,
totalPrice:0
            },
            refundDialog:false,
            headers:[
                {text:'Name', width:"40%",value:'name'},
                {text:'Category', value:'category'},
                {text:'Price', width:"15%",value:'price'},
                {text:'hidden', align:' d-none', value:'id'},
                { text: "Actions", width:"15%",value: "actions", sortable: false },
            ]
        }
    },
    mounted(){
      this.editItem = []
axios.get("https://localhost:44376/admin/product/GetAllForRefund").then((response) => {
    this.productList = response.data.data
}).finally(()=>{
   
})

    },
    methods:{
        addToRefund(item){
            
            this.editItem.name = item.name;
            this.editItem.id = item.id;
            this.editItem.category = item.category;
this.editItem.price = item.price
this.refundDialog = true;
        },

        save(){

if(this.checkRefundList()){
            this.editItem.totalPrice = (this.editItem.price * this.editItem.quantity)
            this.$store.commit("setRefundList", this.editItem);
            this.refundDialog = false;
            this.editItem = [];
            }
            else
            {
                alert("Selected Item already in RefundList");
                 
            }
        }
        ,
        checkRefundList()
        {
          var k = true;
            this.$store.getters.GetRefundList.forEach(element => {
                if(element.id == this.editItem.id){
                    k = false;
                  return;
                }
            });
           
            return k;
           
         
        }
    }
}
</script>