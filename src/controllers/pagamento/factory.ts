import { PagamentoUseCase } from "useCases";
import { PagamentoMongoGateway } from "gateways";
import { PagamentoModel } from "external/mongo/models";
import { PagamentoController } from "./controller";
import { PedidoSvcGateway } from "gateways/pedidoSvcGateway";
import { pedidoSvcAPi } from "external/pedidoSvc";

export class PagamentoControllerFactory {
    public static create(): PagamentoController {
        const pagamentoGateway = new PagamentoMongoGateway(PagamentoModel);
        const pedidoSvcGateway = new PedidoSvcGateway(pedidoSvcAPi);
        const pagamentoUseCase = new PagamentoUseCase(
            pagamentoGateway,
            pedidoSvcGateway,
        );
        return new PagamentoController(pagamentoUseCase);
    }
}
