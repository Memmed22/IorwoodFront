<template>
<div>
    <v-card>
             <v-data-table
      :headers="headers"
      :items="detailList"
       class="elevation-1"
      no-data-text="Please choose specific Order"

    >
          <!-- <template  v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text--secondary">DETAIL LIST</v-toolbar-title>
         
        </v-toolbar>
      </template> -->

             </v-data-table>
    </v-card>

</div>

</template>


<script>
export default {
    name:'orderDetail',
    
    data:()=>{
        return{
            headers:[
                {text:"Product", value:"productName"},
                {text:"Price", value:"price"},
                {text:"Count", value:"count"}
            ],
            detailList: []
        }
    },
    mounted(){
        
          this.detailList = this.$store.state.orderDetails;
    },
    watch:{
        // detailList:{
        // handler:function(val, oldval) {  
           
        // }}
    }
}
</script>