import { Router } from "express";
import { makePagamentoRouter } from "./pagamentoRouter";
import { makeHealthRouter } from "./healthRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/pagamento", makePagamentoRouter());
    serverRouter.use("/health", makeHealthRouter());

    return serverRouter;
}
