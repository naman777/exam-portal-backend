import mongoose from 'mongoose';

const codingQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    sampleTestCase: {
        type: String,
        required: true
    },
    sampleTestCaseAns: {
        type: String,
        required: true
    },
    testCases: {
        type: String,
        required: true
    },
    testCaseAns: {
        type: String,
        required: true
    }
});

const CodingQuestion = mongoose.model('CodingQuestion', codingQuestionSchema);
export default CodingQuestion;