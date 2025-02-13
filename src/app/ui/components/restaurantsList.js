"use client"; // Habilita interactividad en Next.js

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
  const [categoria, setCategoria] = useState(""); // Estado para categoría

  useEffect(() => {
    const fetchData = async () => {
      console.log("🔎 Solicitando restaurantes con categoría:", categoria); // Depuración
      const data = await getRestaurants(categoria);
      setRestaurants(data);
    };
    fetchData();
  }, [categoria]); // Se ejecuta cuando cambia la categoría

  const categorias = ["Makis", "Pizzeria", "Cafeteria", "Criolla","Chifa", "Polleria", "Hamburgueseria", "Cevicheria", "Broasteria","Alitas", "Caldos", "Menu", "Anticucheria"];

  return (
    <div className="p-4">
      

      {/* Botones de filtro */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCategoria("")}
          className={`px-4 py-2 rounded ${categoria === "" ? "bg-red-500 text-white" : "bg-gray-200"}`}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded ${categoria === cat ? "bg-red-500 text-white" : "bg-gray-200"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de restaurantes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant._id} className="border p-4 rounded shadow">
              <img
                src={restaurant.imagenLogo}
                alt={restaurant.nombre}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{restaurant.nombre}</h3>
              <p className="text-gray-600">{restaurant.categoría}</p>
              <p className="text-gray-500">{restaurant.dirección}</p>
            </div>
          ))
        ) : (
          <p>No hay restaurantes disponibles.</p>
        )}
      </div>
    </div>
  );
}
