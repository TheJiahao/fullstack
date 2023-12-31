import Country from "../interfaces/Country";

const CountryList = ({ countries }: { countries: Country[] }) => {
  const n = countries.length;

  switch (true) {
    case n === 1:
      return <div>{countries[0].name.common}</div>;
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
