import { PagamentoControllerFactory } from "./pagamento";
import { HealthControllerFactory } from "./health";

export const pagamentoController = PagamentoControllerFactory.create();
export const healthController = HealthControllerFactory.create();
