console.log('WIP')
const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router()

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

router.use(rateLimiter);

router.get('/login',function(req, res){
    let followPath = req.query.path;
    if(req.session.isAuthenticated()){
        res.redirect('http://example.com/'+followPath); //false positive
    }else{
        res.redirect('/');
    }
}); 

router.get('/goto',function(req, res){
    let url = encodeURI(req.query.url); //vulnerability
    res.redirect(url);
}); 

module.exports = router
