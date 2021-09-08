const router = require("express").Router();
//const Workout = require("../models/workout.js");
const db = require('../models');

//dB workout -table /collection workouts
//POst and Get
//router.post("/api/workouts", ({ body }, res) => {
//  db.Workout.create(body)
 //   .then(dbWorkout => { res.json(dbWorkout); })
//    .catch(err => { res.json(err); });
//});
//router.get("/api/workouts/range", (req, res) => {
//  db.Workout.find({})
//    .then(dbWorkout => { res.json(dbWorkout); })
 //   .catch(err => { res.json(err); });
//});

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



