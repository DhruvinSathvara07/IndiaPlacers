const { companySchema } = require("../Models/companyModel");

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

}