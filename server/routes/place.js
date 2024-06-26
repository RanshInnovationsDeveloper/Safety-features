const express = require('express');
const moment = require('moment');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Place = require('../models/Place');

// Route 1: Fetch all places

router.get('/fetchallplaces', async (req, res) => {
    try {
        // Fetch all places
        let places = await Place.find();

        // Filter places where active is not equal to createdAt and the difference is more than 5 hours
        const currentDate = Date.now();
        places = places.filter(place => {
            const active = new Date(place.active);
            const timeDifference = Math.abs(currentDate - active);
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return ((place.active.getTime() !== place.createdAt.getTime()) && daysDifference > 5);
        });

        // Delete filtered places
        for (const place of places) {
            await Place.findByIdAndDelete(place._id);
        }
        // Fetch all places after cleanup
        const updatedPlaces = await Place.find();
        res.json(updatedPlaces);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 2: Add a new place
router.post("/addplace", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, address, coordinates, expiration, author } = req.body;

        // Check if a place with the same coordinates exists
        const existingPlace = await Place.findOne({ coordinates });
        if (existingPlace) {
            return res.status(400).json({ error: 'A place with these coordinates already exists' });
        }

        const place = new Place({
            name,
            address,
            coordinates,
            expiration: expiration ? expiration : null,
            author
        });
        const savedPlace = await place.save();
        res.json(savedPlace);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


// Route 3: Update an existing place
router.put('/updateplace/:id', [
    body('name', 'Enter a valid name').optional().isLength({ min: 3 }),
    body('address', 'Enter a valid address').optional().isLength({ min: 5 }),
    body('coordinates', 'Enter valid coordinates').optional().isArray(),
    body('expiration', 'Enter a valid expiration').optional().isNumeric(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, address, coordinates, expiration } = req.body;
        const newPlace = {};
        if (name) newPlace.name = name;
        if (address) newPlace.address = address;
        if (coordinates) newPlace.coordinates = coordinates;
        if (expiration) newPlace.expiration = expiration;

        const place = await Place.findByIdAndUpdate(req.params.id, { $set: newPlace }, { new: true });
        if (!place) {
            return res.status(404).json({ msg: 'Place not found' });
        }
        res.json(place);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 4: Delete an existing place
router.put('/archiveplace/:id', async (req, res) => {
    try {
        const place = await Place.findByIdAndUpdate(req.params.id, { active: Date.now() }, { new: true });
        if (!place) {
            return res.status(404).json({ msg: 'Place not found' });
        }        res.send(place)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});
// Route 5: Delete an existing place permanently
router.delete('/deleteplace/:id', async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) {
            return res.status(404).json({ msg: 'Place not found' });
        }
        res.json({ msg: 'Place deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;
