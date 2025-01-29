import { MongoClient } from "mongodb";
import { ContactModel, EquipoModel } from "./types.ts";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
if (!MONGO_URL) {
  console.error("Please provide a MONGO_URL");
  Deno.exit(1);
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();
console.info("Connected to MongoDB");

const mongodb = mongoClient.db("Prueba_APIREST3DB");
const contactsCollection = mongodb.collection<ContactModel>("contacts");
const equiposCollection = mongodb.collection<EquipoModel>("equipos");

const handler = async (req: Request): Promise<Response> => {
  return new Response("Endpoint not found");
};

Deno.serve({ port: 3000 }, handler);
