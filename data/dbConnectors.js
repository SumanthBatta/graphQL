import mongoose from "mongoose"

import { Sequelize, DataTypes } from "sequelize";

import _ from 'lodash';

import casual from "casual";




async function connectMongo() {
    try{
        await mongoose.connect('mongodb://localhost:27017/graphqlWidgets');
        console.log('Connected to Mongo DB');
    }
    catch(error){
        console.log('Error connecting to DB', error);
    }
}

connectMongo();


const widgetSchema = new mongoose.Schema({
    name: String,
    description: String,
    price:Number,
    soldout:String,
    inventory:String,
    stores:Array
})


const Widgets = mongoose.model('widgets',widgetSchema);

const sequelize = new Sequelize('sqlite::memory:');

const Categories = sequelize.define('categories', {
   category: DataTypes.STRING,
   description: DataTypes.STRING,

})

async function syncAndSeedCategories(){
    try{
        await sequelize.sync({force: true});
        console.log("SQLite connection success and categories model synced");

        //seed categories

        await Promise.all(_.times(5, () => {
            return Categories.create({
                category: casual.word,
                description: casual.sentence,  
        });
    }));

    console.log("categories seeded");
}
catch(error){
    console.log("error with SQLITE db: ", error)
}
}

syncAndSeedCategories();

export {Widgets,Categories };

