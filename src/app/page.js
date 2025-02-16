import MainIndex from "./ui/components/mainIndex.js";
import { getRestaurants } from "../app/api/restaurants.js";
import { getProducts } from "../app/api/products.js";

export default async function Home() {
  const restaurants = await getRestaurants();
  const products = await getProducts();
  return (
    <main>
      <div>
        <MainIndex restaurants={restaurants} products={products} />
      </div>
    </main>
  );
}
