export type PedidoSvcStatus = "pagamento_pendente" | "pagamento_aprovado" | "pagamento_recusado";

export interface PedidoSvcEvent {
  pagamento: PedidoSvcStatus;
}
