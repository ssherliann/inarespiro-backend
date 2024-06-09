import JWT from "jsonwebtoken";
import Boom from "boom";

const signAccessToken = (data) => {
    return new Promise((resolve, reject) => {
        const payload = {
            ...data,
        };

        const options = {
            expiresIn: "10d",
            issuer: "ecommerce.app",
        };

        JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
            if (err) {
                console.log(err);
                reject(Boom.internal());
            }

            resolve(token);
        });
    });
};

const verifyAccessToken = (req, res, next) => {
    const authorizationToken = req.headers["authorization"];
    if (!authorizationToken) {
        return next(Boom.unauthorized());
    }

    const token = authorizationToken.split(" ")[1]; // Assuming Bearer token format

    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return next(
                Boom.unauthorized(
                    err.name === "JsonWebTokenError" ? "Unauthorized" : err.message
                )
            );
        }

        req.payload = payload;
        next();
    });
};

const signRefreshToken = (user_id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            user_id,
        };
        const options = {
            expiresIn: "180d",
            issuer: "ecommerce.app",
        };

        JWT.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token) => {
            if (err) {
                console.log(err);
                reject(Boom.internal());
            }

            resolve(token);
        });
    });
};

const verifyRefreshToken = (refresh_token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(
            refresh_token,
            process.env.JWT_REFRESH_SECRET,
            (err, payload) => {
                if (err) {
                    return reject(Boom.unauthorized());
                }

                const { user_id } = payload;
                resolve(user_id);
            }
        );
    });
};

export {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
};
