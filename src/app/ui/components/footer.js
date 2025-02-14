const footer = (
  <>
    <div className="w-full h-80 bg-red-600 border-t-2 border-gray-300 flex justify-center">
      <div className="h-full w-9/12 py-8 flex flex-col justify-between">
        <div className="w-40 h-10 bg-white"></div>
        <div className="flex justify-between text-white">
          {/* Primera columna */}
          <div className="w-1/4">
            <ul className="space-y-1">
              <li>Quiénes somos</li>
              <li>Contáctanos</li>
            </ul>
          </div>
          {/* Segunda columna */}
          <div className="w-1/4">
            <ul className="space-y-1">
              <li>Top Restaurantes</li>
              <li>Top Productos</li>
            </ul>
          </div>
          {/* Tercera columna */}
          <div className="w-1/4">
            <ul className="space-y-1">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>TikTok</li>
            </ul>
          </div>

          {/* Cuarta columna */}
          <div className="w-1/4">
            <ul className="space-y-1">
              <li>Mi Restaurante</li>
              <li>Mi Logística</li>
            </ul>
          </div>
        </div>
        <div className="w-full h-10 border-t-2 border-gray-300 flex justify-between">
          <p className="text-center text-white">
            © 2025 Pide. Todos los derechos reservados.
          </p>
          <p className="text-center text-white">
            Desarrollado por{" "}
            <a href="https://owlyx.net/" target="_blank">
              Owlyx
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </>
);

export default footer;
