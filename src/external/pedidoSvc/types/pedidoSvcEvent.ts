export type PedidoSvcStatus = "pagamento_pendente" | "pagamento_aprovado" | "pagamento_nao_autorizado";

export interface PedidoSvcEvent {
  pagamento: PedidoSvcStatus;
}
