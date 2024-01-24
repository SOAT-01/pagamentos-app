import { PagamentoTipoEnum } from "entities/pagamento";
import { PedidoSvcApi, PedidoSvcStatus } from "external/pedidoSvc";

export class PedidoSvcGateway {
    constructor(private readonly pedidoSvcApi: PedidoSvcApi) {}

    async updateOrderPaymentStatus(pedidoId: string, tipo: PagamentoTipoEnum): Promise<string> {
        const { data } = await this.pedidoSvcApi.patch<{ qr_data: string }>(
            `/${pedidoId}/update-payment-status`, { status: this.parseStatusPedidoSvc(tipo) });
        return data.qr_data;
    }

    parseStatusPedidoSvc(tipo: PagamentoTipoEnum): PedidoSvcStatus {
        const statusMap = {
            [PagamentoTipoEnum.Aprovado]: "pagamento_aprovado",
            [PagamentoTipoEnum.Recusado]: "pagamento_recusado",
        };

        const status = statusMap[tipo] || "pagamento_pendente";

        return status as PedidoSvcStatus;
    }
}
