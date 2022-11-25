import React, { useEffect, useState } from "react";
import CheckoutCostSummary from "./CheckoutCostSummary";
import CheckoutProducts from "./CheckoutProducts";
import data from "../../data/productCart";
import "./checkoutProductsResume.css";
import { ScrollPanel } from "primereact/scrollpanel";
import { Cart } from "../../service/Cart";
import { ProductService } from "../../service/productService";
// import { Link } from "react-router-dom";

const _cart = new Cart();
const _productService = new ProductService();

export default function CheckoutProductsResume() {
  const [cartData, setCartData] = useState({});
  const [products, setProducts] = useState([]);
  const [productsSmall, setProductsSmall] = useState([]);

  let product_resume = data.map((item) => {
    return <CheckoutProducts key={item.id} item={item} />;
  });
  useEffect(() => {
    setCartData(_cart.getState());
    _productService
      .getProductsStore()
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.log(
          "Error al traer los productos de la tienda desde el sideBar",
          error
        );
      });
  }, []);

  useEffect(() => {
    if (products.length) {
      let keys = Object.keys(cartData);
      const productsSmall = keys.map((idProduct) => {
        const result = products.find((product) => product.id === idProduct);
        return (
          <CheckoutProducts
            key={idProduct}
            productData={result}
            productBuy={cartData[idProduct]}
          />
        );
      });
      setProductsSmall(productsSmall);
    }
  }, [cartData, products]);
  return (
    <>
      <div className="dc-checkout-products-resume">
        <div>
          <h4 className="dc-checkout-products-resume__title">
            Resumen de la compra
          </h4>
          <ScrollPanel
            style={{ width: "100%", height: "50vh" }}
            className="custombar2"
          >
            <div className="dc-checkout-products-resume__products">
              {productsSmall}
            </div>
          </ScrollPanel>
        </div>
        <div className="dc-checkout__order-summary">
          <div>
            <div className="dc-checkout__order-summary_container">
              <div className="dc-checkout__order-summary__info">
                <p className="dc-checkout__order-summary__info__title dc-font-size">
                  Subtotal
                </p>
                <p className="dc-font-size">
                  <strong>$</strong> 200.000
                </p>
              </div>
              <div className="dc-checkout__order-summary__info">
                <p className="dc-checkout__order-summary__info__title dc-font-size">
                  Envio
                </p>
                <p className="dc-checkout__font-size">
                  <strong>$</strong> 10.000
                </p>
              </div>
              <div className="dc-checkout__order-summary__info dc-font-size">
                <p className="dc-checkout__order-summary__info__title dc-font-size">
                  Total
                </p>
                <p className="dc-checkout__font-size">
                  <strong>$</strong> 210.000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
