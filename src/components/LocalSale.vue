<template>
<div class="container border white backgroundWhite mt-2 mb-3">
      <alert :successDialog="successDialog"></alert>
      

      <div class="row">
        
        <div class="col-md-6">         
          <span  class="h2 font-weight-light text--darken-3 light-blue--text">{{header}}</span>
        </div>
      </div>
      <hr  v-show="showList" />
      <div v-show="!showList">
<orderSummary v-on:backToShop="showList=true" v-on:orderSubmitted="orderSubmitted"/>
      </div>
    <div class="row" v-show="showList">
      
      <div class="mb-2 col-6">
        <stockList v-show="showList"/>
      </div>
      <div class="text-center 2px col-6">
        

            <div data-app>
  <shopList v-show="showList" v-on:SummaryOrder="showList=false"/>

  </div>
        
      </div>
      </div>
    </div>
</template>


<script>
import stockList from "./StockList"
import orderList from "./OrderList"
import shopList from "./ShopList"
import alert from "./alert"

import orderSummary from './OrderSummary.vue'


export default {
    name:'locasale',
    data:()=> {
        return{
                alertHeight:40,
    showList:true,
    successDialog:false,
    header:'Local Sale'
        }
    },
    methods:{
        
    orderSubmitted(){
this.successDialog=true;
    }
    },
  components: {
    stockList,
    shopList,
    orderSummary,
alert
  }
}
</script>