const express = require("express")
const app = express()
const port = 3000;
const {Restaurant, Menu, Item} = require("./models/index")
const {sequelize} = require("./db")
const {
    seedRestaurant,
    seedMenu,
    seedItem
  } = require('./seedData');

//TODO: 
app.use(express.json())
app.post("/restaurants", async function(request, response) {
    try{
        const restaurant1 = await Restaurant.create(seedRestaurant[0])
        const restaurant2 = await Restaurant.create(seedRestaurant[1])
        const restaurant3 = await Restaurant.create(seedRestaurant[2])
        response.status(200).send({restaurant1, restaurant2, restaurant3})
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.post("/menus", async function(request, response) {
    try{
        const menu1 = await Menu.create(seedMenu[0])
        const menu2 = await Menu.create(seedMenu[1])
        const menu3 = await Menu.create(seedMenu[2])
        response.status(200).send({menu1, menu2, menu3})
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.post("/items", async function(request, response) {
    try{
        const item1 = await Item.create(seedItem[0])
        const item2 = await Item.create(seedItem[1])
        const item3 = await Item.create(seedItem[2])
        response.status(200).send({item1, item2, item3})
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.put("/restaurants/:id", async function(request, response) {
    try{
        const restaurant = await Restaurant.findByPk( request.params.id)
        restaurant.addMenu([1,2,3])
        response.status(200).send({restaurant})
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.put("/menus/:id", async function(request, response) {
    try{
        const menu = await Menu.findByPk( request.params.id)
        menu.addItem([1,2,3])
        response.status(200).send({menu})
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.get("/menus", async function(request, response) {
    try{
        const menu = await Menu.findAll({include: Item})
        response.status(200).send(menu)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.get("/restaurants", async function(request, response) {
    try{
        const restaurant = await Restaurant.findAll(
            {
                include: Restaurant,
                
                    include: [{
                                
                        model: Menu,
                        include: [{
                        
                            model: Item,
                        
                            through: { attributes: [] }
                        }]
                    }]
            }
        )
      
        response.status(200).send(restaurant)
    }
    catch(error){
        response.status(500).send({error: error.message})
    }
})

app.listen(port, async function() {
    await sequelize.sync()
    console.log(`App listening on port: http://localhost:${port}/restaurants `)
    console.log(`App listening on port: http://localhost:${port}/menus `)
    console.log(`App listening on port: http://localhost:${port}/items `)
})