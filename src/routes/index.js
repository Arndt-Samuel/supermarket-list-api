const express = require('express');
const ListItem = require('../models/ListItem')
const router = express.Router();



    router.get('/', (req, res) => {
    res.send('Hello, world')
    });
    
    router.get('/list-items', async (req, res) => {
        try {
            const items = await ListItem.find();
            return res.json((items));

        } catch (error) {
            res.status(404).json({error});
        }

        
    });
    
    router.post('/list-items', async (req, res) => {
        try {
            const { name, quantity, checked } = req.body;
            
            if(!name || name.length < 3){
                return res.status(400).json({error: 'Name is mandatory and needs to have more than 3 characters'});
            };

            if(!quantity || typeof quantity !== 'number'){
                return res.status(400).json({error: 'quantity is mandatory and needs to be a number'});
            }

            const newItem = await ListItem.create({
                name,
                quantity,
                checked: checked || false,
            });

            return res.json(newItem);
        } catch (error) {
            res.status(404).json({error});
        }
    });
    
    router.delete('/list-items/:id', async (req, res) => {
        try {
            const id = req.params.id;
            if(!id){
                return res.status(400).json({error: 'Id is mandatory'});
            }

            const listItemDeleted =  await ListItem.findByIdAndDelete(id);
            return res.json(listItemDeleted);
        } catch (error) {
            res.status(404).json({error});
        }
    
    
        
    });
    
    router.put('/list-items/:id', async (req, res) => {
        try {
            const id = req.params.id;
            if(!id){
                return res.status(400).json({error: 'Id is mandatory'});
            }

            const { name, quantity, checked } = req.body;
            
            if(!name || name.length < 3){
                return res.status(400).json({error: 'Name is mandatory and needs to have more than 3 characters'});
            };

            if(!quantity || typeof quantity !== 'number'){
                return res.status(400).json({error: 'quantity is mandatory and needs to be a number'});
            }
            
        const listItemUpdated =  await ListItem.findByIdAndUpdate(id, {
            name,
            quantity,
            checked: checked || false,
        },{
            new: true,
        });
            return res.json(listItemUpdated);
        } catch (error) {
            res.status(404).json({error});
        }
        });


        module.exports = router;