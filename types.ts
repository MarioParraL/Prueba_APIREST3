import { ObjectId, OptionalId } from "mongodb";

export type ContactModel = OptionalId<{
  name: string;
  phone: string;
  equipos: ObjectId[];
}>;

export type EquipoModel = OptionalId<{
  name: string;
}>;

export type Contact = {
  id: string;
  name: string;
  phone: string;
  country: string;
  timezones: string;
  equipos: Equipo[];
};

export type Equipo = {
  id: string;
  name: string;
};
