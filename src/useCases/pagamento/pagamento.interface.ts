import { PagamentoDTO } from "./dto";

export interface IPagamentoUseCase {
    create(pagamento: PagamentoDTO): Promise<PagamentoDTO>;
    getAll(): Promise<PagamentoDTO[]>;
    getById(id: string): Promise<PagamentoDTO>;
    getByPedidoId(pedidoId: string): Promise<PagamentoDTO>;
}
