import { Request, Response } from 'express';
import { Rota } from '../../domian/entities/rota';
import { Coordenada } from '../../domian/value-objects/coordenada';

export class RotaController {
    calcularDistancia(req: Request, res: Response) {
        try {
            // Extrair dados
            const { origem, destino } = req.body;

            // validar dados - ( o que validar aqui )
            //verificar se campos existem
            if (!origem || !destino) {
                return res.status(400).json({ erro: 'Origem e destino são obrigatórios.' });
            }

            //verificar se lat e lng são números
            if (origem.lat === undefined || origem.lng === undefined ||
                destino.lat === undefined || destino.lng === undefined
            ) {
                return res.status(400).json({ erro: 'Latitude e longitude são obrigatórios.' });
            }

            // Converter para objetos de domínio (como criar coordenada e rota)
            const coordOrigem = new Coordenada(origem.lat, origem.lng);
            const coordDestino = new Coordenada(destino.lat, destino.lng);
            const rotaId = `rota-${Date.now()}`;
            const novaRota = new Rota(rotaId, coordOrigem, coordDestino);
            // Executar lógica (que método chamar?)
            const distancia = novaRota.distanciaTotal;
            // Formatar resposta
            return res.status(200).json({
                id: novaRota.getId,
                distancia: Math.round(distancia),
                origem: { lat: origem.lat, lng: origem.lng },
                destino: { lat: destino.lat, lng: destino.lng },
                unidade: 'km',
                calculadoEm: new Date().toISOString(),
                algoritmo: 'haversine',
                versaoApi: '1.0.0'
            });
        } catch (error: any) {
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


