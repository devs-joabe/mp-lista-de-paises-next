import type { Country } from "@/app/page"; // Corrected import statement
import Image from "next/image";
import Link from "next/link";

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  return (await response.json())[0];
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(name);

  const formatter = Intl.NumberFormat("pt-br");

  return (
    <section className="container flex flex-col">
      {" "}
      <h1 className="text-5xl font-bold text-gray-800 my-16">
        {country.translations.por.common}
      </h1>
      <Link className="flex items-center" href="/">
        <Image src="/setas.png" alt="seta para voltar" width={24} height={24} />
        Voltar
      </Link>
      <article className="flex justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          <h2 className="font-medium text-xl text-gray-800 my-3">
            <b>Capital: </b>
            {country.capital}
          </h2>
          <h2 className="font-medium text-xl text-gray-800 my-3">
            <b>Continente: </b>
            {country.region} - {country.subregion}
          </h2>
          <h2 className="font-medium text-xl text-gray-800 my-3">
            <b>População: </b>
            {formatter.format(country.population)}
          </h2>
          <h2 className="font-medium text-xl text-gray-800 my-3">
            <b>Linguas faladas: </b>
            {Object.values(country.languages).map((language) => (
              <span
                key={language}
                className="inline-block px-2 bg-indigo-700 mr-2 text-white font-sm rounded-full"
              >
                {language}
              </span>
            ))}
          </h2>
        </section>
      </article>
    </section>
  );
}
