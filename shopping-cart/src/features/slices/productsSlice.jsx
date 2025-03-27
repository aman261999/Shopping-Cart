import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        filteredProducts: [], 
        singleProduct: [], 
        cache: {}
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },

        filterProduct(state, action) {
            state.filteredProducts = action.payload
        },
        
        singleProduct(state, action) {
            state.singleProduct = action.payload;
        },
        setCache(state, action) {
            state.cache[action.payload.type] = action.payload.data; // Add cache reducer
        }
        
    }
})

export const { filterProduct, singleProduct, setProducts, setCache } = productsSlice.actions;
export default productsSlice.reducer;