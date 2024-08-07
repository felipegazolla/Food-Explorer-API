const { Router } = require("express")
const usersRoutes = require("./users.routes")
const foodsRoutes = require("./foods.routes")
const ordersRoutes = require("./orders.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/foods", foodsRoutes)
routes.use("/orders", ordersRoutes)

module.exports = routes