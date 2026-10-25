function requireAuth(req, res, next) {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({
            message: "You must be logged in to access this resource."
        });
    }

    next();
}

export default requireAuth;