<template>

  <div class="grey lighten-3" >
    <!-- {{$store.state.DataP}}
    <span v-if="$store.getters.GetIsx">Test</span>
    <button @click="$store.commit('SetIsx',{No:1245})">AAA</button> -->
    <navbar class="mb-3" @showPage="showPage($event)"></navbar>


<LocalSale v-if="pageName == 'localsale'"></LocalSale>
<refund v-else-if="pageName == 'refund'"></refund>
  </div>
 

  
</template>

<script>
import navbar from './Navbar'
import LocalSale from './LocalSale'
import refund from './Refund/RefundMain'
export default {
  name: "layout",
  data:() =>({
pageName:'localsale'

  }),
  methods:{
    orderSubmitted(){
this.successDialog=true;
    },
     showPage(value)
    {
      this.pageName = value;
    }
  },
  components: {
     navbar,
        LocalSale,
        refund
  }
};
</script>