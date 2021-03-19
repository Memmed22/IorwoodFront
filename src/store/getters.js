import state from "./state";

const getters = {

    IsLogined:state=> {

        if (state.User.Id > 0)
            return true;
        return false;
    },
    IsCompany:state=>{

        if(state.User.ComId>0)
            return true;
        return false;
    },
    BeeTokenP:state=>{
        return state.User.TokenP;
    },
    LoginType:state=>{
        if(state.User.Id<=0) return 'N';
        if(state.User.ComId>0) return 'C';
        if(state.User.Id>0) return 'G';
    },
    IsOverlay:state=>{
        return state.Options.OverlayVisible;
    },
    GetIsx:state=>{
        return (state.DataP.No>100)?true:false;
    },
    // GetEditedShopItem:state=>{
    //     return (state.editShopItem);
    // }

    GetOrderDetailList:state=> {
        return (state.orderDetails);
    },

    isOrderDetailEmpty:state => {
        return (state.orderDetails.Length > 0 ? false:true)
    },
    GetRefundList(state){
        return state.refundList;
    },
 
}

export default getters
