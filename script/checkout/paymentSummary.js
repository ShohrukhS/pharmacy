import { productsInCart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOptions } from '../../data/deliveryOption.js';
import { priceInCent } from '../utility/priceInCents.js';

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    productsInCart.forEach((cartItem) => {
       const product = getProduct(cartItem.productId)
        productPriceCents += product.priceInCents * cartItem.quantity

        const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceInCents
    })

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = `

        <div class="payment-summary-title">
            Хулосаи фармоиш
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
                $${priceInCent(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${priceInCent(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${priceInCent(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${priceInCent(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${priceInCent(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Фармоиш Диҳед
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}