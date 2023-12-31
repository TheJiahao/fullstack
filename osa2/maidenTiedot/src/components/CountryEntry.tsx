import Country from "../interfaces/Country";

const CountryEntry = ({
  country,
  collapse = true,
}: {
  country: Country;
  collapse?: boolean;
}) => {
    return <li>{country.name.common}</li>;
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
