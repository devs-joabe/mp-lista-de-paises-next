import type { Country } from "@/app/page"; // Corrected import statement
import CountryCard from "@/components/country-card";
import Image from "next/image";
import Link from "next/link";

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  return countries.find((country: Country) => country.name.common === name)!;
}

async function getCountryBordersByName(name: string) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();
  const country = countries.find(
    (country: Country) => country.name.common === name
  )!;

  return country.borders?.map((border) => {
    const borderCountry = countries.find((country) => country.cca3 === border)!;
    return {
      name: borderCountry.name.common,
      ptName: borderCountry.translations.por.common,
      flag: borderCountry.flags.svg,
      flatAlt: borderCountry.flags.alt,
    };
  });
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getCountryBordersByName(decodeURI(name));

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <section className="container flex flex-col">
      <h1 className="text-5xl font-bold text-gray-800 my-16">
        {country.translations.por.common}
      </h1>
      <Link className="flex items-center py-2" href="/">
        <Image src="/setas.png" alt="seta para voltar" width={24} height={24} />
        Voltar
      </Link>
      <article className="flex justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          {country.capital && (
            <h2 className="font-medium text-xl text-gray-800 my-3">
              <b>Capital: </b>
              {country.capital}
            </h2>
          )}
          <h2 className="font-medium text-xl text-gray-800 my-3">
            <b>Continente: </b>
            {country.region}
            {country.subregion && `- ${country.subregion}`}
          </h2>
          <h2 className="font-medium text-xl text-gray-800 my-3">
            <b>População: </b>
            {formatter.format(country.population)}
          </h2>
          {country?.languages && (
            <h2 className="font-medium text-xl text-gray-800 my-3">
              <b>Linguas faladas: </b>
              <br />
              {Object.values(country.languages).map((language) => (
                <span
                  key={language}
                  className="inline-block px-2 bg-indigo-700 mr-2 text-white font-sm rounded-full"
                >
                  {language}
                </span>
              ))}
            </h2>
          )}
        </section>
        <div className="relative h-auto w-96 shadow-md">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            fill
            className="object-cover"
          />
        </div>
      </article>
      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">
          Paises que fazem fronteira
        </h3>
        <div className="grid grid-cols-5 w-full">
          {borderCountries?.map((border) => (
            <CountryCard {...border} />
          ))}
        </div>
      </section>
    </section>
  );
}
