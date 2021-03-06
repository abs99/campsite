const  express= require("express");
const router  = express.Router();
const passport =require("passport");
const User =require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
})

router.get("/register",function(req,res){
    res.render("signup");
})
router.post("/register",function(req,res){
    let newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err)
            req.flash("error",err);
            return res.render("signup")
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp"+ user.username)
            res.redirect("/campgrounds");
        })
    });
});

router.get("/login",function(req,res){
    res.render("login");
})
router.post("/login",passport.authenticate("local",{
   successRedirect:"/campgrounds",
   failureRedirect: "/login" 
  }),function(req,res){
    
});
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged Out!")
    res.redirect("/campgrounds");
})

module.exports = router;

