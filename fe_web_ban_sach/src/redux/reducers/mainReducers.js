import app from "./app.reducer.js";
import { combineReducers } from "redux";
import drawer from "./drawer.reducer.js";
import filter from "./filter.reducer.js";
import home from "./home.reducer.js";
import modal from "./modal.reducer.js";
import product from "./product.reducer.js";
import shop from "./shop.reducer.js";

const rootReducer = combineReducers({
    app,
    modal,
    filter,
    home,
    drawer,
    shop,
    product,
});

export default rootReducer;
