exports.up = knex => knex.schema.createTable("foods", table => {
  table.increments("id")
  table.text("name")
  table.text("description")
  table.text("category")
  table.float("price")
  table.integer("user_id").references("id").inTable("users")
})

exports.down = knex => knex.schema.dropTable("foods")
