"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotaController = void 0;
const application_1 = require("../../application");
class RotaController {
    async calcularDistancia(req, res) {
        try {
            // Extrair dados
            const { origem, destino } = req.body;
            // validar dados - ( o que validar aqui )
            //verificar se campos existem
            if (!origem || !destino) {
                return res.status(400).json({ erro: 'Origem e destino são obrigatórios.' });
            }
            //verificar se lat e lng são números
            if (origem.latitude === undefined || origem.longitude === undefined ||
                destino.latitude === undefined || destino.longitude === undefined) {
                return res.status(400).json({ erro: 'Latitude e longitude são obrigatórios.' });
            }
            // Criar DTO de entrada
            const input = {
                origem: {
                    latitude: origem.latitude,
                    longitude: origem.longitude
                },
                destino: {
                    latitude: destino.latitude,
                    longitude: destino.longitude
                }
            };
            // Controller novo (via Use Case):
            const useCase = new application_1.CalcularRotaUseCase();
            const resultado = await useCase.executar(input);
            return res.json(resultado);
        }
        catch (error) {
            // Tratar erros (que status code? que mensagem?)
            if (error.message.includes('Latitude invalidas') || error.message.includes('Longitude invalidas')) {
                return res.status(400).json({
                    erro: error.message,
                    codigo: 'Coordenada_invalida',
                });
            }
            //Erro interno do servidor
            console.error('error interno: ', error);
            return res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }
}
exports.RotaController = RotaController;
//# sourceMappingURL=RotaController.js.map