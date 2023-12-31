import Country from "../interfaces/Country";

const CountryList = ({ countries }: { countries: Country[] }) => {
  const n = countries.length;

  switch (true) {
    case n === 1: {
      const country = countries[0];

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

          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            width="10%"
          ></img>
        </div>
      );
    }
    case n <= 10:
      return (
        <div>
          <ul>
            {countries.map((country) => (
              <li key={country.name.common}>{country.name.common}</li>
            ))}
          </ul>
        </div>
      );
    default:
      return <div>Too many matches, specify another filter</div>;
  }
};

export default CountryList;
