const express = require('express');

const app = express();

const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const COMMON = require('./COMMON');
const uri = COMMON.uri;

const mongoose = require('mongoose');
const carModel = require('./carModel');
const apiMobile = require('./api');

app.listen(port, () => {
    console.log('Server dang chay cong: ' + port);
})

app.get('/upload', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
})

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        var dir = './uploads';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        let fileName = file.originalname;
        let newFileName = fileName;

        cb(null, newFileName)
    }
})

const fs = require('fs');
const upload = multer({storage: storage});

app.post('/uploadfile', upload.single('myfile') ,(req, res, next) => {
    let file = req.file;
    if (!file) {
        var error = new Error('Can chon file!');
        error.httpStatusCode = 400;
        return next (error);
    }

    let pathFileInServer = file.path;
    console.log(pathFileInServer);


    res.send(file);

    
})



app.use('/api', apiMobile);


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

app.put('/update', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.body;
    let car = await carModel.findById(id); // tìm thông tin theo id
    let tenmoi = car.ten + " 2024";

    await carModel.updateOne({_id: id}, {ten: tenmoi});
    
    let xehoi = await carModel.find({});
    res.send(xehoi);

})