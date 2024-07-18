import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();
import { getDB } from "../db/connection.js";

router.get("/findUnreadMessage", async (req, res) => {
    try {
        const { _id } = req.query;
        if (!_id) {
            return res.status(400).send("Objectid is required");
        }
        const db = getDB();
        const messagesCollection = db.collection("messages");

        const messages = await messagesCollection.aggregate([
            {
                $match: {
                    message_to: new ObjectId(_id),
                    unread: 1
                },
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "project_id",
                    foreignField: "_id",
                    as: "project_info"
                }
            },
            {
                $unwind: "$project_info"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "project_info.project_publisher",
                    foreignField: "_id",
                    as: "publisher_info"
                }
            },
            {
                $unwind: "$publisher_info"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "project_info.chosen_applicants",
                    foreignField: "_id",
                    as: "applicants_info"
                }
            },
            {
                $unwind: "$applicants_info"
            },
            {
                $project: {
                    _id: 1,
                    message_to: 1,
                    unread: 1,
                    message_type: 1,
                    project_id: 1,
                    "project_info.project_publisher": 1,
                    "project_info.chosen_applicants": 1,
                    publisher_name: "$publisher_info.name",
                    developer_name: "$applicants_info.name",
                }
            }
        ]).toArray();

        if (!messages || messages.length === 0) {
            return res.status(200).send([]);
        }
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Internal server error");
    }
});

// Update message unread status based on message id
router.post("/updateMessageStatus", async (req, res) => {
    try {
        const { messageId } = req.body;
        if (!messageId) {
            return res.status(400).send("Message ID is required");
        }
        const db = getDB();
        const collection = db.collection("messages");

        const result = await collection.updateOne(
            { _id: new ObjectId(messageId) },
            { $set: { unread: 0 } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send("Message not found or already read");
        }

        res.status(200).send("Message status updated");
    } catch (error) {
        console.error("Error updating message status:", error);
        res.status(500).send("Internal server error");
    }
});

//add new message
router.post("/addNewMessage", async (req, res) => {
    try {
        const { project_id, message_to, message_type, unread } = req.body;

        // verify if there is any missing data
        if (!project_id || !message_to || !message_type || unread === undefined) {
            return res.status(400).send("All fields are required");
        }

        const db = getDB();
        const messagesCollection = db.collection("messages");

        const newMessage = {
            project_id: new ObjectId(project_id),
            message_to: new ObjectId(message_to),
            message_type,
            unread,
        };

        const result = await messagesCollection.insertOne(newMessage);

        if (result.insertedCount === 1) {
            res.status(201).send("Message added successfully");
        } else {
            res.status(500).send("Failed to add message");
        }
    } catch (error) {
        console.error("Error adding new message:", error);
        res.status(500).send("Internal server error");
    }
});

export default router;