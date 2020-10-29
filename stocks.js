var express = require('express');
var router = express.Router();
var stocks = [
   {id: 1, name: "Tesla", symbol: "TSLA", lastTradedPrice: 406.02},
   {id: 2, name: "Apple", symbol: "AAPL", lastTradedPrice: 111.2},
   {id: 3, name: "Nvidia", symbol: "NVDA", lastTradedPrice: 505.08},
   {id: 4, name: "Microsoft", symbol: "MSFT", lastTradedPrice: 202.68},
   {id: 5, name: "Fastly", symbol: "FSLY", lastTradedPrice: 71.61},
   {id: 6, name: "AMD", symbol: "AMD", lastTradedPrice: 76.4}
];

router.get('/', function(req, res){
   res.json(stocks);
});

router.get('/:id([0-9]{1,})', function(req, res){
   var curStock = stocks.filter(function(stock){
      if(stock.id == req.params.id){
         return true;
      }
   });
   if(curStock.length == 1){
      res.json(curStock[0])
   } else {
      res.status(404);
      res.json({message: "Not Found"});
   }
});

router.post('/', function(req, res){

   if(!req.body.name ||
	!req.body.symbol ||
	!req.body.price){
      
      res.status(400);
      res.json({message: "Bad Request"});
   } else {
      var newId = stocks.length + 1;
      stocks.push({
         id: newId,
         name: req.body.name,
         symbol: req.body.symbol,
         lastTradedPrice: req.body.price
      });
      res.json({message: "New stock added.", id: newId});
   }
});
module.exports = router;
