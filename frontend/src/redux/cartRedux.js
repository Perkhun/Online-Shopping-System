import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    getCart: (state, action) => {
      state.quantity = action.payload.quantity;
      state.products = action.payload;
      state.total = action.payload.total;
    },
/*     addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    }, */
    addCart: (state, action) => {
      state.quantity += action.payload.quantity;
      if(!state.products.length || state.products.findIndex(item => item._id === action.payload._id && item.year_of_publication === action.payload.year_of_publication && item.publication === action.payload.publication) === -1){
        state.products.unshift(action.payload);
      }else{
        state.products[
          state.products.findIndex(item => item._id === action.payload._id && item.year_of_publication === action.payload.year_of_publication && item.publication === action.payload.publication)
        ].quantity += action.payload.quantity;
        state.products[
          state.products.findIndex(item => item._id === action.payload._id && item.year_of_publication === action.payload.year_of_publication && item.publication === action.payload.publication)
        ].time += action.payload.time;
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteCart:(state, action) => {
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.price * action.payload.quantity;
      state.products.splice(
        state.products.findIndex(item => item._id === action.payload._id && item.year_of_publication === action.payload.year_of_publication && item.publication === action.payload.publication),
        1
      );
    },
    updateaddCart:(state, action) => {
      state.quantity += 1;
      state.total += action.payload.price;
      state.products[
        state.products.findIndex(item => item._id === action.payload._id && item.year_of_publication === action.payload.year_of_publication && item.publication === action.payload.publication)
      ].quantity = action.payload.quantity
    },
    updatereduceCart:(state, action) => {
      state.quantity -= 1;
      state.total -= action.payload.price;
      state.products[
        state.products.findIndex(item => item._id === action.payload._id && item.year_of_publication === action.payload.year_of_publication && item.publication === action.payload.publication)
      ].quantity = action.payload.quantity
    },
    clearCart:(state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0
    },
    /* deleteProductSuccess: (state, action) => {
      // state.products.splice(
      //   state.products.findIndex((item) => item._id === action.payload._id),
      //   1
      // );
      // console.log(action.payload.price);
      const nextcartitems = state.products.filter(
        (cartitem) => cartitem._id !== action.payload
      );
      state.products = nextcartitems;
      state.quantity = nextcartitems.length;
      let tots = 0;
      let amount = 0;
      nextcartitems.forEach((item) => {
        amount += item.quantity;
        tots = item.quantity * item.price;
        console.log("total", tots);
        console.log("amount", amount);
      });
      state.total = tots;
    }, */
  },
});

export const {
  getCart,
  addCart, 
  deleteCart, 
  updateaddCart, 
  updatereduceCart,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
