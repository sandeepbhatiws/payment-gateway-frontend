import { createSlice } from '@reduxjs/toolkit'


const getCartItems = () => {
  const cart = JSON.parse(localStorage.getItem('cartItems'));
  return  cart;
}

const getCartValue = getCartItems();
if(getCartValue == null){
  var getCartValu = [];
} else {
  var getCartValu = getCartValue;
}

const initialState = {
    cart: getCartValu,
}

export const counterCart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action) => {

       let data= state.cart.filter((v,i) =>v.id==action.payload.id)

      if(data.length==0){
        var cartItems = {
          id : action.payload.id,
          title : action.payload.title,
          image : action.payload.thumbnail,
          price: action.payload.price,
          discountPercentage : action.payload.discountPercentage,
          qty : 1
        }

        state.cart.push(cartItems);
        localStorage.setItem('cartItems',JSON.stringify(state.cart));
      } else {

        state.cart.map((v,i) => {
          if(v.id == action.payload.id){
            v.qty = v.qty+1;
          }
        })

        localStorage.setItem('cartItems',JSON.stringify(state.cart));
      }
      },
      removeCart: (state, action) => {
        let data= state.cart.filter((v,i) =>v.id != action.payload)
        state.cart = data;
        localStorage.setItem('cartItems',JSON.stringify(state.cart));
      },
      emptyCart: (state) => {
        localStorage.clear('cartItems');
        state.cart = [];
      },
      updateCartAddQty : (state, action) => {

        console.log(action.payload);
        state.cart.map((v,i) => {
          if(v.id == action.payload){
            v.qty = v.qty+1;
          }
        })

        localStorage.setItem('cartItems',JSON.stringify(state.cart));

      },
      updateCartMinusQty : (state, action) => {

        state.cart.map((v,i) => {
          if(v.id == action.payload){
            if(v.qty > 1){
              v.qty = v.qty-1;
            }
            
          }
        })

        localStorage.setItem('cartItems',JSON.stringify(state.cart));

      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { addToCart, removeCart, emptyCart, updateCartAddQty, updateCartMinusQty } = counterCart.actions
  
  export default counterCart.reducer