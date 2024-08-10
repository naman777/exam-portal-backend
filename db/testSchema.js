import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
    },
    numberOfStudents: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    mcqQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    codingQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CodingQuestion'
    }]
}, {
    timestamps: true 
});

const Test = mongoose.model('Test', testSchema);

export default Test;
