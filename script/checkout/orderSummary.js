import { productsInCart, removeCartItem, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { priceInCent } from "../utility/priceInCents.js";
// using external libraries to get datas for dates functions
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOptions } from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';


// calculating the dates
const today = dayjs()
// adding the date
const deleveryDate = today.add(7, 'day')
// date format that converts to string for easily readability
deleveryDate.format('dddd, MMMM D'); 


export function renderOrderSummary() {

    let cartSummary = '';

    productsInCart.forEach(checkoutItem => {

        const productId = checkoutItem.productId

        const matchingProduct = getProduct(productId)

        const deliveryOptionId = checkoutItem.deliveryOptionId;

        const deliveryOption = getDeliveryOptions(deliveryOptionId)

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateToString = deliveryDate.format('dddd, MMMM D');
    
        cartSummary += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateToString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${priceInCent(matchingProduct.priceInCents)} CM
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${checkoutItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHtml(matchingProduct, checkoutItem)}
                    </div>
                </div>
            </div>
        `;
    });
    document.querySelector('.checkout-payment').innerHTML = cartSummary;

    // function for delivery option
    function deliveryOptionsHtml(matchingProduct, checkoutItem) {
        // to combine all the options html elements
        let html = '';

        deliveryOptions.forEach(deliveryOption => {
            // code for delivery option
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateToString = deliveryDate.format('dddd, MMMM D');
            // code for delivery price
            const priceInString = deliveryOption.priceInCents === 0 ? 'FREE' : `$${priceInCent(deliveryOption.priceInCents)} -`;

            const isChecked = deliveryOption.id === checkoutItem.deliveryOptionId

            html += `
                <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" 
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                ${dateToString}
                            </div>
                            <div class="delivery-option-price">
                                ${priceInString}   Shipping
                            </div>
                        </div>
                </div>
            `
        });
        return html;
    }

    document.querySelectorAll('.js-delete-link')
        .forEach(link => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeCartItem(productId)
                const removing = document.querySelector(`.js-cart-item-container-${productId}`)
                removing.remove();
                
                renderPaymentSummary();
            });
    });

        
    //interactive of delivery-option functionality
    document.querySelectorAll('.js-delivery-option').forEach(element => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
};

