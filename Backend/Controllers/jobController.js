const jobSchema = require("../Models/jobModel");

exports.postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId,
        } = req.body;

        const userId = req.id;

        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Something is Missing !",
                success: false,
            });
        }

        const job = await jobSchema.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({
            message: "New Job Created Successfully !",
            job,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };

        const jobs = await jobSchema.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Job Not Found !",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobSchema.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job Not Found !",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await jobSchema.find({ created_by: adminId });

        if (!jobs) {
            return res.status(404).json({
                message: "Job Not Found",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.log(error);
    }
};

