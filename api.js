const express = require('express');
const router = express.Router();
module.exports = router;

const mongoose = require('mongoose');
const CarModel = require('./carModel');
const COMMON = require('./COMMON');
const uri = COMMON.uri;

router.get('/', (req, res) => {
    res.send('Vao api mobile')
})
router.get('/list', async (req, res) =>{
    await mongoose.connect(uri)

    let car = await CarModel.find();

    console.log(car);
    res.send(car);
})

router.post('/add_xe', async (req, res) => {
    await mongoose.connect(uri);
        
    let car = req.body;

    let result = CarModel.create(car);
    console.log(result);

    let cars = await CarModel.find();
    res.send(cars);
})

router.put('/update', async (req, res) => {
    try {
        let id = req.body._id;  // Lấy _id từ body (hoặc từ params tùy vào cách bạn gửi)
        let updatedData = req.body;

        let car = await CarModel.findById(id);
        if (!car) {
            return res.status(404).send({ message: "Xe không tồn tại" });
        }

        // Cập nhật thông tin xe
        await CarModel.updateOne({ _id: id }, updatedData);

        let xehoi = await CarModel.find();
        res.send(xehoi);
    } catch (error) {
        res.status(500).send({ message: "Lỗi khi cập nhật xe", error: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    await mongoose.connect(uri);

    let id = req.params.id;
    // Xử lý lỗi khi id không đúng
    await CarModel.deleteOne({  
        _id:id
    });

    let cars = await CarModel.find();
    res.send(cars);
})