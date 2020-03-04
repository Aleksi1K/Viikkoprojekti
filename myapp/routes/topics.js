var express = require('express');
var router = express.Router();
var topicsService = require('./topicsService');


router.get('/', function(req, res, next) {
    topicsService.haekirjaukset((rows)=>{
      res.json(rows);
    })
});
router.get('/:id', function(req, res, next){
   topicsService.haekirjaus(req.params.id,(rows)=>{
    res.json(rows);
  })
})


router.post('/', function(req, res, next){
  topicsService.luokirjaus(req.body, (rowCount)=>{
     if(rowCount>0)
     res.status(201).json({message:'success'});
     else{
       res.status(404).json({message:'Not Found'});
     }
   })
})


router.put('/:id', function(req, res, next){
  topicsService.paivitakirjaus(req.body, req.params.id, (rowCount)=>{
    if(rowCount>0)
    res.status(200).json({message:'success'});
    else{
      res.status(404).json({message:'Not Found'});
    }
  })
})

router.delete('/:id', function(req, res, next){
  topicsService.poistakirjaus(req.params.id, (rowCount)=>{
    if(rowCount>0)
    res.status(200).json({message:'success'});
    else{
      res.status(404).json({message:'Not Found'});
    }
  })
})
module.exports = router;