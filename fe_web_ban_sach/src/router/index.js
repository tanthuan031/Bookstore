import * as React from "react";

import { Route, Routes } from "react-router-dom";

import About from "../pages/About/About.js";
import Cart from "../pages/Cart/Cart.js";
import Home from "../pages/Home/Home.js";
import Product from "../pages/Product/Product.js";
import Shop from "../pages/Shop/Shop.js";

class Router extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
            </Routes>
        );
    }
}

export default Router;
