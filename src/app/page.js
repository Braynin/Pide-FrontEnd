import MainIndex from "./ui/components/mainIndex.js";
import { getRestaurants } from "../app/api/restaurants.js";

export default async function Home() {
  const restaurants = await getRestaurants();
  return (
    <main>
      <div>
        <MainIndex restaurants={restaurants} />
      </div>
    </main>
  );
}
