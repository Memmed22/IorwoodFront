<template>
    <div class="container border white backgroundWhite mt-2 mb-3">
      <alert :successDialog="successDialog"></alert>
              <div class="row">
        
        <div class="col-md-6">         
          <span  class="h2 font-weight-light text--darken-3 light-blue--text">Refund</span>
        </div>
         <div class="col-md-6 text-right">         
           <v-btn
      class="ma-2"
      :outlined = showOrderList
      width="170"
      color="light-blue darken-1"
      @click="showOrderList = !showOrderList"
    >
      {{showOrderList == true ? "Hide Order List" : "Show Order List"}}
    </v-btn>
        </div>
      </div>
      <hr/>

<div class="row">
    <div class="col-6">
       <orderList v-if="showOrderList"></orderList>
       <product-list v-if="!showOrderList"></product-list>
    </div>
    <div class="col-6">
    <order-detail v-if="showOrderList"></order-detail>
    <refund-list v-on:refundSubmitted="refundSubmitted" v-if="!showOrderList"></refund-list>
    </div>
</div>

    </div>
   
</template>


<script>
import orderList from './OrderList'
import OrderDetail from './OrderDetail.vue'
import ProductList from './ProductList.vue'
import RefundList from './RefundList.vue'
import Alert from '../alert'
export default {
    name:'refundMain',
    components:{
        orderList,
        OrderDetail,
        ProductList,
        RefundList,
        Alert
    },
    data:()=> {
        return{
            showOrderList : false,
            successDialog:false
        }
    },
    methods:{
      refundSubmitted(){
        this.successDialog=true;
      }
    }
}
</script>