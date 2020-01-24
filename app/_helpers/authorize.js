const expressJwt = require('express-jwt');
//const { secret } = require('config.json');  
const { secret } = 'corona_navarro';
module.exports = authorize;

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    console.log("rOLES " + roles);
    if (typeof roles === 'string') {
        roles = [roles];
       
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret: 'corona_navarro' }),

        // authorize based on user role
        (req, res, next) => {
            console.log("rOLES n " + req.user.role);
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized 21/01/2020' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}