"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchData } from "../../components/data/dataProvider";

export default function Restaurante() {
  const { id: restaurantId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchData();
      const filtered = data.products.filter(
        (p) => p.restaurante === restaurantId
      );
      setFilteredProducts(filtered);
      setCategories([...new Set(filtered.map((p) => p.categoria))]);
      setRestaurant(data.restaurants.find((r) => r._id === restaurantId));
    }
    if (restaurantId) loadData();
  }, [restaurantId]);

  return (
    <main className="flex flex-row">
      <section className="w-[260px] border-r-4 border-gray-300">
        {restaurant && restaurant.imagenPrincipal && restaurant.imagenLogo ? (
          <>
            <div className="relative mb-6">
              <Image
                src={restaurant.imagenPrincipal}
                alt={restaurant.nombre || "Restaurante"}
                width={260}
                height={144}
                loading="lazy"
                className="object-cover border-b-4 border-gray-300"
              />
              <Image
                src={restaurant.imagenLogo}
                alt={restaurant.nombre || "Restaurante"}
                width={70}
                height={70}
                loading="lazy"
                className="object-cover absolute -bottom-8 left-0"
              />
            </div>
          </>
        ) : null}
        <h1 className="text-2xl mb-4 px-4 font-bold text-black">
          {restaurant?.nombre}
        </h1>
        <ul className="px-4">
          {categories.map((category) => (
            <li className="mb-2 last-of-type:mb-0" key={category}>
              <Link href={`#${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="w-full pl-20 max-h-svh overflow-y-auto">
        <h2 className="text-4xl font-black mb-4">Comidas</h2>
        {categories.map((category) => {
          const productosPorCategoria = filteredProducts.filter(
            (p) => p.categoria === category
          );
          return (
            <div key={category} className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <h3 id={category} className="text-xl font-bold">
                  {category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-4 justify-items-start">
                {productosPorCategoria.map((product) => (
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
      </section>
    </main>
  );
}
