import JWT from "jsonwebtoken";
import Boom from "boom";

// In-memory storage for refresh tokens
const refreshTokensStore = {};

// Function to sign access tokens
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

// Middleware to verify access tokens
const verifyAccessToken = (req, res, next) => {
    const authorizationToken = req.headers["authorization"];
    if (!authorizationToken) {
        return next(Boom.unauthorized());
    }

    JWT.verify(authorizationToken, process.env.JWT_SECRET, (err, payload) => {
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

// Function to sign refresh tokens
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

            // Store the refresh token in the in-memory store
            refreshTokensStore[user_id] = token;

            resolve(token);
        });
    });
};

// Function to verify refresh tokens
const verifyRefreshToken = (refresh_token) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, payload) => {
            if (err) {
                return reject(Boom.unauthorized());
            }

            const { user_id } = payload;
            const storedToken = refreshTokensStore[user_id];

            if (!storedToken) {
                return reject(Boom.unauthorized());
            }

            if (refresh_token === storedToken) {
                return resolve(user_id);
            } else {
                return reject(Boom.unauthorized());
            }
        });
    });
};

export {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
};
