
import { IconShoppingBag } from "@tabler/icons-react";
import SearchBar from "./Searchbar";

const header = (
  <>
    <div className="w-full h-[75px] bg-white border-b-2 border-gray-300 flex justify-center">
      <div className="h-full w-9/12 relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0">
          <div className="w-40 h-10 bg-red-600"></div>
        </div>
       
        <SearchBar />
       
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-red-600  flex items-center justify-center rounded-lg">
          <IconShoppingBag stroke={2} color="white" />
        </div>
      </div>
    </div>
  </>
);
export default header;
