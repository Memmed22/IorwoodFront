<template>
  <v-card> 

     <v-data-table
      :headers="headers"
      :items="orderList"
      :search="search"
      @click="test()"

      class="elevation-1"
    >
    
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text--secondary">ORDER LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
 <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
         
          medium
          class="mr-2 d-flex p-2"
          @click="orderDetail(item)"
        >
          mdi-arrow-right-bold-box-outline
         
        </v-icon>
      </template>

      <template v-slot:nodata>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>

     </v-data-table>
  </v-card>


</template>


<script>
import axios from 'axios'
export default {
    name:'orderlist',
    data:()=> {
        return{
orderList:[],
orderDetails:[],
search:'',
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "fullName",
      },
{ text: "hidden", align: " d-none",value: "id" },
      { text: "Amount", value: "totalAmount" },
      { text: "Date", value: "orderDate" },
       
      { text: "Actions", value: "actions", sortable: false },
    ],

        }
    },
    methods:{
        initialize(){
            //ici dolacak, reset olunca islenir
        },
        orderDetail(item){
           axios.get("https://localhost:44376/admin/order/getOrderDetails", {params:{orderId:item.id}}).
           then(response => {
                this.orderDetails = response.data.data;
           }).catch(error => {
alert(error.message);
           }).finally(()=> {
            
               this.$store.commit("setOrderDetail",this.orderDetails);
               
           });
        }
    }
    ,
    mounted(){
     
axios.get("https://localhost:44376/admin/order/getall", {params:{status:'localsale'}}).
then((response) => (this.orderList = response.data.data)).
finally(()=> {
})
    }
}
</script>