import { configureStore } from "@reduxjs/toolkit"
import { itemsApi } from "./GetItems"


export const store = configureStore({
    reducer: {
        [itemsApi.reducerPath]: itemsApi.reducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(itemsApi.middleware),

})

