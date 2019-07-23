const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const Recipe= require('./model/recipes');
const app = express();

//database connection here

mongoose.connect('mongodb+srv://premium_0:8RvEHu7lxSlCayGZ@cluster0-vpkkx.mongodb.net/test?retryWrites=true&w=majority').then(
    ()=>{
        console.log("Connection with MongoAtlas has been made!!");
        
    }
)

//enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //body-parser middleware
  app.use(bodyParser.json());


// adds a new recipe to the database

        app.post('/api/recipes', (req,res,next)=>{
        console.log(req.body);

            const recipe= new Recipe({
                title:req.body.title,
                ingredients:req.body.ingredients,
                instructions:req.body.instructions,
                time:req.body.time,
                difficulty:req.body.difficulty,
            });
            recipe.save().then(
                ()=>{
                    res.status(201).json({
                        message:"new thing is created!!!"
                    })
                }
            ).catch((error)=>{
            res.status(400).json({
                error:error
            })
            })
            
            
        })




//returns all recipes in database

                app.get('/api/recipes', (req,res, next)=>{

                Recipe.find().then(
                    (recipes)=>{
                res.status(200).json(recipes)
                    }
                ).catch((error)=>{
                res.status(400).json({
                    error:error
                })
                })

                
                })

  //returns recipes by id in database
                app.get('/api/recipes/:id', (req,res, next)=>{

                    Recipe.findOne({_id:req.params.id}).then(
                        (recipe)=>{
                    res.status(200).json(recipe)
                        }
                    ).catch((error)=>{
                    res.status(400).json({
                        error:error
                    })
                    })
                    
                    
                    })
// modify the recipe by id
                app.put('/api/recipes/:id', (req,res, next)=>{

                    const recipe= new Recipe({
                        _id:req.params.id,
                        title:req.body.title,
                        ingredients:req.body.ingredients,
                        instructions:req.body.instructions,
                        time:req.body.time,
                        difficulty:req.body.difficulty,
                    });

                    Recipe.updateOne({_id:req.params.id}, recipe).then(
                        (recipe)=>{
                    res.status(200).json(recipe)
                        }
                    ).catch((error)=>{
                    res.status(400).json({
                        error:error
                    })
                    })
                    
                    
                    })

          //delete recipe by id

          app.delete('/api/recipes/:id', (req,res, next)=>{

            Recipe.deleteOne({_id:req.params.id}).then(
                (recipe)=>{
            res.status(200).json(recipe)
                }
            ).catch((error)=>{
            res.status(400).json({
                error:error
            })
            })

        })
  
module.exports = app;