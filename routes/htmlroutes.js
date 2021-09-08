const router = require('express').Router();
const path = require('path');

//Checked with my tutor whether the below code is is neceassary and understood its a part of public static fn on line 14 in server.js 
//router.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, '../public/index.html'))
//})

router.get('/exercise', (req, res)=> {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;
