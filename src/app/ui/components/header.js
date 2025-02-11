import { IconMenu2 } from "@tabler/icons-react";

const header = (
  <>
    <div class="hidden celular:block">
      <div
        id="menuIcon"
        class="cursor-pointer celular:bg-blanco celular:bg-opacity-50 celular:rounded-md"
      >
        <IconMenu2 stroke={2} />
      </div>
    </div>
    <div
      id="menu"
      class="celular:translate-x-full celular:duration-300 celular:flex-col celular:items-center celular:w-full celular:h-[200px] celular:justify-around celular:absolute celular:top-[56px] celular:right-0 celular:bg-white w-1/3 flex justify-between items-center"
    >
      <NavOption label="Inicio" />

      <div class="py-4 relative inline-block group">
        <NavOption label="Servicios" />
        <div
          id="dropdownMenu"
          class="hidden absolute top-2 -left-5 celular:-left-12 bg-neon bg-opacity-80 celular:bg-opacity-100 shadow-lg z-10 min-w-48 rounded-md opacity-0 translate-y-2 transition-opacity duration-300 ease-in-out group-hover:block group-hover:opacity-100 group-hover:translate-y-12 group-focus:opacity-100 group-focus:translate-y-12 group-focus:block"
        >
          <DropDownOption label="Creación de Sitios Web" />
          <DropDownOption label="Diseño de Sitios Web" />
          <DropDownOption label="Branding e Identidad" />
        </div>
      </div>
      <NavOption label="Contacto" />
    </div>
  </>
);
