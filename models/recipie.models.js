const mongoose = require('mongoose');

const recipieSchema =  new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    difficulty : {
        type : String,
        required : true,
        enum : ['Easy' , 'Intermediate' , 'Difficult']
    },
    prepTime : {
        type : Number,
        required : true
    },
    cookTime : {
        type : Number,
        required : true
    },
    ingredients : [{
        type : String,
         required : true
    }],
    imageUrl : {
        type : String,
         required : true
    }
} , {
    timestamps : true
})

const Recipie = mongoose.model('Recipie' , recipieSchema);

module.exports = Recipie