import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function Cart() {
    const { cart, removeFromCart } = useContext(CartContext)
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            {
                cart.length === 0 ?

                    <div className="max-w-5xl mx-auto px-4 py-10">
                        <h1 className="text-4xl font-bold text-center mb-10  bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">   Your Cart
                        </h1>
                        <div className="bg-white border border-gray-200 rounded-3xl shadow-lg   p-10 flex flex-col items-center justify-center">
                            <div className="w-24 h-24 mb-4">
                                <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" className="w-full h-full opacity-80" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-700">  Your cart is empty
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Looks like you haven’t added anything yet.
                            </p>
                            <Link to="/products" className="hover:cursor-pointer mt-6 bg-blue-600 hover:bg-blue-700 text-white  px-6 py-2 rounded-xl font-semibold shadow transition-all"> Start Shopping  </Link>
                        </div>
                    </div>
                    :
                    <>

                        <div class="max-w-4xl mx-auto p-4">
                            <h2 class="text-2xl font-bold mb-6">Shopping Cart</h2>
                            {cart.map((item) => (
                                <div class="bg-white rounded-xl shadow-md p-4 mb-6 flex items-center">
                                    <img src={item.image} class="w-20 h-20 object-cover rounded-lg mr-4" />
                                    <div class="flex-1">
                                        <h3 class="font-semibold">{item.title}</h3>
                                        <p class="text-gray-500">${item.price}</p>
                                        <div class="flex items-center mt-2">
                                            <button onClick={() => removeFromCart(item.id)} class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 hover:cursor-pointer hover:text-blue-200">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div class="bg-white rounded-xl shadow-md p-4 mt-6">
                                <div class="flex justify-between text-lg font-semibold">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div class="flex justify-between mt-2 text-gray-600">
                                    <span>Tax</span>
                                    <span>${(totalPrice * 5 / 100).toFixed(2)}</span>
                                </div>
                                <div class="flex justify-between mt-2 text-xl font-bold"> <span>Total</span>    <span>${(totalPrice + (totalPrice * 5 / 100)).toFixed(2)}</span>
                                </div>
                                <button onClick={() => setOpenModal(true)} className="hover:cursor-pointer w-full bg-blue-600 text-white mt-4 py-2 rounded-lg hover:bg-blue-700"  >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>

                    </>
            }

            {openModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md relative">

                        <button onClick={() => setOpenModal(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black" >
                            <i className="fa-solid fa-xmark text-xl hover:cursor-pointer"></i>
                        </button>
                        <div className="text-center">
                            <i className="fa-solid fa-circle-info text-blue-600 text-4xl mb-3"></i>
                            <h2 className="text-xl font-semibold">Checkout Coming Soon</h2>
                            <p className="text-gray-600 mt-2">
                                Checkout functionality will be added in backend integration.
                            </p>
                            <button onClick={() => setOpenModal(false)} className="hover:cursor-pointer mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" >  Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
