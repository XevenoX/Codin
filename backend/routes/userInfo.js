// routes/publisherHomepage.js
import express from "express";
import User from "../models/userModel.js";
const router = express.Router();
import db from "../db/connection.js";

// test GET to fetch all users
router.get('/', async (req, res) => {
    try {
        let collection = await db.collection("users");
        const users = await collection.find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/findByEmail', async (req, res) => {
    try {
        const email = req.query.email;
        // const email = "codefive@gmail.com";
        if (!email) {
            return res.status(400).send('Email is required');
        }

        let collection = await db.collection("users");
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal server error');
    }
});

router.post("/publisherUpdate", async (req, res) => {
    try {
        const { email, about_us, industry, website, organization_size, specialities } = req.body;
        let updatedPublisherInfo = {
            about_us,
            industry,
            website,
            organization_size,
            specialities
        };
        let collection = await db.collection("users");
        let result = await collection.updateOne(
            { email: email },
            { $set: updatedPublisherInfo }
        );
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: "Record updated successfully" });
        } else {
            res.status(404).send({ message: "Record not found or no changes made" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user information");
    }
});

router.post("/sloganUpdate", async (req, res) => {
    try {
        const { email, slogan } = req.body;
        let updatedslogan = {
            slogan
        };
        let collection = await db.collection("users");
        let result = await collection.updateOne(
            { email: email },
            { $set: updatedslogan }
        );
        if (result.modifiedCount > 0) {
            res.status(200).send({ message: "Record updated successfully" });
        } else {
            res.status(404).send({ message: "Record not found or no changes made" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user information");
    }
});

export default router;
