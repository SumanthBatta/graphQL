// class Product {
//     constructor(id, {name, description, price, soldout, inventory, stores}) {
//         this.id = id;
//         this.name = name;
//         this.description = description;
//         this.price = price;
//         this.soldout = soldout;
//         this.inventory = inventory
//         this.stores = stores;
//     }
// }

import { update } from "lodash";
import { Widgets } from "./dbConnectors";



// const productDatabase = {};

// const resolvers = {
//     getProduct: ({ id }) => {
//         return new Product(id, productDatabase[id]);
//     },
//     createProduct: ({ input }) => {
//         let id = require('crypto').randomBytes(10).toString('hex');
//         productDatabase[id] = input;
//         return new Product(id, input);
//     }
// };

const resolvers = {
    getAllProducts: async () => {
        try {
            const products = await Widgets.find();
            return products;
        } catch (error) {
            throw new Error(error);
        }
    },
    getProduct: async ({ id }) => {
      try{
            const product = await Widgets.findById(id);
            return product;
      }
      catch(error){
        throw new Error(error);
      }
    },
    createProduct: async ({ input }) => {
        // try {
        //     const product = await Widgets.create(input);
        //     return product;
        // } 
        try{
            const newWidget =  new Widgets({
                name: input.name,
                description: input.description,
                price: input.price,
                soldout: input.soldout,
                inventory: input.inventory,
                stores: input.stores,
            }) ;
            newWidget.id = newWidget._id;
            try{
                await newWidget.save();
                return newWidget;
            }
            catch(error){
                throw new Error(error);
            }   

        }
        catch (error) {
            throw new Error(error);
        }
    },
    updateProduct : async ({input }) => {
        try{
            const updatedWidget = await Widgets.findOneAndUpdate({_id: input.id}, 
                input, { new: true})
            return updatedWidget;
        }
        catch(error){
            throw new Error(error);
        
        }
    },
    deleteProduct : async ({id}) =>{
        try{
            await Widgets.findByIdAndDelete(id);
            return "Widget Successfully deleted";
        }
        catch(error){
            throw new Error(error);
        
    }
}
};

export default resolvers;
