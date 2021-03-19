<template>
  <v-card> 

     <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      class="elevation-1"
    >
    
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text--secondary">STOCK LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
 <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      >
      </v-text-field>

      
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
             
              <v-card-title>
                <span class="headline">{{ editedItem.name }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="editedItem.stockQuantity"
                        label="Quantity"
                        value=" "
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
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          v-bind:disabled="item.shoped"
          medium
          class="mr-2 d-flex p-2"
          @click="editItem(item, $event)"
          @mouseover="testClick(item)"
        >
          {{ item.shoped == true ? "mdi-shopping-outline" : "mdi-shopping" }}
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>



<script>
import axios from "axios";

export default {
  components: {},
  data: () => ({
    dialog: false,
    dialogDelete: false,
    info: null,
    vote: false,
    editShopItem:{
     type: Array,
      required: false
    },
    icon: "mdi-shopping",
    currentItem: null,
    search:'',
    clickedBtn: null,
   
    headers: [
      {
        text: "Name",
        align: "start",
        width:"35%",
        sortable: false,
        value: "name",
      },

      { text: "Categoy", width:"25%", value: "category.name" },
      { text: "Price", width:"15%", value: "price" },
      { text: "Quantity",  width:"15%",value: "stockQuantity" },
      { text: "hidden", align: " d-none", value: "shopped" },
      { text: "hidden", align: " d-none", value: "icon" },
      { text: "image", align: " d-none", value: "image" },
      { text: "Actions",  width:"10%",value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id:0,
      name: "",
      category: "",
      price: 0,
      stockQuantity: 0,
      shopped: false,
      icon: "mdi-shopping",
      editedIndex:-1,
      editQuantity:0
    },
    defaultItem: {
      name: "",
      category: "",
      price: 0,
      stockQuantity: 0,
      icon: "mdi-shopping",
      shopped: false, 
     
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    editShopItem: {
      
      handler:function(val, oldval) {  
       if(this.editShopItem.stockListIndex != -1){
        var index = this.editShopItem.stockListIndex;
        var localSum = (this.editShopItem.oldQuantity - this.editShopItem.newQuantity);
        
        this.desserts[index].stockQuantity  = this.desserts[index].stockQuantity + localSum
        
        
        if(this.editShopItem.isDelete){
          this.desserts[index].shoped = false;
          this.$forceUpdate();
        
        }
      }
     },
        deep:true
            }
    ,
  },

  created() {
    this.initialize();
  },
  mounted() {
    
    axios
      .get("https://localhost:44376/admin/product/getall")
      .then((response) => (this.desserts = response.data.data));
    
    this.editShopItem = this.$store.state.editShopItem;
  },

  methods: {
    initialize() {},

    editItem: function (item, event) {
      this.currentItem = item;

      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
this.editedItem.stockQuantity = 0;
      event.stopPropagation();

      this.dialog = true;
    },
    testClick(item){
     // alert(this.desserts[this.desserts.indexOf(item)].shoped)
    }
    ,
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        
        //Object.assign(this.desserts[this.editedIndex], this.editedItem)

if(this.editedItem.stockQuantity * this.editedItem.price == 0)
{
  //sonra daha sweet bisey cixa biler
  alert("Urun sayi veya qiymeti '0' ola bilmez ...");
  return;
}
        this.editedItem.sum =
          this.editedItem.stockQuantity * this.editedItem.price;
        this.editedItem.icon = true;
        
        this.editedItem.editedIndex = this.editedIndex;
        this.$store.commit("addToShop", this.editedItem);

      

        this.currentItem.shoped = true;
        this.currentItem.editedIndex= this.editedItem;

        //this.currentItem.shoped = this.shopedList.indexOf(this.editedItem).icon;

        this.currentItem.stockQuantity =
          this.currentItem.stockQuantity - this.editedItem.stockQuantity;
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>