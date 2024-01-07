import { Entity } from "interfaces/entity.interface";
import { AssertionConcern } from "utils/assertionConcern";

export enum PagamentoTipoEnum {
    Pendente = "pendente",
    Aprovado = "aprovado",
    Recusado = "recusado",
}

export type PagamentoTipo = `${PagamentoTipoEnum}`;

export type PagamentoFields = Pick<Pagamento, "id" | "pedidoId" | "tipo" | "valorTotal">;

export class Pagamento implements Entity {
    id: string;
    pedidoId: string;
    tipo: PagamentoTipo;
    valorTotal: number;

    constructor(fields: PagamentoFields) {
        this.id = fields.id;
        this.pedidoId = fields.pedidoId;
        this.tipo = fields.tipo;
        this.valorTotal = fields.valorTotal;

        this.validateEntity();
    }

    public validateEntity(): void {
        AssertionConcern.assertArgumentNotEmpty(
            this.pedidoId,
            "pedidoId is required",
        );
        AssertionConcern.assertArgumentIsObjectId(
            this.pedidoId,
            "pedidoId must be a valid ObjectId",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.pedidoId,
            "status is required",
        );
        AssertionConcern.assertArgumentIsValid(
            this.tipo,
            Object.values(PagamentoTipoEnum),
            `status must be one of ${Object.values(PagamentoTipoEnum)}`,
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.valorTotal,
            "Valor total is required",
        );
        AssertionConcern.assertArgumentIsBiggerThanZero(
            this.valorTotal,
            "Valor total must be bigger than zero",
        );

    }
}
