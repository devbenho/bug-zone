import knex, { Knex } from "knex";
import path from "path";
interface IKnexConfig {
  [key: string]: Knex.Config;
}
const config = {
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "dev.sqlite3"),
  },
  seeds: {
    directory: path.join(__dirname, "/seeds"),
  },
  useNullAsDefault: true,
};
const knexInstance = knex(config);

export default knexInstance;
