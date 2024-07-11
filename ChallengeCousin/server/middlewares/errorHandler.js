function errorhandler(error, req, res, next) {
    switch (error.name) {
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: "email must be unique"})
            break;
        case "SequelizeValidationError":
            res.status(400).json({message: error.errors[0].message})
            break;
        case "BadRequest":
            res.status(400).json({message: error.message})
            break;
        case "Unauthenticated":
            res.status(401).json({message: error.message})
            break;
        case "JsonWebTokenError":
            res.status(401).json({message: error.message})
            break;
        case "Unauthorized":
            res.status(403).json({message: "Authorization failed"})
            break;
        case "NotFound":
            res.status(404).json({message: error.message})
            break;
        default:
            res.status(500).json({message: "internal server error"})
            console.log(error)
            break;
    }
}

module.exports = errorhandler