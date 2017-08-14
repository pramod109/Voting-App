//Initialize project
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
var dataCar = require('./models/dataCar')
mongoose.connect('mongodb://localhost:27017/myproject',()=>{
    console.log('Successfully Connected To MongoDB...')
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set static page
app.get('/', (req,res,next)=>{
    res.sendFile(__dirname + '/public/index.html')
});

//Voting 1 for Car
app.get('/car', (req,res,next)=>{
    res.sendFile(__dirname + '/public/car.html')
});

//Voting Results 1 for Car
app.post('/carget', (req,res,next)=>{
    var x = parseInt(req.body.answer)
    switch(x){
        case 1:
            var data = new dataCar({
                FordMustang: 1,
                DodgeChallenger: 0,
                MazdaMiata: 0,
                ChevroletCamaro: 0
            })
            break;
        case 2:
            var data = new dataCar({
                FordMustang: 0,
                DodgeChallenger: 1,
                MazdaMiata: 0,
                ChevroletCamaro: 0
            })
            break;
        case 3:
            var data = new dataCar({
                FordMustang: 0,
                DodgeChallenger: 0,
                MazdaMiata: 1,
                ChevroletCamaro: 0
            })
            break;
        case 4:
            var data = new dataCar({
                FordMustang: 0,
                DodgeChallenger: 0,
                MazdaMiata: 0,
                ChevroletCamaro: 1
            })
            break;
        default:
            var data = new dataCar({
                FordMustang: 0,
                DodgeChallenger: 0,
                MazdaMiata: 0,
                ChevroletCamaro: 0
            })
    }
    data.save(err=>{
            if(err) {
                return res.send("Error in saving to database")
            }
            else{
                console.log('Succussfully saved to database')
            }
    })
    
    res.redirect('/result')
});

//testing
app.get('/result', (req,res,next)=>{
    var ford_mustang=0;
    var dodge_challenger=0;
    var mazda_miata=0;
    var chevrolet_camaro=0;
    var votes = {
        FordMustang: 0,
        DodgeChallenger: 0,
        MazdaMiata: 0,
        ChevroletCamaro: 0
    }
    dataCar.find({FordMustang:1}).count((err,data) => {
        if(err) return res.send('Error in Reading Database')
        ford_mustang = data.toString()
        res.send(ford_mustang)
    })
    dataCar.find({DodgeChallenger:1}).count((err,data) => {
        if(err) return res.send('Error in Reading Database')
        dodge_challenger = data.toString()
    })
    dataCar.find({MazdaMiata:1}).count((err,data) => {
        if(err) return res.send('Error in Reading Database')
        mazda_miata = data.toString()
    })
    dataCar.find({ChevroletCamaro:1}).count((err,data) => {
        if(err) return res.send('Error in Reading Database')
        chevrolet_camaro = data.toString()
    })
    var votes = {
        FordMustang: ford_mustang,
        DodgeChallenger: dodge_challenger,
        MazdaMiata: mazda_miata,
        ChevroletCamaro: chevrolet_camaro
    }
    //res.send(chevrolet_camaro)
})

//Listen
app.listen(3003, ()=>{
    console.log("Server is Running...")
});

