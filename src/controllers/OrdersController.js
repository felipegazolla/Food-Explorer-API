const knex = require("../database/knex")

class OrdersController {
  async create(request, response) {
    const { description } = request.body
    const { user_id } = request.params

    await knex("orders").insert({
      description,
      user_id
    })

    response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const order = await knex("orders").where({ id }).first().orderBy("created_at")

    return response.json({
      order
    })
  }
}

module.exports = OrdersController