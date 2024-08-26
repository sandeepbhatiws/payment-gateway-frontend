import { configureStore } from '@reduxjs/toolkit'
import  counterCart  from '../slices/cartSlices'

export const store = configureStore({
  reducer: {
    cart: counterCart,
  },
})