import { CartIcon } from "@/components/icons";

import { addToCart } from "@/store/cart-store";

import { numberWithComma } from "@/utils";

const products = [
  { id: "1", name: "Laptop", price: 200000 },
  { id: "2", name: "Headphones", price: 7000 },
  { id: "3", name: "Smartphone", price: 150000 },
];

export default function ProductList() {
  return (
    <div className="p-6 border border-gray-700 rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl text-left font-semibold mb-4">Products</h2>

      <ul className="divide-y divide-gray-600">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center py-2"
          >
            <div className="text-left">
              <p className="font-medium text-lg">{product.name}</p>
              <span className="text-md font-semibold text-gray-500">
                ₦{numberWithComma(String(product.price))}
              </span>
            </div>
            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="btn btn-primary btn-sm flex items-center gap-1"
            >
              <CartIcon />
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
