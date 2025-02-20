"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchData } from "../components/dataProvider.js";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const { products, restaurants } = await fetchData();
      setProducts(products);
      setRestaurants(restaurants);
    }
    loadData();
  }, []);

  const performSearch = () => {
    if (!searchText.trim()) {
      setFilteredResults([]);
      return;
    }

    const searchLower = searchText.toLowerCase();

    const filteredProducts = products.filter((p) =>
      p.nombre?.toLowerCase().includes(searchLower)
    );

    const filteredRestaurants = restaurants.filter((r) =>
      r.nombre?.toLowerCase().includes(searchLower)
    );

    setFilteredResults([...filteredProducts, ...filteredRestaurants]);
  };

  useEffect(() => {
    performSearch();
  }, [searchText, products, restaurants]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${encodeURIComponent(searchText)}`);
    }
  };

  const handleSearchClick = () => {
    router.push(`/search?query=${encodeURIComponent(searchText)}`);
  };

  const closeSearch = (e) => {
    if (!e.target.closest(".search-container")) {
      setIsFocused(false);
      setSearchText("");
      setFilteredResults([]);
    }
  };

  useEffect(() => {
    if (isFocused) {
      document.addEventListener("click", closeSearch);
    } else {
      document.removeEventListener("click", closeSearch);
    }
    return () => document.removeEventListener("click", closeSearch);
  }, [isFocused]);

  return (
    <>
      {/* Overlay oscuro (excluye el header) */}
      {isFocused && (
        <div className="fixed top-[74px] left-0 right-0 bottom-0 bg-black bg-opacity-20 z-40"></div>
      )}

      {/* Barra de búsqueda */}
      <div className="relative w-full flex flex-col items-center mt-3 search-container">
        <div className="relative z-50 flex items-center w-1/2 border-2 border-red-600 bg-white shadow-md py-2 px-3 rounded-md">
          <input
            type="text"
            placeholder="Buscar productos o restaurantes..."
            className="w-full py-1 outline-none text-sm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
          />
          <IconSearch 
            stroke={2} 
            className="text-red-600 w-5 h-5 cursor-pointer" 
            onClick={handleSearchClick} 
          />
        </div>

        {/* Lista de resultados */}
        {filteredResults.length > 0 && (
          <ul className="absolute top-full left-1/2 -translate-x-1/2 w-1/2 bg-white border border-gray-300 border-t-0 shadow-lg z-50">
            {filteredResults.map((item) => (
              <li
                key={item._id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={item.imagen || "/placeholder.jpg"}
                  alt={item.nombre}
                  className="w-8 h-8 object-cover rounded-full"
                />
                <span className="text-gray-800 text-sm">{item.nombre}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
