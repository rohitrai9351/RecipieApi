const express = require('express')
const app = express()
const cors = require('cors')

const {initializeDatabase} = require('./database/database.connect.js')
const Recipie = require('./models/recipie.models.js');

app.use(express.json())
app.use(cors())



initializeDatabase()


app.get('/' , async (req , res) => {
    try{
        res.send('Welcome To recipie Srver')

    }
    catch(error){
        res.status(500).json({error : 'An api fetch error'})
    }
})

const addNewRecipie = async (recipieData) => {
    try{
        const newRecipie = new Recipie(recipieData)
        const saveData = await newRecipie.save()
        return saveData

    }
     catch(error){
        res.status(500).json({message : 'Error To add New recipie'})
     }
}

app.post('/recipies' , async ( req , res) => {
    try{
        const recipieData = await addNewRecipie(req.body)

        if(recipieData){
            res.json(recipieData)
        }
         else{
            res.status(404).json({error : 'Recipie Data Not Found'})
         }

    }
    catch(error){
        res.status(500).json({error : 'An api fetch error'})
    }
})

//q2 Create an API to get all the recipes in the database as a response. Make sure to handle errors properly.

const getAllRecipie = async () => {
    try{
        const recipie = await Recipie.find()
        return recipie
    }
     catch(error){
        throw error
     }
}

app.get('/recipies' , async (req , res) => {
    try{

        const recipieData = await getAllRecipie()
        if(recipieData.length !== 0){
            res.status(200).json(recipieData)
        }
         else{
            res.status(404).json({error : 'Recipie Data not found'})
         }

    }
     catch(error){
        res.status(500).json({error : 'Api fetch error'})
     }
})

//q3 Create an API to get a recipe's details by its title. Make sure to handle errors properly.

const getRecipieByTitle = async (title) => {
    try{
        const recipie = await Recipie.findOne({title})
        return recipie
    }
     catch(error){
        throw error
     }
}

app.get('/recipies/:title' , async (req , res) => {
    try{
        const recipieDetail = await getRecipieByTitle(req.params.title)

        if(recipieDetail){
            res.status(200).json(recipieDetail)
        }
         else{
            res.status(404).json({error : 'Recipie Data not found'})

         }

    }
    catch(error){
        res.status(500).json({error : 'An error Occured during APi fetch'})
     }
})

//q4  Create an API to get details of all the recipes by an author. Make sure to handle errors properly.
const readAllrecipieByAuthor = async (author) => {
    try{
        const recipie = await Recipie.find({author})
         return recipie

    }
     catch(error){
        throw error
     }
}

app.get('/recipies/author/:authorName' , async (req , res) => {
    try{
        const recipieDetail = await readAllrecipieByAuthor(req.params.authorName)
        if(recipieDetail .length !== 0){
            res.status(200).json(recipieDetail)

        }
         else{
            res.status(404).json({error : 'Recipie Data Not Found'})
         }

    }
     catch(error){

     }
})

//q5 Create an API to get all the recipes that are of "Easy" difficulty level.

const readAllRecipiesByDifficultLevel = async (difficultyLevel) => {
    try{
        const recipieDetail = await Recipie.find({difficulty : difficultyLevel.trim()})
         return recipieDetail
         //console.log(recipieDetail)

    }
     catch(error){
        throw error
     }
}
//readAllRecipiesByDifficultLevel('Easy')

app.get('/recipies/level/:difficultLevel' , async (req , res) => {
    try{
        const recipie = await readAllRecipiesByDifficultLevel(req.params.difficultLevel)

        if(recipie.length !== 0){
            res.status(200).json(recipie)
        }
         else{
            res.status(404).json({error : 'Recipie Data not found'})

         }

    }
    catch(error){
        res.status(500).json({error : 'An error Occured during APi fetch'})
     }

})

// q6  Create an API to update a recipe's difficulty level with the help of its id. //
// Update the difficulty of "Spaghetti Carbonara" from "Intermediate" to "Easy". Send an error message "Recipe not found" //
// if the recipe is not found. Make sure to handle errors properly.

const readByIdAndUpdate = async (recipieId , dataUpdate) => {
    try{
        const recipie = await Recipie.findByIdAndUpdate(recipieId , dataUpdate , {new : true})
        return recipie

    }
     catch(error){
        throw error
     }
}

app.post('/recipies/Id/:recipieId' , async (req , res) => {
     
    try{
        const recipieDetail = await readByIdAndUpdate(req.params.recipieId , req.body);
        if(recipieDetail){
            res.status(200).json({message : 'Data Added Sucessfully' , recipieData : recipieDetail})
        }
        else{
            res.status(404).json({error : 'Recipie Not Found'})
        }
    }
     catch(error){
        res.status(500).json({error : 'An error Occured during APi fetch'})

     }
})

//q7 Create an API to update a recipe's prep time and cook time with the help of its title. 
// //Update the details of the recipe "Chicken Tikka Masala". Send an error message 
// //"Recipe not found" if the recipe is not found. Make sure to handle errors properly.

//Updated recipe data: { "prepTime": 40, "cookTime": 45 }

const readByTitleAndUpdate = async (foodTitle , dataUpdate) => {
    try{
        const recipie = await Recipie.findOneAndUpdate({title : foodTitle} , dataUpdate , {new : true})
        return recipie
    }
     catch(error){
        throw error
     }
}

app.post('/recipies/title/:foodTitle' , async (req , res) => {
    try{
        const recipieDetail = await readByTitleAndUpdate(req.params.foodTitle , req.body);
        if(recipieDetail){
            res.status(200).json({Message : 'Data Added Sucessfully' , recipieUpdate : recipieDetail})
        }
         else{
            res.status(404).json({Message : 'Recipie Data Not Found'})
         }

    }
     catch(error){
        throw error
     }
})

module.exports = app