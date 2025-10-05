import { useChunk } from "stunk/react";
import { Trash2, ShoppingCart as CartIcon, Package, X } from "lucide-react";
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
    <div className="min-h-screen bg-base-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <Heading text="Shopping Cart" />

        <div className="space-y-6">
          {/* Products Section */}
          <ProductList />

          {/* Cart Section */}
          <div className="card bg-base-200 border border-base-300 w-full max-w-2xl mx-auto">
            <div className="card-body p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title text-2xl flex items-center gap-2">
                  <CartIcon className="w-6 h-6 text-[#2af4c2]" />
                  Your Cart
                </h2>
                {cart.items.length > 0 && (
                  <div className="badge badge-lg bg-[#2af4c2] text-neutral-900 border-none">
                    {cart.items.length}{" "}
                    {cart.items.length === 1 ? "item" : "items"}
                  </div>
                )}
              </div>

              {cart.items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <div className="bg-base-300 rounded-full w-24 h-24 flex items-center justify-center">
                      <Package className="w-12 h-12 opacity-40" />
                    </div>
                  </div>
                  <p className="text-xl font-semibold mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm opacity-60">
                    Add some products to get started
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cart.items.map((item) => (
                      <div
                        key={item.id}
                        className="card bg-base-100 border border-base-300"
                      >
                        <div className="card-body p-4">
                          <div className="flex justify-between items-center gap-4">
                            <div className="flex-1 text-left">
                              <h3 className="font-bold text-lg">{item.name}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-lg font-semibold text-[#2af4c2]">
                                  ₦{numberWithComma(item.price.toFixed(2))}
                                </span>
                                <div className="badge badge-sm badge-ghost">
                                  Qty: {item.quantity}
                                </div>
                                <span className="text-sm opacity-60">
                                  Total: ₦
                                  {numberWithComma(
                                    (item.price * item.quantity).toFixed(2)
                                  )}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="divider"></div>

                  <div className="card bg-base-100 border-2 border-[#2af4c2]/30">
                    <div className="card-body p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">
                          Cart Total:
                        </span>
                        <span className="text-3xl font-black text-[#2af4c2]">
                          ₦{numberWithComma(totalPrice.toFixed(2))}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={clearCart}
                          className="btn btn-error btn-lg flex-1 gap-2"
                        >
                          <X className="w-5 h-5" />
                          Clear Cart
                        </button>
                        <button className="btn btn-lg flex-1 bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 font-semibold gap-2">
                          <CartIcon className="w-5 h-5" />
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <GoBack />
        </div>
      </div>
    </div>
  );
}
