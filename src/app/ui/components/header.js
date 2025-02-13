import { IconSearch } from "@tabler/icons-react";
import { IconShoppingBag } from "@tabler/icons-react";

const header = (
  <>
    <div className="w-full h-[75px] bg-white border-b-2 border-gray-300 flex justify-center">
      <div className="h-full w-9/12 relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0">
          <div className="w-40 h-10 bg-red-600"></div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 flex items-center w-1/3 border-2 border-red-600 rounded-lg">
          <input
            type="text"
            placeholder="¿Qué pedirás hoy?"
            className="w-full h-full pl-2 py-1"
          />
          <div className="w-10 h-10 bg-white flex items-center justify-center border-l-2 border-red-600 rounded-r-lg">
            <IconSearch stroke={2} className="text-red-600" />
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-red-600  flex items-center justify-center rounded-lg">
          <IconShoppingBag stroke={2} color="white" />
        </div>
      </div>
    </div>
  </>
);
export default header;
