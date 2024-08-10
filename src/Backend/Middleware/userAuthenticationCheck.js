import User from "../Models/userModel.js";

export const userAuthenticationCheck = async (req, res, next) => {
    if (req.user) {
        try {
            const user = await User.findById(req.user);
            if (!user.premiumSubscription) {
                req.userType = "basic";
            } else {
                req.userType = "premium";
            }
        } catch (err) {
            throw new Error("Error while retrieving user");
        }
    } else {
        req.userType = "session";
    }
    next();
};
