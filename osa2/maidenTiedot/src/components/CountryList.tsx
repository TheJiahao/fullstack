import Country from "../interfaces/Country";
import CountryEntry from "./CountryEntry";

const CountryList = ({
  countries,
  setCountry,
}: {
  countries: Country[];
  setCountry: CallableFunction;
}) => {
  const n = countries.length;

  switch (true) {
    case n === 1:
      return (
        <CountryEntry
          country={countries[0]}
          collapse={false}
          setCountry={setCountry}
        />
      );
    case n <= 10:
      return (
        <div>
          <ul>
            {countries.map((country) => (
              <CountryEntry
                country={country}
                key={country.name.common}
                setCountry={setCountry}
              />
            ))}
          </ul>
        </div>
      );
    default:
      return <div>Too many matches, specify another filter</div>;
  }
};

export default CountryList;
