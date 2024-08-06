exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id")
  table.integer("food_id").references("id").inTable("foods")
})

exports.down = knex => knex.schema.dropTable("orders")
