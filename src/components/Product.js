import React from "react";

export default function Product(props){
     return(
         <div className = "card">
             <img src = {props.item.imgUrl} className = "cardMainImage" alt={props.item.altImg}></img>
             <div className="cardInfoProduct">
                 <h2>{props.item.name}</h2>
                 <div className="cardInfoProductPrice">
                     <img src = "images/icons/cart-plus.svg" className = "cardCart" alt = "Agregar al carrito"></img>
                     <p>${props.item.price}</p>
                 </div>
             </div>

         </div>
     )
}