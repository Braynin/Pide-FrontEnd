"use client";
import { useState, useEffect } from "react";

async function getRestaurants(categoria = "") {
  try {
    const url = categoria
      ? `http://localhost:5000/api/restaurants?categoria=${encodeURIComponent(categoria)}`
      : `http://localhost:5000/api/restaurants`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener los datos");

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    return [];
  }
}

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestaurants(categoria);
      setRestaurants(data);
    };
    fetchData();
  }, [categoria]);

  const categorias = [
    "Makis", "Pizzeria", "Cafeteria", "Criolla", "Chifa", "Polleria",
    "Hamburgueseria", "Cevicheria", "Broasteria", "Alitas", "Caldos",
    "Menu", "Anticucheria"
  ];

  return (
    <div className="p-4">
      {/* Botones de filtro */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setCategoria("")}
          className={`px-4 py-2 rounded font-medium ${categoria === "" ? "bg-red-500 text-white" : "bg-gray-200"}`}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded font-medium ${categoria === cat ? "bg-red-500 text-white" : "bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de restaurantes con Flexbox */}
      <div className="flex flex-wrap gap-4 justify-center">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden 
                        transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Imagen */}
              <img
                src={restaurant.imagenCategoria}
                alt={restaurant.nombre}
                className="w-full h-48 object-cover"
              />
              
              {/* Información */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{restaurant.nombre}</h3>
                <p className="text-gray-600">{restaurant.categoría}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">{restaurant.dirección}</span>
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">{restaurant.rating || "4.5"}</span>
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
