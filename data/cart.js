export let productsInCart = JSON.parse(localStorage.getItem('cart'))

if(!productsInCart){

    productsInCart = [
        {
            productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
            quantity: 1,
            deliveryOptionId: '1'
        },
        {
            productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
            quantity: 2,
            deliveryOptionId: '2'
        },
    ];
};

function toLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(productsInCart))
};

export function addToBasket(productId) {
    let matchingItem;

    productsInCart.forEach(eachItem => {
        if(productId === eachItem.productId){
            matchingItem = eachItem
        }
    })

    if(matchingItem){
        matchingItem.quantity += 1;

    } else {
        productsInCart.push(
            {
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            }
        )
    }
    toLocalStorage()
}


export function removeCartItem (productId) {
    const newCart = [];

    productsInCart.forEach(cartItem => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem)
        }
    })

    productsInCart = newCart;

    toLocalStorage()
}

export function updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;


    productsInCart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    })

    matchingItem.deliveryOptionId = deliveryOptionId
    toLocalStorage()
}