export async function getProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error al obtener los productos");

    const data = await res.json(); // 💡 Convertimos a JSON antes de retornar
    return Array.isArray(data) ? data : []; // 🔹 Asegurar que sea un array válido
  } catch (error) {
    console.error("Error en getProducts:", error);
    return []; // 🔥 Evitar retornar objetos incompatibles
  }
}
