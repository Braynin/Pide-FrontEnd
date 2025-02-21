"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchData } from "../components/data/dataProvider";

export default function SearchResults() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  const [products, setProducts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const queryFromURL = searchParams.get("query") || "";
    setSearchQuery(queryFromURL);
    console.log("Query desde URL:", queryFromURL);
  }, [searchParams]);

  useEffect(() => {
    async function loadData() {
      try {
        const { products, restaurants } = await fetchData();

        setProducts(products || []);
        setRestaurants(restaurants || []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (
      !searchQuery.trim() ||
      products.length === 0 ||
      restaurants.length === 0
    ) {
      setFilteredProducts([]);
      setFilteredRestaurants([]);
      return;
    }

    const filteredProducts = products.filter(
      (p) =>
        p?.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p?.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const restaurantIds = new Set(filteredProducts.map((p) => p.restaurante));

    const filteredRestaurants = restaurants.filter((r) =>
      restaurantIds.has(r._id)
    );

    setFilteredProducts(filteredProducts);
    setFilteredRestaurants(filteredRestaurants);
  }, [searchQuery, products, restaurants]);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">
        Resultados para: "{searchQuery}"
      </h2>

      {filteredRestaurants.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-8">Restaurantes</h3>
          <div className="flex flex-wrap gap-4 justify-items-start">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant._id} className="text-center">
                <img
                  src={restaurant?.imagenPrincipal || "/placeholder.jpg"}
                  alt={restaurant?.nombre || "Sin nombre"}
                  className="w-24 h-24 object-cover rounded-full mx-auto"
                />
                <h3 className="text-lg font-semibold mt-2">
                  {restaurant?.nombre || "Nombre no disponible"}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mt-20 mb-7">Productos</h3>
          {filteredRestaurants.map((restaurante) => {
            const productosDelRestaurante = filteredProducts.filter(
              (p) => p.restaurante === restaurante._id
            );
            return (
              <div key={restaurante._id} className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={restaurante?.imagenPrincipal || "/placeholder.jpg"}
                    alt={restaurante?.nombre || "Sin nombre"}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <h3 className="text-xl font-semibold">
                    {restaurante?.nombre || "Nombre no disponible"}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-4 justify-items-start">
                  {productosDelRestaurante.map((product) => (
                    <div
                      key={product._id}
                      className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                      <img
                        src={product?.imagen || "/placeholder.jpg"}
                        alt={product?.nombre || "Sin nombre"}
                        loading="lazy"
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">
                          {product?.nombre || "Nombre no disponible"}
                        </h3>
                        <p className="text-zinc-400 text-sm">
                          {product?.descripcion || "Descripción no disponible"}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-lg text-black font-bold">
                            S/. {product?.precio?.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
