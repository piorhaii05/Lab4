const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.listen(port, () => {
    console.log('Lắng nghe trên cổng 3000');
});


const uri = 'mongodb+srv://admin4:WPIWJY3q2GrErDD7@cluster0.0wmav.mongodb.net/lab2';

const mongoose = require('mongoose');
const carModel = require('./carModel');

app.get('/', async (req, res) => {
    await mongoose.connect(uri);

    let cars = await carModel.find();

    console.log(cars);

    res.send(cars);
})

app.post('/add_xe', async (req, res) => {
    await mongoose.connect(uri);

    // let car = {
    //     ten: 'Xe3',
    //     nam: 2020,
    //     hang: "Mazda",
    //     gia: 1200 
    // }
    
    let car = req.body;

    let result = carModel.create(car);
    console.log(result);

    let cars = await carModel.find();
    res.send(cars);
})

app.delete('/delete/:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;
    // Xử lý lỗi khi id không đúng
    await carModel.deleteOne({
        _id:id
    });

    let cars = await carModel.find();
    res.send(cars);
})

app.put('/update/:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;
    let car = await carModel.findById(id); // tìm thông tin theo id
    let tenmoi = car.ten + " 2024";

    await carModel.updateOne({_id: id}, {ten: tenmoi});
    let xehoi = await carModel.find({});
    res.send(xehoi);

})