
import Vue from 'vue'
import router from '../router';
import state from './state';

const mutations = {

    Login(state,{DataP,RememberP}){

        state.User=DataP;
       
        if(RememberP){

            Vue.$cookies.set('User',DataP);
            window.$cookies.set('User',DataP);
           
        }


    },

    LogOut(state){
        
        state.User={Id:0};
        Vue.$cookies.remove('User');
        router.push({name:'Home'});
    },

    OverlayShow(state){
        
        state.Options.OverlayVisible=true;
    },
    OverlayHide(state){
        
        state.Options.OverlayVisible=false;
    },
    SetIsx(state,DataX){
        state.DataP.No=DataX.No;
    },

    //#region LOCAL SALE SECTION
    addToShop(state, item){
        state.dess.push(item);
        
        state.totalAmount += item.sum;
        var indexOf = state.dess.indexOf(item);
        state.editedIndex = -1;
        //state.dess[indexOf].shoped = true;

    },
    assignIndex(state)
    {
        state.editIndex = -1;
    },
    clearShopList(state)
    {
state.dess = [];
    }
    ,
    editShop(state, item)
    {
       
     state.editShopItem.stockListIndex = item.stockListIndex;
     
     state.editShopItem.oldQuantity = item.oldQuantity;
      state.editShopItem.newQuantity = item.newQuantity;
      state.editShopItem.indexOfShopList = item.indexOfShopList;
      state.editShopItem.isDelete = item.isDelete;
     
      
      if(item.isDelete){
        state.dess.splice(item.indexOfShopList,1);
        state.totalAmount -= item.sum;   
      }
      else
      {        state.totalAmount = state.totalAmount + (item.sum - item.oldSum);
              }

    }
    ,
    Increamnet(state){
state.count++;
    },
    //#endregion

    //#region  REFUND
    
    setOrderDetail(state, orderDetails)
    {
        if(state.orderDetails.length > 0)
          state.orderDetails.splice(0);
        orderDetails.forEach(element => {
            state.orderDetails.push(element)
        });
        
        state.selectedOrderId = orderDetails[0].orderHeaderId;
    },

    setRefundList(state, item){
state.refundList.push(item);
    }
,
    //#endregion





}

export default mutations

