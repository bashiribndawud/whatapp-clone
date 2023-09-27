import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
function SearchBar() {
  const {
    state: { contactSearch },
    dispatch,
  } = useStateProvider();
  return (
    <div className="bg-search-input-container-background flex py-3 pl-5 items-center gap-3 h-14">
      <div className="bg-panel-header-background flex items-center gap-5 px-3 py-2 rounded-lg flex-grow ">
        <div>
          <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
        </div>
        <div className="flex-grow">
          <input
            type="text"
            name=""
            placeholder="Search or start a new chat"
            className="bg-transparent text-sm focus:outline-none flex-grow text-white w-full"
            onChange={(e) => dispatch({type: reducerCases.SET_CONTACT_SEARCH, contactSearch: e.target.value})}
          />
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BsFilter className="text-panel-header-icon cursor-pointer text-lg" />
      </div>
    </div>
  );
}

export default SearchBar;
