import { Schema } from 'mongoose';

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    testStarted: {
        type: Boolean,
        default: false
    },
    testSlot: {
        type: String,
        default: 0
    },
    obtainedMarks: {
        type: Number,
        default: 0
    },
    caughtCheating: {
        type: Boolean,
        default: false
    }
});

export default userSchema;