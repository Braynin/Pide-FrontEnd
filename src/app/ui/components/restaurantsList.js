import React from "react";

async function getRestaurants() {
  try {
    const res = await fetch("http://localhost:5000/api/restaurants", {
      cache: "no-store", // Evita que Next.js use datos en caché
    });

    if (!res.ok) throw new Error("Error al obtener los datos");

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    return [];
  }
}

export default async function RestaurantsList() {
  const restaurants = await getRestaurants();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Restaurantes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant._id} className="border p-4 rounded shadow">
              <img
                src={restaurant.imagen}
                alt={restaurant.nombre}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">
                {restaurant.nombre}
              </h3>
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
