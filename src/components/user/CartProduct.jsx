import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, fetchCarts } from "../../store/cart-slice";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IoMdRemoveCircle } from "react-icons/io";
import { CgAddR } from "react-icons/cg";

export default function Cart() {
  const carts = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const handleQuantityChange = (cartId, newQuantity) => {};

  const handleRemoveItem = (cartId) => {
    dispatch(deleteCart(cartId));
  };

  const totalPrice = carts.reduce(
    (sum, cart) => sum + cart.quantity * cart.Product.price,
    0
  );

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 data-[closed]:translate-x-full">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-0.5" />
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {carts.map((cart) => (
                          <li key={cart.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={cart.Product.imgUrl}
                                alt={cart.Product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{cart.Product.name}</h3>
                                  <p className="ml-4">Rp.{cart.Product.price}</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(cart.id, cart.quantity - 1)
                                    }
                                    disabled={cart.quantity <= 1}
                                  >
                                    <IoMdRemoveCircle className="text-xl" />
                                  </button>
                                  <span className="mx-2 font-semibold">
                                    {cart.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(cart.id, cart.quantity + 1)
                                    }
                                  >
                                    <CgAddR className="text-xl" />
                                  </button>
                                </div>
                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => handleRemoveItem(cart.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>Rp.{totalPrice}</p>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button className="flex  items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700">
                      BUY NOW
                    </button>
                    {/* Tombol "Back to Shop" */}
                    <button className="mt-4 text-gray-500 hover:text-purple-700">
                      Back to Shop
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
