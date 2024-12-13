import SearchBar from "@/components/SearchBar";

import { ChangeEvent, useState } from "react";

const PatientsSection = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <div className="mb-8">
        <SearchBar
          placeholder="Search..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>
    </>
  );
};

export default PatientsSection;
