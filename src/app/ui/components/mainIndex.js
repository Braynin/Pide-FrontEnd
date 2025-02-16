"use client";
import { useState, useEffect } from "react";
import { getProducts } from "../../api/products.js"; // Ajusta la ruta
import { getRestaurants } from "../../api/restaurants.js"; // Ajusta la ruta
import CategoryCarousel from "../components/categoryCarousel.jsx"; // Importa el carrusel

export default function MainIndex() {
  const [categoria, setCategoria] = useState("");
  const [products, setProducts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // Cargar productos y restaurantes al montar el componente
  useEffect(() => {
    async function fetchData() {
      const prods = await getProducts();
      const rests = await getRestaurants();
      setProducts(prods);
      setRestaurants(rests);
    }
    fetchData();
  }, []);

  // Actualizar la lista filtrada cada vez que cambien la categoría o los arrays
  useEffect(() => {
    if (!categoria) {
      setFilteredRestaurants(restaurants);
      return;
    }

    const filteredProducts = products.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );

    const restaurantIdsSet = new Set(
      filteredProducts.map((p) => p.restaurante)
    );

    const filtered = restaurants.filter((r) => restaurantIdsSet.has(r._id));
    setFilteredRestaurants(filtered);
  }, [categoria, products, restaurants]);

  return (
    <div className="p-4">
      {/* Carrusel de categorías */}
      <CategoryCarousel
        products={products}
        setCategoria={setCategoria}
        categoria={categoria}
      />

      {/* Lista de restaurantes con Flexbox */}
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden 
                        transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Imagen */}
              <img
                src={restaurant.imagenPrincipal}
                alt={restaurant.nombre}
                className="w-full h-48 object-cover"
              />

              {/* Información */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{restaurant.nombre}</h3>
                <p className="text-gray-600">{restaurant.categoria}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    {restaurant.dirección}
                  </span>
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    {restaurant.rating || "4.5"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full">No hay restaurantes disponibles.</p>
        )}
      </div>
    </div>
  );
}
