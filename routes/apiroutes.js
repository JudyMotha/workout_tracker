const router = require("express").Router();
//const Workout = require("../models/workout.js");
const db = require('../models');

//Final clean up ..

//dB name  workout -table /collection is  workouts-Look at Robo3T on local machine and login to mongo atlas to see collections likewise for db /table update .Refer Network for routes
//Bootcamp is coming to closing stage Week 18 Class contains has mongo atlas set up and Heroku deployment instrucions ...where to use you password etc  in final stages

//The $addFields stage is equivalent to a $project stage that explicitly specifies all existing fields in the input documents and adds the new fields
//https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/ {-id way of solving also  works};{ $sum: <expression> };$sum is available in these stages:
//$addFields (Available starting in MongoDB 3.4).REfer example with db.sales.aggregate



//New workout POST 
router.post('/api/workouts', (req, res) => {
                                           db.Workout.create(req.body, (err, data) => {
                                           if (err) {
                                                    res.send(err);
                                                   }
                                                    else 
                                                    {
                                             res.send(data);
    }
  });
});
  


//get routes sets for aggrate weights and time reference boiler plate for  duration and weights for any given day
router.get('/api/workouts', (req, res) => {
                                          db.Workout.aggregate([
                                          {
                                         $addFields: {
                                         totalWeight: { $sum: '$exercises.weight' },  totalDuration: { $sum: '$exercises.duration' }
                                           }
                                        },
                                      { $sort: { day: 1 } }  ],
                                      (err, data) => {
                                       if (err) {
                                        res.send(err);
                                         } 
                                         else
                                        {
                                         res.send(data);
    }
  });
});

//
router.get('/api/workouts/range', (req, res) => {
                                       db.Workout.aggregate([
                                         {
                                           $addFields: {
                                           totalWeight: { $sum: '$exercises.weight' },totalDuration: { $sum: '$exercises.duration' }
                                           }
                                       },
                                         { $sort: { day: -1 } }, { $limit: 7 }  ], 
                                       (err, data) => {
                                         if (err) {
                                           res.send(err);
                                               }
                                            else
                                            {
                                          res.send(data);
    }
  });
});

//Put route
router.put('/api/workouts/:id', (req, res) => {
                                         db.Workout.findOneAndUpdate(
                                           { _id: req.params.id },
                                            { $push:
                                           { exercises: req.body }                     
                                             },    
                                          { new: true },
                                          
                                       (err, data) => {
                                           if (err) {
                                             res.send(err);
                                             } 
                                             else 
                                                {
                                          res.send(data);
      }
    });
});




module.exports = router;



