import express from 'express';
import User from '../db/userSchema';
import Test from '../db/testSchema';

const router = express.Router();

router.get("/", async (req,res)=>{
    const user = req.body;
    try{
        const isAvailable = await User.findOne({email:user.email});
        if(isAvailable){
            res.status(200).json(isAvailable);
        };
        res.status(404).json({error:'User not found'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Failed to get user'});
    }
});

router.post('/start-test', async (req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
        const testId = user.testSlot;
        const test = await Test.findById(testId);
        const currentTime = new Date();
        if (currentTime > test.startTime) {
            user.testStarted = true;
            await user.save();
            res.status(200).json(test);
        } else {
            res.status(400).json({ error: 'Test has not started yet' });
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Failed to start test'});
    }

})

router.post('/submit-test', async (req, res) => {
    const { email, mcqAnswers, codingAnswers } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const testId = user.testSlot;
        const test = await Test.findById(testId);
        const currentTime = new Date();
        if (currentTime < test.endTime) {
            return res.status(400).json({ error: 'Test has not ended yet' });
        }
        let obtainedMarks = 0;
        for (let i = 0; i < test.mcqQuestions.length; i++) {
            if (mcqAnswers[i] === test.mcqQuestions[i].correctOption) {
                obtainedMarks += 4;
            }
        }
        for (let i = 0; i < test.codingQuestions.length; i++) {
            if (codingAnswers[i] === test.codingQuestions[i].output) {
                obtainedMarks += 1;
            }
        }
        user.obtainedMarks = obtainedMarks;
        await user.save();
        res.status(200).json({ message: 'Test submitted successfully', obtainedMarks });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to submit test' });
    }
})

export default router; 