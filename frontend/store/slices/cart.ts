import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/components/ui/ProductCard";

interface AuthState {
  products: IProduct[];
}

const INITIAL_STATE_CART: AuthState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE_CART,
  reducers: {
    clearCart(state) {
      state.products = INITIAL_STATE_CART.products;
    },
  },
});

export const { clearCart } = cartSlice.actions;

export { INITIAL_STATE_CART, cartSlice };

export default cartSlice.reducer;
