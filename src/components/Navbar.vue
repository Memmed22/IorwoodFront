<template>
    <v-bottom-navigation
     :value="value"
    grow 
    color="primary"
    
    >
        <v-toolbar flat>
<v-toolbar-title class="ml-6 text-uppercase grey--text">
    
<span class="font-weight-light">IOR</span>
<span class="">WOOD</span>

</v-toolbar-title>
    <!-- <v-toolbar-title class="ml-5">
             
       <v-btn depressed @click="showPage('localsale')">
<span size="10" small>Local Sale</span>
</v-btn>
      <v-btn depressed @click="showPage('refund')" class="ml-5">
<span size="10" small>Refund</span>
</v-btn>
    </v-toolbar-title> -->

<div class="ml-4 row  h-100 ">
   
  
    <v-btn class="ml-4" value="local Sale" @click="showPage('localsale')" height="100%">
      <span>Cash Desk</span>
      <v-icon>mdi-cash-register</v-icon>
    </v-btn>

        <v-btn value="favorites"  @click="showPage('refund')" class="ml-5" height="100%">
      <span>Refund</span>
      <v-icon>mdi-cash-refund</v-icon>
    </v-btn>

    <v-btn value="nearby" height="100%">
      <span>Account Check</span>
      <v-icon>mdi-account-check</v-icon>
    </v-btn>
    
</div>


<v-spacer></v-spacer>

<v-btn depressed>
<span size="9" small> Log In</span>
<v-icon small >mdi-login</v-icon>
</v-btn>
        </v-toolbar>


    </v-bottom-navigation>

</template>


<script>
export default {
    components:{
     
    }
    ,
    name:'navbar',
    data:()=>{
        return{
          value:1
        }
    }
    ,
    methods:{
        showPage(value){
this.$emit("showPage",value);
        }
    }
}
</script>