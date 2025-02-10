    import mongoose from "mongoose";

    const messageSchema = new mongoose.Schema({
        senderName: {
            type: String,
            minLength: [3, "Name must contain atleast 3 letters"],
        },
        subject: {
            type: String,
        },
        message: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    });


    export const Message = mongoose.model("Message", messageSchema);
