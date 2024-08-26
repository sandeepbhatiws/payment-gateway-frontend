
'use client';
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart, removeCart, updateCartAddQty, updateCartMinusQty } from '../redux-toolkit/slices/cartSlices';
import useRazorpay from "react-razorpay";
import axios from 'axios';

export default function page() {
    const getCartItems = useSelector((state) => state.cart.cart)

    const [Razorpay] = useRazorpay();

    const placeOrder = () => {
        const shippingDetails = {
            address: "testing address"
        }
        const userId = 1001;
        const productDetails = getCartItems.map(
            (c) => {
                return {
                    productId: c.id,
                    qty: c.qty,
                    price: c.price,
                    total: c.qty * c.price,
                }
            }
        )

        axios.post(
            "http://localhost:5005/api/frontend/orders/place-order",
            {
              user_id: userId,
              product_details: productDetails,
              order_total: 5000,
              shipping_details: shippingDetails,
            }
        ).then(
            (success) => {
                console.log(success)
                if (success.data.data.status) {
                   openPaymentPopUp(success.data.data.id, success.data.data);
                } else {
                    console.log('Unable to place order');
                }
            }
        ).catch(
            () => {

            }
        )
    }


    const openPaymentPopUp = (order_id, razorpayOrder) => {
        const options = {
            key: "rzp_test_7xIni0RPTlUpmY", // Enter the Key ID generated from the Dashboard
            amount: razorpayOrder.amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "WsCube Tech",
            description: "upskillingBharat",
            image: "https://www.wscubetech.com/images/wscube-tech-logo.svg",
            order_id: razorpayOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
              
              console.log(response)
              alert('success')
                axios.post("http://localhost:5005/api/frontend/orders/confirm-order",
                    { order_id: response.razorpay_order_id, payment_id: response.razorpay_payment_id, status: 2 }
                ).then(
                    (success) => {
                        if (success.data.status) {
                            // navigator(`/order-summary/${success.data.order_id}/true`);
                            // dispatcher(emptyCart());
                        } else {
                            // notify(success.data.msg, "error");
                        }
                    }
                ).catch(
                    (error) => {
                        notify("Client error", "error");
                    }
                )
            },
            prefill: {
                name: "sandeep Bhati",
                email: "sandeep@gmail.com",
                contact: "price",
            },
            theme: {
                color: "#ff4252",
            },
        };



        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {

          console.log(response);
          alert('error')
          axios.post("http://localhost:5005/api/frontend/orders/confirm-order",
            { order_id: response.razorpay_order_id, payment_id: response.razorpay_payment_id, status: 3 }
        ).then(
            (success) => {
                if (success.data.status) {
                    // navigator(`/order-summary/${success.data.order_id}/true`);
                    // dispatcher(emptyCart());
                } else {
                    // notify(success.data.msg, "error");
                }
            }
        ).catch(
            (error) => {
                notify("Client error", "error");
            }
        )
            // axios.post("http://localhost:5000/order/razorpay-transaction-handle",
        //         { amount: razorpayOrder.amount, razorpay_response: response.error.metadata, order_id }
        //     ).then(
        //         (success) => {
        //             notify(success.data.msg, "error");
        //             console.clear();
        //         }
        //     ).catch(
        //         (error) => {
        //             console.clear();
        //             console.log(error.message);
        //             notify("Client error", "error");
        //         }
        //     )
        //     // alert(response.error.code);
        //     // alert(response.error.description);
        //     // alert(response.error.source);
        //     // alert(response.error.step);
        //     // alert(response.error.reason);
        //     // alert(response.error.metadata.order_id);
        //     // alert(response.error.metadata.payment_id);
        });

        rzp1.open();
    }

    // console.log(getCartItems);
    const dispatch = useDispatch()

  return (
    <div class="container mx-auto mt-10">
    <div class="flex shadow-md my-10">
      <div class="w-3/4 bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">{getCartItems.length} Items</h2>
        </div>
        <div class="flex mt-10 mb-5">
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
        </div>

        {
            getCartItems.map((value,index) => (

                <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                    <div class="flex w-2/5">
                        <div class="w-20">
                        <img class="h-24" src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z" alt="" />
                        </div>
                        <div class="flex flex-col justify-between ml-4 flex-grow">
                        <span class="font-bold text-sm">{ value.title }</span>
                        <span class="text-red-500 text-xs">Apple</span>
                        <a onClick={ () => dispatch(removeCart(value.id))  } class="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer">Remove</a>
                        </div>
                    </div>
                    <div class="flex justify-center w-1/5">
                        <svg class="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512" onClick={ () => dispatch(updateCartMinusQty(value.id)) }><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                        </svg>

                        <input class="mx-2 border text-center w-8" type="text" value={ value.qty }/>

                        <svg class="cursor-pointer fill-current text-gray-600 w-3" viewBox="0 0 448 512" onClick={ () => dispatch(updateCartAddQty(value.id)) }>
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                    </div>
                    <span class="text-center w-1/5 font-semibold text-sm">$400.00</span>
                    <span class="text-center w-1/5 font-semibold text-sm">$400.00</span>
                </div>

            ))
        }

        

        
        <a onClick={ () => dispatch(emptyCart())  }  class="flex font-semibold text-indigo-600 text-sm mt-10">
      
          <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Emtpy Cart
        </a>
      </div>

      <div id="summary" class="w-1/4 px-8 py-10">
        <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">Items 3</span>
          <span class="font-semibold text-sm">590$</span>
        </div>
        <div>
          <label class="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
          <select class="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - $10.00</option>
          </select>
        </div>
        <div class="py-10">
          <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
          <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full" />
        </div>
        <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
        <div class="border-t mt-8">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>$600</span>
          </div>
          <button onClick={placeOrder} class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>

    </div>
  </div>
  )
}
