import express from 'express';
import Test from '../db/testSchema';
const router = express.Router();

router.post('/create-test', async (req, res) => {
    const { startTime, endTime, numberOfStudents, totalMarks } = req.body;
    try {
        const newTest = new Test({ startTime, endTime, numberOfStudents, totalMarks });
        await newTest.save();
        res.status(200).json({ message: 'Test created successfully', test: newTest });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create test' });
    }
});

router.get('/get-test/:testId', async (req, res) => {
    const testId = req.params.testId;
    try {
        const test = await Test.findById(testId);
        res.status(200).json({ test });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to get test' });
    }
});

router.get('/get-all-tests', async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json({ tests });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to get tests' });
    }
});

router.put('/edit-test/:testId', async (req, res) => {
    const testId = req.params.testId;
    const { time, date, numberOfStudents, totalMarks } = req.body;
    try {
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        test.time = time;
        test.date = date;
        test.numberOfStudents = numberOfStudents;
        test.totalMarks = totalMarks;
        await test.save();
        res.status(200).json({ message: 'Test details updated successfully', test });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update test details' });
    }
});

router.delete('/delete-test/:testId', async (req, res) => {
    const testId = req.params.testId;
    try {
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        await test.remove();
        await User.updateMany({ testSlots: testId }, { $pull: { testSlots: testId } });
        res.status(200).json({ message: 'Test deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to delete test' });
    }
});

router.put('/edit-mcq-question/:testId/:questionId', async (req, res) => {
    const testId = req.params.testId;
    const questionId = req.params.questionId;
    const { question, options, correctOption } = req.body;
    try {
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        const mcqQuestion = test.mcqQuestions.id(questionId);
        if (!mcqQuestion) {
            return res.status(404).json({ error: 'MCQ question not found' });
        }
        mcqQuestion.question = question;
        mcqQuestion.options = options;
        mcqQuestion.correctOption = correctOption;
        await test.save();
        res.status(200).json({ message: 'MCQ question updated successfully', test });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update MCQ question' });
    }
});

router.put('/edit-coding-question/:testId/:questionId', async (req, res) => {
    const testId = req.params.testId;
    const questionId = req.params.questionId;
    const { title, description, sampleTestCase, sampleTestCaseAns, testCases, testCaseAns } = req.body;
    try {
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }
        const codingQuestion = test.codingQuestions.id(questionId);
        if (!codingQuestion) {
            return res.status(404).json({ error: 'Coding question not found' });
        }
        codingQuestion.title = title;
        codingQuestion.description = description;
        codingQuestion.sampleTestCase = sampleTestCase;
        codingQuestion.sampleTestCaseAns = sampleTestCaseAns;
        codingQuestion.testCases = testCases;
        codingQuestion.testCaseAns = testCaseAns;

        await test.save();
        res.status(200).json({ message: 'Coding question updated successfully', test });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to update coding question' });
    }
});

router.post('/mcqquestion', async (req, res) => {
    
    const testId = req.body.testId;
    const question = req.body.question;
    const options = req.body.options;
    const correctOption = req.body.correctOption;

    try {
        const updatedTest = await Test.findOneAndUpdate(
            { _id: testId },
            { $push: { mcqQuestions: { question, options, correctOption } } },
            { new: true }
        );
        res.status(200).json({ message: 'MCQ question saved to test successfully', test: updatedTest });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to save MCQ question to test' });
    }
    
});


router.post('/codingquestion', async (req, res) => {
    
    const { testId, title, description, sampleTestCase, sampleTestCaseAns, testCases,testCaseAns  } = req.body;

    try {
        const updatedTest = await Test.findOneAndUpdate(
            { _id: testId },
            { $push: { codingQuestions: { testId, title, description, sampleTestCase, sampleTestCaseAns, testCases, testCaseAns } } },
            { new: true }
        );
        res.status(200).json({ message: 'Coding question saved to test successfully', test: updatedTest });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to save coding question to test' });
    }
});

export default router;