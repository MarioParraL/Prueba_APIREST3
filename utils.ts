import { Collection } from "mongodb";
import { Contact, ContactModel, Equipo, EquipoModel } from "./types.ts";

export const fromModelToContact = async (
  model: ContactModel,
  equiposCollection: Collection<EquipoModel>,
): Promise<Contact> => {
  const equipos = await equiposCollection.find(
    { _id: { $in: model.equipos } },
  ).toArray();

  const API_KEY = Deno.env.get("API_KEY");
  if (!API_KEY) throw new Error("API_KEY ERROR");

  const url =
    `https://api.api-ninjas.com/v1/validatephone?number=${model.phone}`;
  const data = await fetch(url, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });

  if (data.status !== 200) throw new Error("API NINJA ERROR");

  const response = await data.json();
  const country = response.country;
  const timezones = response.timezones[0];

  return ({
    id: model._id!.toString(),
    name: model.name,
    phone: model.phone,
    country: country,
    timezones: timezones,
    equipos: equipos.map((e) => fromModelToEquipo(e)),
  });
};

export const fromModelToEquipo = (model: EquipoModel): Equipo => ({
  id: model._id!.toString(),
  name: model.name,
});
