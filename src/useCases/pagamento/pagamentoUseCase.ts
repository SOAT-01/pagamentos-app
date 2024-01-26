import { PagamentoGateway } from "interfaces/gateways";
import { PagamentoDTO } from "./dto";
import { IPagamentoUseCase } from "./pagamento.interface";
import { PagamentoMapper } from "adapters/mappers";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { PagamentoTipoEnum } from "entities/pagamento";
import { AssertionConcern } from "utils/assertionConcern";
import { BadError } from "utils/errors/badError";
import { PedidoSvcGateway } from "gateways/pedidoSvcGateway";
import { pedidoSvcAPi } from "external/pedidoSvc";

export class PagamentoUseCase implements IPagamentoUseCase {
    constructor(
        private readonly pagamentoGateway: PagamentoGateway,
        private readonly pedidoSvcGateway: PedidoSvcGateway,
    ) {}

    public async create(pagamento: PagamentoDTO): Promise<PagamentoDTO> {
        if (pagamento.tipo && pagamento.tipo !== PagamentoTipoEnum.Pendente) {
            throw new BadError("Não é necessário informar o tipo de pagamento");
        }

        const novoPagamento = PagamentoMapper.toDomain(pagamento);
        const alreadyExists = await this.pagamentoGateway.checkDuplicate({
            pedidoId: pagamento.pedidoId,
        });

        if (alreadyExists)
            throw new BadError("Já existe registro para esse pedido");

        const result = await this.pagamentoGateway.create(novoPagamento);
        return PagamentoMapper.toDTO(result);
    }

    public async getAll(): Promise<PagamentoDTO[]> {
        const results = await this.pagamentoGateway.getAll();

        return results.map((result) => PagamentoMapper.toDTO(result));
    }

    public async getById(id: string): Promise<PagamentoDTO> {
        const result = await this.pagamentoGateway.getById(id);

        if (!result)
            throw new ResourceNotFoundError("Pagamento não encontrado");

        return PagamentoMapper.toDTO(result);
    }

    public async getByPedidoId(pedidoId: string): Promise<PagamentoDTO> {
        const result = await this.pagamentoGateway.getByPedidoId(pedidoId);

        if (!result) throw new ResourceNotFoundError("Pedido não encontrado");

        return PagamentoMapper.toDTO(result);
    }

    public async updateStatus(
        id: string,
        status: PagamentoTipoEnum,
    ): Promise<PagamentoDTO> {
        const pagamentoToUpdateStatus = await this.pagamentoGateway.getById(id);
        const possibleStatus = Object.values(PagamentoTipoEnum);

        AssertionConcern.assertArgumentNotEmpty(
            status,
            "É necessário informar o status",
        );
        AssertionConcern.assertArgumentIsValid(
            status,
            possibleStatus,
            "É necessário informar um status válido",
        );

        if (!pagamentoToUpdateStatus) {
            throw new ResourceNotFoundError("Pagamento não encontrado");
        }

        if (pagamentoToUpdateStatus.tipo !== PagamentoTipoEnum.Pendente) {
            throw new BadError(
                `Não é possível alterar o status pois já foi ${pagamentoToUpdateStatus.tipo}!`,
            );
        }

        const result = await this.pagamentoGateway.updateStatus(id, status);

        await this.pedidoSvcGateway.updateOrderPaymentStatus(
            result.pedidoId,
            result.tipo as PagamentoTipoEnum,
        );

        return PagamentoMapper.toDTO(result);
    }
}
