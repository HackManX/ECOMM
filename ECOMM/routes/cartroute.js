const express = require('express');

const router = express();

const product=require('../models/product');


// Route to add a product
router.post('/product/add', async (req, res) => {
    const { name, totalamount, fullname, paymentmethod, address } = req.body;
    

    try {
        // Create a new product instance
        const productnew = new product({
            name:name,
            totalamount:totalamount,
            fullname:fullname,
            paymentmethod:paymentmethod,
            address:address
        });

        console.log(productnew);
        // Save the product to the database
        await productnew.save();

        res.status(200).json({
            status:true,
            msg:'add success'
        })
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            status:true,
            msg:'add failed'
        })
    }
});

module.exports = router;
