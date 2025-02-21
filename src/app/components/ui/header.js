import Link from "next/link";
import Image from "next/image";

import { IconShoppingBag } from "@tabler/icons-react";
import SearchBar from "./Searchbar";

const header = (
  <>
    <header className="w-full h-[75px] bg-white border-b-2 border-gray-300 flex justify-center">
      <div className="h-full w-9/12 relative">
        <Link
          href="/"
          className="w-40 h-10 bg-red-600 absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer z-10"
        >
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={40}
            height={40}
            className="h-full object-cover"
          />
        </Link>

        <SearchBar />

        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 bg-red-600  flex items-center justify-center rounded-lg">
          <IconShoppingBag stroke={2} color="white" />
        </div>
      </div>
    </header>
  </>
);
export default header;
