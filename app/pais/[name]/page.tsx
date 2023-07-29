import { Country } from "@/app/page";

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/{name}?fullText=true`
  );
  return response.json();
}

export default async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(name);
  return <h1>{country.name.common}</h1>;
}
