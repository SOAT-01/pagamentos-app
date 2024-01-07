import { PagamentoUseCase } from "useCases";
import { PagamentoMongoGateway } from "gateways";
import { PagamentoModel } from "external/mongo/models";
import { PagamentoController } from "./controller";

export class PagamentoControllerFactory {
    public static create(): PagamentoController {
        const pagamentoGateway = new PagamentoMongoGateway(PagamentoModel);
        const pagamentoUseCase = new PagamentoUseCase(pagamentoGateway);
        return new PagamentoController(pagamentoUseCase);
    }
}

