import express, {json} from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import {CatequistaResource} from "./features/catequista/CatequistaResource";
import {TurmaResource} from "./features/turma/TurmaResource";
import {EtapaResource} from "./core/dominio/etapa/EtapaResource";

const app = express();
const port = 3000;
const BEARER_PREFIX = "BEARER";
const secretKey = "klsghefslgihgkdlsgh";
const catequistaRoutes = new CatequistaResource();
const turmaRoutes = new TurmaResource();
const etapaRoutes = new EtapaResource();

app.use(json());

/**
 * Olhar a doc do cors para mais detalhes sobre sua utilização:
 *
 * https://expressjs.com/en/resources/middleware/cors.html
 */
app.use(cors());

app.use("/doc", swaggerUi.serve, swaggerUi.setup());
app.use("/", catequistaRoutes.router);
app.use("/", turmaRoutes.router);
app.use("/", etapaRoutes.router);

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