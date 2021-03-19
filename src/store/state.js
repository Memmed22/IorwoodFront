
const state = {
    
    User:{Id:0},
    Options:{

        OverlayVisible:true
    },
    DataP:{
        Adı:'Sabri',
        No:60
    },

    //#region LOCAL SALE
    dess:[],
    totalAmount:0,
    editedIndex:-1,
    count:0, 
    editedShopIndex:-1,
    editShopItem:{
        stockListIndex : -1,
        oldQuantity : 0,
        newQuantity:0,
        isDelete:false,
        indexOfShopList:-1,
        sum:0
    },

    //#endregion

    //#region REFUND
    selectedOrderId:1,
    orderDetails:[],
    refundList:[]

    //#endregion
}

export default state
