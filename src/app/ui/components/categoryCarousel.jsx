"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CategoryCarousel({ products, setCategoria, categoria }) {
  const [maxScroll, setMaxScroll] = useState(0);
  
  // Ref para el viewport (contenedor visible)
  const viewportRef = useRef(null);
  // Ref para el contenedor del contenido deslizable (botones)
  const containerRef = useRef(null);

  // Extraer categorías únicas desde los productos
  const categorias = [...new Set(products.map((p) => p.categoria))];

  // Calcular el desplazamiento máximo permitido
  useEffect(() => {
    if (viewportRef.current && containerRef.current) {
      const viewportWidth = viewportRef.current.clientWidth;
      const contentWidth = containerRef.current.scrollWidth;
      // El límite izquierdo será negativo (contenido mayor que el viewport)
      const max = viewportWidth - contentWidth;
      setMaxScroll(max);
    }
  }, [products]);

  return (
    <div ref={viewportRef} className="overflow-hidden w-full mb-4">
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: maxScroll, right: 0 }}
        dragElastic={0.2}       // Permite algo de elasticidad al arrastrar
        dragMomentum={false}     // Deshabilita el impulso para mayor control
        className="flex gap-3 cursor-grab active:cursor-grabbing select-none"
      >
        <button
          onClick={() => setCategoria("")}
          className={`px-4 py-2 rounded font-medium ${
            categoria === "" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded font-medium ${
              categoria === cat ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
