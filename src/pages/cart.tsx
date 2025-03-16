import { useChunk } from "stunk/react";

import { DeleteIcon } from "@/components/icons";
import ProductList from "@/components/products/product-list";
import GoBack from "@/components/shared/go-back";
import Heading from "@/components/shared/heading";

import { cartChunk, removeFromCart, clearCart } from "@/store/cart-store";

import { numberWithComma } from "@/utils";

export default function ShoppingCart() {
  const [cart] = useChunk(cartChunk);

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Heading text="Shopping Cart" />
      <ProductList />
      <div className="p-6 border-gray-700 border rounded-lg w-full max-w-md mx-auto mt-6">
        <h2 className="text-2xl text-left font-semibold mb-4">Shopping Cart</h2>

        {cart.items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-600">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-2"
              >
                <div className="text-left">
                  <p className="font-medium">{item.name}</p>
                  <span className="text-md font-semibold text-gray-500">
                    ₦{numberWithComma(item.price.toFixed(2))} × {item.quantity}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-ghost btn-sm text-red-500"
                >
                  <DeleteIcon />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold">
            Total: ₦{numberWithComma(totalPrice.toFixed(2))}
          </p>
          <button onClick={clearCart} className="btn btn-error btn-sm">
            Clear Cart
          </button>
        </div>
      </div>
      <GoBack />
    </>
  );
}
