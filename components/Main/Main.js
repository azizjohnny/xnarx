import AboutUs from "../AboutUs/AboutUs";
import Hero from "../Hero/Hero";
import Consultation from "../Consultation/Consultation.js";
import { useEffect, useState } from "react";
import Tovar_nov from "../Tovar_noviy/Tovar_noviy";
import Sale_nov from "../Sale_tovar/Sale_tovar";
import Populyar_nov from "../Populyar_tovar/Populyar_tovar";

import Magazines from "../Magazines/Magazines";
import PopularCategories from "../PopularCategory/PopularCategories";

function Main() {
  const [mobile, setMobile] = useState(false);
  const [product, setProduct] = useState([]);
  const [cartItems, setCardItems] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [discountProduct, setDiscountProduct] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      const newCartItems = cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = [...cartItems, { ...product, qty: 1 }];
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      const newCartItems = cartItems.filter((x) => x.id !== product.id);
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = cartItems.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };

  const onAdds = (newProduct) => {
    const exist = cartItems.find((x) => x.id === newProduct.id);
    if (exist) {
      const newCartItems = cartItems.map((x) =>
        x.id === newProduct.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = [...cartItems, { ...newProduct, qty: 1 }];
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };
  const onRemoves = (newProduct) => {
    const exist = cartItems.find((x) => x.id === newProduct.id);
    if (exist.qty === 1) {
      const newCartItems = cartItems.filter((x) => x.id !== newProduct.id);
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = cartItems.map((x) =>
        x.id === newProduct.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };
  const onAdded = (discountProduct) => {
    const exist = cartItems.find((x) => x.id === discountProduct.id);
    if (exist) {
      const newCartItems = cartItems.map((x) =>
        x.id === discountProduct.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = [...cartItems, { ...discountProduct, qty: 1 }];
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };
  const onRemoved = (discountProduct) => {
    const exist = cartItems.find((x) => x.id === discountProduct.id);
    if (exist.qty === 1) {
      const newCartItems = cartItems.filter((x) => x.id !== discountProduct.id);
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    } else {
      const newCartItems = cartItems.map((x) =>
        x.id === discountProduct.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCardItems(newCartItems);
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
  };

  return (
    <main>
      <Magazines />
      <Hero />
      <PopularCategories />

      <Populyar_nov
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
        mobile={mobile}
        product={product}
      />
      {/* <TashkentPools /> */}
      <Tovar_nov
        mobile={mobile}
        cartItems={cartItems}
        onAdd={onAdds}
        onRemove={onRemoves}
        product={newProduct}
      />
      {/* <BuyAll /> */}
      {/* <AboutUs /> */}
      <Sale_nov
        mobile={mobile}
        cartItems={cartItems}
        onAdd={onAdded}
        onRemove={onRemoved}
        product={discountProduct}
      />
      <PopularCategories />
    </main>
  );
}

export default Main;
