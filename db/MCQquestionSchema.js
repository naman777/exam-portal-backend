import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
}, {
    timestamps: true 
});

const mcqQuestion = mongoose.model('mcqQuestion', questionSchema);

export default mcqQuestion;
