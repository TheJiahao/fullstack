import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import FilterForm from "./components/FilterForm";
import Country from "./interfaces/Country";

function App() {
  const [keyword, setKeyword] = useState("");
  const [countries, setCountries] = useState(Array<Country>());
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (country) {
      setCountries([country]);
      return;
    }

    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const data: Country[] = response.data;

        const filteredCountries = data.filter((country) => {
          const name = country.name.common.toLowerCase();
          return name.includes(keyword.toLowerCase());
        });

        console.log("filtered countries", filteredCountries);

        setCountries(filteredCountries);
      });
  }, [keyword, country]);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <div>
        <FilterForm
          handleKeywordChange={handleKeywordChange}
          keywordValue={keyword}
        />
        <CountryList countries={countries} setCountry={setCountry} />
      </div>
    </>
  );
}

export default App;
