const knex = require("../database/knex")

class FoodsController {
  async create(request, response) {
    const { name, description, category, price, tags } = request.body
    const { user_id } = request.params

    const [food_id] = await knex("foods").insert({
      name,
      description,
      category,
      price,
      user_id
    })

    const tagsInsert = tags.map(name => {
      return {
        food_id,
        name,
      }
    })

    await knex("tags").insert(tagsInsert)

    response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const food = await knex("foods").where({ id }).first()
    const tags = await knex("tags").where({ food_id: id }).orderBy("name")

    return response.json({
      ...food,
      tags
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("foods").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { name, user_id, tags } = request.query
    
    let foods

    if(tags) {
      const filteredTags = tags.split(',').map(tag => tag.trim())
      foods = await knex("tags")
      .select([
        "foods.id",
        "foods.name",
        "foods.user_id"
      ])
      .where("foods.user_id", user_id)
      .whereLike("foods.name", `%${name}%`)
      .whereIn("name", filteredTags)
      .innerJoin("foods", "foods.id", "tags.food_id")
      .orderBy("foods.name")
      
      } else {
        foods = await knex("foods")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .orderBy("name")
      }
      
      const userTags = await knex("tags").where({ user_id })
      const foodsWithTags = foods.map(food => {
        const foodTags = userTags.filter(tag => tag.food_id === food.id)

        return {
          ...food,
          tags: foodTags
        }
      })
      return response.json(foodsWithTags)
  }
}

module.exports = FoodsController