import { Request, Response } from 'express';
import { IBuscarEnderecoUseCase } from '../../application/interfaces/use-cases/IBuscarEnderecoUseCase';
import { ICalcularRotaUseCase } from '../../application/interfaces/use-cases/ICalcularRotaUseCase';

export class RotaController {
    constructor(
        private buscarEnderecoUseCase: IBuscarEnderecoUseCase,
        private calcularRotaUseCase: ICalcularRotaUseCase
    ) {}

    buscarEndereco = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cep, endereco } = req.query;

            if (!cep && !endereco) {
                res.status(400).json({
                    success: false,
                    error: 'CEP ou endereço é obrigatório'
                });
                return;
            }

            const resultado = await this.buscarEnderecoUseCase.execute({
                cep: cep as string,
                endereco: endereco as string
            });

            res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                error: error.message || 'Erro ao buscar endereço'
            });
        }
    };

    calcularRota = async (req: Request, res: Response): Promise<void> => {
        try {
            const { origem, destino, modoViagem } = req.body;

            if (!origem || !destino) {
                res.status(400).json({
                    success: false,
                    error: 'Origem e destino são obrigatórios'
                });
                return;
            }

            const resultado = await this.calcularRotaUseCase.execute({
                origem,
                destino,
                modoViagem: modoViagem || 'driving'
            });

            res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                error: error.message || 'Erro ao calcular rota'
            });
        }
    };
}


