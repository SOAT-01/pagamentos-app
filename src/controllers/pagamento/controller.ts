import { NextFunction, Request, Response } from "express";
import { PagamentoUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";

export class PagamentoController {
    constructor(private readonly pagamentoUseCase: PagamentoUseCase) {}

    public async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const result = await this.pagamentoUseCase.getAll();
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const { id } = req.params;

        try {
            const result = await this.pagamentoUseCase.getById(id);
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getByPedidoId(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const { pedidoId } = req.params;

        try {
            const result = await this.pagamentoUseCase.getByPedidoId(pedidoId);
            return res
                .status(StatusCode.ok)
                .json(result);
        } catch (error) {
            next(error);
        }
    }

    public async post(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const result = await this.pagamentoUseCase.create(req.body);
            return res.status(StatusCode.created).json(result);
        } catch (error) {
            next(error);
        }
    }
}
