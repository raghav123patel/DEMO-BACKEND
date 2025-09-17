require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { ROLES } = require("../staticfiles/roles");

const connectWithDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Atlas connection successful");

        const superadminEmail = process.env.SUPERADMIN_EMAIL;
        const superadminPassword = process.env.SUPERADMIN_PASSWORD;

        const existing = await User.findOne({ email: superadminEmail });

        if (existing) {
            console.log("Superadmin already exists with role:", existing.role);
        } else {
            const hashedPassword = await bcrypt.hash(superadminPassword, 10);

            const superadmin = new User({
                firstName: "Super",
                lastName: "Admin",
                email: superadminEmail,
                password: hashedPassword,
                role: ROLES.superAdmin,
            });

            await superadmin.save();
            console.log("Superadmin created successfully");
        }

    } catch (error) {
        console.error("Database connection or superadmin creation failed:", error);
    }
};

module.exports = connectWithDb;








// require("dotenv").config();
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("../models/userModel");
// const ROLES = require("../staticfiles/roles");

// const connectWithDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL); 

//     console.log("MongoDB Atlas connection successful");

//     const superadminEmail = process.env.SUPERADMIN_EMAIL;
//     const superadminPassword = process.env.SUPERADMIN_PASSWORD;

//     const existing = await User.findOne({ email: superadminEmail });
//     console.log("super admin role in db", existing.role);
//     if (!existing) {
//       const hashedPassword = await bcrypt.hash(superadminPassword, 10);

//       const superadmin = new User({
//         firstName: "Super",
//         lastName: "Admin",
//         email: superadminEmail,
//         password: hashedPassword,
//         role: ROLES.superAdmin,
//       });

//       await superadmin.save();
//       console.log("Superadmin created successfully");
//     } else {
//       console.log("Superadmin already exists");
//     }
//   } catch (error) {
//     console.error("Database connection or superadmin creation failed:", error);
//   }
// };

// module.exports = connectWithDb;
