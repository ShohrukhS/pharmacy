import { productsInCart, addToBasket } from '../data/cart.js';
import { products } from '../data/products.js';
import { priceInCent } from './utility/priceInCents.js';

let product = '';

products.forEach(eachItem => {
    product += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${eachItem.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${eachItem.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${eachItem.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${eachItem.rating.count}
            </div>
            </div>

            <div class="product-price">
                ${priceInCent(eachItem.priceInCents)} Сомон
            </div>
            
            <div class="product-quantity-container">
                <select>
                    <option selected="" value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${eachItem.id}">
            Ба сабат андоз
            </button>
        </div>
    `
})

document.querySelector('.js-product-grid').innerHTML = product;

function updateBasketQuantity(){
    let totalItem = 0;

        productsInCart.forEach(countingItem => { 
           totalItem += countingItem.quantity
            document.querySelector('.js-cart-quantity').innerHTML = totalItem
    })
}

const addToCartBtn = document.querySelectorAll('.js-add-to-cart')

addToCartBtn.forEach(eachCart => {
    eachCart.addEventListener('click', () => {
        const productId = eachCart.dataset.productId
       
        addToBasket(productId);

        updateBasketQuantity();
    })
})




