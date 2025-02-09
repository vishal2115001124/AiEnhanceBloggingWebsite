import React, { useState } from "react";
import { langs } from "./countries"; // Importing langs from langs.ts

const LanguageSelector = ({
  selectedLanguage,
  setSelectedLanguage
}:{selectedLanguage:string,setSelectedLanguage:React.Dispatch<React.SetStateAction<string>>}
) => {
  const [search, setSearch] = useState(""); // User input for filtering
// Stores the selected language
  const [filteredLanguages, setFilteredLanguages] = useState<any>(langs); // Filtered language list
  const [isOpen,setmodel]=useState<boolean>(false);
  // Handle search input changes
  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearch(input);
    // Filter langs based on input
    const filtered = langs.filter((lang) =>
      lang.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredLanguages(filtered);
  };

  // Handle language selection
  const handleLanguageSelect = (language:string) => {
    setSelectedLanguage(language);
    setSearch(language); // Clear the search
    setFilteredLanguages(langs); // Reset the filtered list
    setmodel(!isOpen);
  };

  return (
    <div className="max-w-sm mx-auto mt-5">
      <div className="relative">
        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          onClick={()=>setmodel(!isOpen)}
          placeholder="Search langs..."
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className={"absolute left-0 right-0 bg-white shadow-md mt-1 max-h-60 overflow-y-auto rounded-md z-10 "+`${isOpen?"":"hidden"}`}>
          {/* Display Filtered Languages */}
          {filteredLanguages.map((language:string, index:number) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleLanguageSelect(language)}
            >
              {language}
            </div>
          ))}
          {/* No Results */}
          {filteredLanguages.length === 0 && (
            <div className="p-2 text-gray-500">No langs found</div>
          )}
        </div>
      </div>

      {/* Selected Language */}
      {selectedLanguage && (
        <div className="mt-4">
          <p className="text-gray-700">Selected Language:</p>
          <p className="text-blue-500 font-semibold">{selectedLanguage}</p>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
