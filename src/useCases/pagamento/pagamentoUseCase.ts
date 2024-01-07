import { PagamentoGateway } from "interfaces/gateways";
import { PagamentoDTO } from "./dto";
import { IPagamentoUseCase } from "./pagamento.interface";
import { PagamentoMapper } from "adapters/mappers";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { PagamentoTipoEnum } from "entities/pagamento";

export class PagamentoUseCase implements IPagamentoUseCase {
    constructor(private readonly pagamentoGateway: PagamentoGateway) {}

    public async create(pagamento: PagamentoDTO): Promise<PagamentoDTO> {
        if (pagamento.tipo && pagamento.tipo !== PagamentoTipoEnum.Pendente) {
            throw new Error("Não é necessário informar o tipo de pagamento");
        }

        const novoPagamento: PagamentoDTO = {
            pedidoId: pagamento.pedidoId,
            valorTotal: pagamento.valorTotal
        };

        const result = await this.pagamentoGateway.create(novoPagamento);
        return PagamentoMapper.toDTO(result);
    }

    public async getAll(): Promise<PagamentoDTO[]> {
        const results = await this.pagamentoGateway.getAll();

        return results.map((result) => PagamentoMapper.toDTO(result));
    }

    public async getById(id: string): Promise<PagamentoDTO> {
        const result = await this.pagamentoGateway.getById(id);

        if (!result) throw new ResourceNotFoundError("Pagamento não encontrado");

        return PagamentoMapper.toDTO(result);
    }

    public async getByPedidoId(pedidoId: string): Promise<PagamentoDTO> {
        const result = await this.pagamentoGateway.getByPedidoId(pedidoId);

        if (!result) throw new ResourceNotFoundError("Pedido não encontrado");

        return PagamentoMapper.toDTO(result);
    }
}
