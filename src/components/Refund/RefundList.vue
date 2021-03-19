<template>
<div>
    <v-card  >
        <v-data-table
        :headers="headers"
        :items="refundList"
        
        hide-default-footer=true
        no-data-text="Please add refunded item/s"
        >
<template  v-slot:top>
<v-toolbar flat>
    <v-toolbar-title  class="h7 text--secondary">Refund List</v-toolbar-title>
</v-toolbar>

                <v-dialog v-model="refundDialog"  max-height="300px" max-width="400px" >
            <v-card>
             
              <v-card-title>
                <span class="headline">{{editedRefund.name}}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="12">
                      <v-text-field
                        v-model="editedRefund.quantity"
                        label="Quantity"
                        value=""
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="12">
                      <v-text-field
                        v-model="editedRefund.price"
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
</template>



<template v-if="ifRefundListFull" v-slot:footer>
  <v-card
    class="d-flex  flex-row-reverse pa-2 mt-2 mb-2"
    outlined
    tile
    elevation="0"
  >
    <v-card elevation="0"  tile class="warning--text pr-4 pl-4 pa-1 tile">(₾) :  {{calculateTotalAmount}}</v-card>
  </v-card>
</template>

<template v-if="ifRefundListFull" v-slot:[`item.action`]="{item}">
 <v-list-item-icon class="">
            <v-icon 
          small
          class=" d-flex p-2"
          @click="editRefund(item)">
          mdi-pencil
        </v-icon>
                    <v-icon small
          class="d-flex p-2"
          @click="deleteRefund(item)">
          mdi-delete
        </v-icon>   
 </v-list-item-icon>
</template>
        </v-data-table>

    </v-card>
    
  <template v-if="ifRefundListFull">
  <v-card
    class="d-flex  flex-row-reverse pa-2 mt-4 mb-2"
    outlined
    tile
  >
       <v-btn
      class="ma-2"
      outlined
      color="indigo"
      @click="submitRefund()"
    >
      Submit Refund
    </v-btn>
  </v-card>
</template>

    </div>
</template>

<script>
import Axios from 'axios'


export default {
    name:'orderList',
data:()=>{
    return{
        headers:[{text:"name", width:"30%",value:"name"},
        {text:"Category", width:"20%",value:"category"}, 
        {text:"Count", width:"17.5%",value:"quantity"},
        {text:"Price", width:"17.5%",value:"totalPrice"},
        {text:"Act.",width:"15%",value:"action"},
        {text:"hidden", align:" d-none", value:"id"}],
        refundList:[],
        shopListIsFull : false,
        editedRefund:{
            name:'',
            price:0,
            quantity:0,
            selectedIndex:-1
        },
        refundDialog:false,
        
    }
},
mounted(){
    this.refundList = this.$store.getters.GetRefundList
}, 
computed:{
    ifRefundListFull(){
        return (this.refundList.length > 0 ? true:false)
    },
    calculateTotalAmount(){
        let totalAmount = 0;
        this.refundList.forEach(element =>{
            totalAmount += element.totalPrice
        })
        return totalAmount;
    }
}
,
methods:{
    submitRefund(){
let formData = new FormData();
formData.append("postRefundHeaderString", this.$store.state.selectedOrderId +","+
        this.getTotalAmount()+","+
        "Comment is empty");
         
        this.refundList.forEach((element,index) =>{
        formData.append("postRefundDetail[]", element.id + ","+element.price +","+element.quantity);
        })

Axios.post("https://localhost:44376/admin/refund/SubmitRefund", formData).
then(response => {
    if(response.data.success == false)
        alert(response.data.message);
    else{
        this.$emit("refundSubmitted");
         this.$router.go(0); 

    }
}).finally(()=>{
   
})

    },
    deleteRefund(item){
        this.refundList.splice(this.refundList.indexOf(item),1);
       
    },
    getTotalAmount(){
          let totalAmount = 0;
        this.refundList.forEach(element =>{
            totalAmount += element.totalPrice
        })
        return totalAmount;
    }
    ,
    editRefund(item){
        
        this.editedRefund.quantity = item.quantity;
        this.editedRefund.price = item.price;
        this.editedRefund.name = item.name;
        this.editedRefund.selectedIndex = this.refundList.indexOf(item);
this.refundDialog=true;
    },
    save(){
        if(this.editedRefund.selectedIndex != -1)
        {
            this.refundList[this.editedRefund.selectedIndex].quantity = this.editedRefund.quantity;
            this.refundList[this.editedRefund.selectedIndex].price = this.editedRefund.price;
            this.refundList[this.editedRefund.selectedIndex].totalPrice =
             this.editedRefund.price * this.editedRefund.quantity;
        }
        this.calculateTotalAmount;
        this.refundDialog = false;
    }
}

}
</script>