import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {APIException} from "../exception/APIException";
import {AppToken, AuthResponse} from "./AuthUser";

export class Authorizer {
    public authorize(...allowed: string[]) {

        const isAllowed = (role: string) => allowed.indexOf(role) > -1;

        return (req: Request, res: Response, next: NextFunction) => {
            let authParams = this.extractBasicAuthParams(req);

            if (isAllowed(authParams.username)) {
                next();
            } else {
                res.status(403).send("Double Down!");
            }
        };
    };

    public generateJWT(usrName?: string, pwd?: string): string {
        return "blazin";
    }

    public authorized(...allowed: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log("extractAuthorizationHeader", req);
                const token = this.extractAuthorizationHeader(req);
                this.jwtAuthorizer((authRes: AuthResponse) => {
                    next();
                }, (authRes: AuthResponse) => {
                    res.status(authRes.code).send(authRes.message);
                }, token, ...allowed);
            } catch (e) {
                res.status(400).send(e.message);
            }
        };
    }

    public extractAuthorizationHeader(req: Request): string {
        let token = req.get("Authorization");
        if (!token) {
            token = req.get("authorization");
        }
        if (!token) {
            throw new Error("Header Authorization não encontrado.");
        }
        return token;
    }

    public jwtAuthorizer(onSuccess: (authRes: AuthResponse) => void,
                         onDeny: (authRes: AuthResponse) => void,
                         token: string,
                         ...allowed: string[]) {
        const isAllowed = (role: string) => {
            if (allowed)
                return allowed.indexOf(role) > -1;
            return true;
        };
        if (token) {
            jwt.verify(this.extractTokenBase64(token), "secret", (onError, decoded) => {
                if (onError) {
                    onDeny({
                        code: 401,
                        message: "Invalid token."
                    });
                }
                if (decoded) {
                    const unpacked = decoded as AppToken;
                    console.log(unpacked);
                    const found = unpacked.roles.find(r => isAllowed(r));
                    if (found) {
                        onSuccess({code: 200});
                    } else {
                        onDeny({code: 401, message: "Forbidden."});
                    }
                }
            });
        }
    }

    private extractTokenBase64(authorizationHeader: string): string {
        if (!authorizationHeader || authorizationHeader.length === 0)
            throw new APIException("Não foi possível obter o token.");
        if (authorizationHeader.toLowerCase().includes("bearer"))
            return authorizationHeader.substr("bearer".length).trim();
        return authorizationHeader.trim();
    }

    private extractBasicAuthParams(req: Request) {
        const username = "usr";
        const password = "pwd";
        return {username, password};
    }
}

const users = {
    users: {
        "admin": "admin",
        "professor": "professor"
    }
};

// const routes = [];
// routes.push()
//
// const extractBasicAuthParams = (req) => {
//     let authHeader = req.get("Authorization");
//     let authParams = atob(authHeader.substr("Basic ".length, authHeader.length)).split(":");
//     return {
//         username: authParams[0],
//         password: authParams[1]
//     };
// };
//
//
// const authorizer = {
//     authorizer: (usr: string, pwd: string) => {
//         console.log(`usr: ${usr} - pwd: ${pwd}`);
//         const usrMatches = basicAuth.safeCompare(usr, "admin");
//         const pwdMatches = basicAuth.safeCompare(pwd, "admin");
//         console.log(`usrMatches: ${usrMatches} - pwdMatches: ${pwdMatches}`);
//         return usrMatches && pwdMatches;
//     }
// };
//
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
//
// // app.use(basicAuth(authorizer));
//
// //app.use("/", basicAuth(authorizer));
// app.use("/", authorize("admin"));
// app.use(["/teste", "/qualquercoisa"], authorize("admin", "commonUser"));
