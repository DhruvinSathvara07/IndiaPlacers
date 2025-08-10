const companySchema = require("../Models/companyModel");

exports.registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required !",
                success: false
            });
        }

        let company = await companySchema.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You Can't add same company !",
                success: false
            });
        }

        company = await companySchema.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company Registred Successfully !",
            company,
            success: false
        });
    } catch (error) {
        console.log(error);
    }
}

exports.getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await companySchema.find({ userId });

        if (!companies) {
            return res.status(404).json({
                message: "Companies Not Found !",
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await companySchema.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company Not found",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        const updateData = { name, description, website, location };

        const company = await companySchema.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company Not Found",
                message: false
            });
        }

        return res.status(200).json({
            message: "Company Information Updated!",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}