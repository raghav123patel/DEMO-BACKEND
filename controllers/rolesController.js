const ROLES = require("../staticfiles/roles");

exports.getRoles = (req,res) => {
    return res.status(200).json(Object.values(ROLES))
}