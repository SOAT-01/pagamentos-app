import { PedidoSvcApi } from "external/pedidoSvc";

export class PedidoSvcGateway {
    constructor(private readonly pedidoSvcApi: PedidoSvcApi) {}

    async updateOrderPaymentStatus(pedidoId: string): Promise<string> {
        const { data } = await this.pedidoSvcApi.patch<{ qr_data: string }>(
            `/${pedidoId}/payment-checkout`);
        return data.qr_data;
    }
}
