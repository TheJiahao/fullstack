import { useState } from "react";
import Country from "../interfaces/Country";

const CountryEntry = ({
  country,
  initialCollapse = true,
}: {
  country: Country;
  initialCollapse?: boolean;
}) => {
  const [collapse, setCollapse] = useState(initialCollapse);

  if (collapse) {
    return (
      <li>
        {country.name.common}
        <button onClick={() => setCollapse(!collapse)}>show</button>
      </li>
    );
  }

  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>
        capital {country.capital}
        <br />
        area {country.area}
      </p>

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.svg} alt={country.flags.alt} width="10%"></img>
    </div>
  );
};

export default CountryEntry;
