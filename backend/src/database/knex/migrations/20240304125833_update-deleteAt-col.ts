import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // update col name deleteAt to deletedAt
  return knex.schema.table("users", (table) => {
    table.renameColumn("deleteAt", "deletedAt");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("users", (table) => {
    table.renameColumn("deletedAt", "deleteAt");
  });
}
