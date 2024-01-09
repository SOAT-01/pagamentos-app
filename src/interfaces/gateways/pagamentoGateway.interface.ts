import { Pagamento, PagamentoTipoEnum } from "entities/pagamento";
import { PagamentoDTO } from "useCases";

export interface PagamentoGateway {
  create(pagamento: PagamentoDTO): Promise<Pagamento>;
  getAll(filters?: Partial<Pagamento>): Promise<Pagamento[]>;
  getById(id: string): Promise<Pagamento>;
  updateStatus (id: string, status: PagamentoTipoEnum): Promise<Pagamento>;
  getByPedidoId(pedidoId: string): Promise<Pagamento>;
  checkDuplicate(args: { pedidoId: string }): Promise<boolean>;
}
