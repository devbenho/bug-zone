import knex, { Knex } from "knex";

const config: Knex.Config = {
  client: "sqlite3", // Corrected client name to 'sqlite3'
  connection: {
    filename: "./dev.sqlite3",
  },
  useNullAsDefault: true,
};

const knexInstance: Knex = knex(config); // Corrected instantiation

export default knexInstance;
