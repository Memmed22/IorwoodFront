<template>
<div>
  <v-card  max-width="500" class="mx-auto">
    <v-list three-line depressed>
        <v-subheader left
           >SHOP LIST</v-subheader>
      <template v-for="(item, index) in shopList">
        

        <v-divider class="m-0 pt-0"
        v-if="index > 0"
          :key="index"
         inset
        ></v-divider> 

         <v-dialog :key="index+1" v-model="editDialog" max-width="500px">
            <v-card>
            <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.quantity"
                        label="Quantity"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Price (₾)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelDialog">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveDialog(item)"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          

        <v-list-item :key="index">
          <div style="height:100px; width:100px">
             <v-img max-height="100" max-width=100 
            lazy-src="https://picsum.photos/id/11/10/6"  
            :src="getImgUrl(item.extraInfo2)"
            :alt="item.extraInfo2"></v-img> 
            
          </div>

          <v-list-item-content>
            <div class="col-12 row">
              <div class="col-8">
                <v-list-item-title v-html="item.name"></v-list-item-title>
              </div>

              <div class="col-4 small">
                <span>{{item.stockQuantity}}</span> x <span>{{item.price}}</span> ₾
                <v-chip small class="ma-1"> {{item.sum}} ₾ </v-chip>
              </div>
            </div>
          </v-list-item-content>

          <v-list-item-icon class="pt-7">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </template>
    </v-list>

<template v-if="shopListIsFull">
  <v-card
    class="d-flex  flex-row-reverse pa-2 mt-2 mb-2"
    outlined
    tile
  >
    <v-card outlined elevation="0" tile class="pa-1 warning--text tile">Amount(₾) : {{totalAmount}}</v-card>
  </v-card>
</template>


  </v-card>

  <template v-if="shopListIsFull">
  <v-card
    class="d-flex  flex-row-reverse pa-2 mt-2 mb-2"
    outlined
    tile
  >
       <v-btn
      class="ma-2"
      outlined
      color="indigo"
      @click="SummaryOrder()"
    >
      Summary Order
    </v-btn>
  </v-card>
</template>

  </div>
  
  
</template>

<script>
export default {
    methods:{
      SummaryOrder(){
      this.$emit("SummaryOrder");
    },
        getImgUrl(itemUrl){
          var k =require("@/assets/img/"+itemUrl) 
          return k
        },
         deleteItem(item){

          this.editedShopItem.oldQuantity = item.stockQuantity;
          this.editedShopItem.newQuantity = 0;
          this.editedShopItem.isDelete = true;
          this.editedShopItem.stockListIndex = item.editedIndex;
          this.editedShopItem.indexOfShopList = this.shopList.indexOf(item);
          
          this.editedShopItem.sum = item.sum;
         
          this.$store.commit("editShop", this.editedShopItem)
      },
      
      saveDialog:function(item){



this.shopList[this.editedItem.indexOfList].price = this.editedItem.price;
this.shopList[this.editedItem.indexOfList].stockQuantity = this.editedItem.quantity;
//totlar deyisdir


this.shopList[this.editedItem.indexOfList].sum = this.editedItem.price * this.editedItem.quantity;

 
 this.editedShopItem.newQuantity = this.editedItem.quantity;
 this.editedShopItem.isDelete = false
 this.editedShopItem.sum = (this.editedShopItem.newQuantity)*this.editedItem.price

        
        this.editDialog=false;

        this.$store.commit("editShop", this.editedShopItem);

        this.$forceUpdate();
      },
      cancelDialog(){
        this.editDialog = false;
      },
      editItem(item){
        
        this.editDialog = true;

this.editedItem.name = item.name;
this.editedItem.price = item.price;
this.editedItem.indexOfList = this.shopList.indexOf(item);
this.editedItem.quantity = item.stockQuantity;

this.editedShopItem.oldSum = item.sum;
 this.editedShopItem.oldQuantity = item.stockQuantity;
 this.editedShopItem.stockListIndex = item.editedIndex;

 this.editedShopItem.indexOfShopList = this.shopList.indexOf(item);


      }
    },
  data: () => ({
    shopList:[],
    shopListIsFull : false,
    totalAmount : 0, 
    editDialog:false,
    testArr:[],
    editedItem:{
      name: "",
      price: 0,
      quantity: 0,
      indexOfList:-1
    },
    editedShopItem:{
      stockListIndex:-1,
      oldQuantity : 0,
      newQuantity : 0,
      isDelete:false,
      indexOfShopList:-1,
      sum:0,
      oldSum:0
    }
  })
  ,
  mounted() {
    
    this.shopList = this.$store.state.dess   
  },
  watch:{
shopList:function(){
    this.shopListIsFull = this.$store.state.dess.length > 0 ? true : false
    this.totalAmount = this.$store.state.totalAmount;
}
  }
};
</script>