import express, {json} from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import {CatequistaResource} from "./features/catequista/CatequistaResource";
import {TurmaResource} from "./features/turma/TurmaResource";
import {EtapaResource} from "./core/dominio/etapa/EtapaResource";
import {CatequizandoResource} from "./features/catequizando/CatequizandoResource";
import {HttpUtil} from "./core/util/HttpUtil";
import {LoginResource} from "./features/login/LoginResource";

const app = express();
const port = 3333;
const BEARER_PREFIX = "BEARER";
const secretKey = "klsghefslgihgkdlsgh";

const catequistaRoutes = new CatequistaResource();
const catequizandosRoutes = new CatequizandoResource();
const turmaRoutes = new TurmaResource();
const etapaRoutes = new EtapaResource();
const loginRoutes = new LoginResource();

app.use(json());

/**
 * Olhar a doc do cors para mais detalhes sobre sua utilização:
 *
 * https://expressjs.com/en/resources/middleware/cors.html
 */
app.use(cors());

app.use("/doc", swaggerUi.serve, swaggerUi.setup());
app.use("/api/", catequistaRoutes.router);
app.use("/api/", catequizandosRoutes.router);
app.use("/api/", turmaRoutes.router);
app.use("/api/", etapaRoutes.router);
app.use("/api/", loginRoutes.router);
app.use("/", (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err) {
        HttpUtil.doSendError(res, err.status, err.message);
    } else {
        next();
    }
});

const extrairTokenString = function (token: string) {
    if (token.toUpperCase().includes(BEARER_PREFIX)) {
        return token.substr(BEARER_PREFIX.length).trim();
    }
    return token;
};

const validaToken = (req: express.Request, res: express.Response, next: any) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).end();
    }
    let base64 = extrairTokenString(token);
    jwt.verify(base64, secretKey, (err: any, decoded: any) => {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        req.body.userId = decoded.id;
        next();
    });
};


app.listen(port, () => {
    console.log(`e-Catequese back-end listening at http://localhost:${port}`)
})