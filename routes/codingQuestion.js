import express from "express"
import axios from "axios";
import CodingQuestion from "../db/codingQuestionSchema";

const url = "http://13.202.142.107:2358/submissions?base64_encoded=true";

const router = express.Router();


router.post("/codingquestion",compilerHandler);

const compilerHandler = async (req,res) => {

    const { code,languageId,questionId } = req.body;
    const question = await CodingQuestion.findById(questionId);
    const input = question.sampleTestCase;
    const output = question.sampleTestCaseAns;
    
    const data = {
        source_code: code,  
        language_id: languageId,
        number_of_runs: null,
        stdin: input,
        expected_output: output,  
        cpu_time_limit: null,
        cpu_extra_time: null,
        wall_time_limit: null,
        memory_limit: null,
        stack_limit: null,
        max_processes_and_or_threads: null,
        enable_per_process_and_thread_time_limit: null,
        enable_per_process_and_thread_memory_limit: null,
        max_file_size: null,
        enable_network: null,
        base64_encoded: true
    };

    try {
        const response = await axios.post(url, data);
        const token = response.data.token;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        let result;
        let status;
        do {
            result = await axios.get("http://13.202.142.107:2358"+"/submissions/"+token);
            status = result.data.status.description;
        } while (status === "Processing");

        res.json({
            status,
            stdout: result.data.stdout,
            stderr: result.data.stderr,
            compile_output: result.data.compile_output,
            message: result.data.message
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong or Compilation Error' });
    }

}   