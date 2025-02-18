// dataProvider.js
import { getProducts } from "../../api/products.js";
import { getRestaurants } from "../../api/restaurants.js";

const CACHE_KEY = "apiData";
const CACHE_EXPIRATION = 1000 * 60 * 5; // 5 minutos

function getCache() {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (!cachedData) return null;
  const { data, timestamp } = JSON.parse(cachedData);
  // Verifica si el cache ha expirado
  if (Date.now() - timestamp > CACHE_EXPIRATION) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
  return data;
}

function setCache(data) {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data, timestamp: Date.now() })
  );
}

export async function fetchData() {
  const cached = getCache();
  if (cached) {
    return cached;
  }
  const products = await getProducts();
  const restaurants = await getRestaurants();
  const data = { products, restaurants };
  setCache(data);
  return data;
}
