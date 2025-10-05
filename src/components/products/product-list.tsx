import { ShoppingBag, Plus } from "lucide-react";
import { addToCart } from "@/store/cart-store";
import { numberWithComma } from "@/utils";

const products = [
  { id: "1", name: "Laptop", price: 200000 },
  { id: "2", name: "Headphones", price: 7000 },
  { id: "3", name: "Smartphone", price: 150000 },
];

export default function ProductList() {
  return (
    <div className="card bg-base-200 border border-base-300 w-full max-w-2xl mx-auto">
      <div className="card-body p-6">
        <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-[#2af4c2]" />
          Products
        </h2>

        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 border border-base-300 hover:border-[#2af4c2]/50 transition-colors"
            >
              <div className="card-body p-4">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-black text-[#2af4c2]">
                        ₦{numberWithComma(String(product.price))}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart({ ...product, quantity: 1 })}
                    className="btn bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 font-semibold gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
