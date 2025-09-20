import { Rota } from "../../domian/entities/rota";
import { Coordenada } from "../../domian/value-objects/coordenada";
import { CalcularRotaInputDTO, CalcularRotaOutputDTO } from "../dtos";
import { IEnderecoRepository } from "../interfaces/repositories/IEnderecoRepository";

export class CalcularRotaUseCase {
  // ➕ Vai receber repository
  constructor(private enderecoRepository: IEnderecoRepository) {}

  // Método 1: Validação (separado)
  private validarInput(input: CalcularRotaInputDTO): void {
    if (!input.origem || !input.destino) {
      throw new Error('Origem e destino são obrigatórios.');
    }
    
    if (typeof input.origem.latitude !== 'number' || typeof input.origem.longitude !== 'number') {
      throw new Error('Latitude e longitude da origem devem ser números.');
    }
    
    if (typeof input.destino.latitude !== 'number' || typeof input.destino.longitude !== 'number') {
      throw new Error('Latitude e longitude do destino devem ser números.');
    }
  }
  
  private extrairMensagemErro(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
  
  // Método 2: Execução principal
  async executar(input: CalcularRotaInputDTO): Promise<CalcularRotaOutputDTO> {
    this.validarInput(input);
    
    const lat1 = input.origem.latitude;
    const lon1 = input.origem.longitude;
    const lat2 = input.destino.latitude;
    const lon2 = input.destino.longitude;
    
    const inicio = Date.now();
    
    let origem: Coordenada;
    let destino: Coordenada;
    let rota: Rota;
    let distancia: number;
    
    // Criar origem
    try {
      origem = new Coordenada(lat1, lon1);
    } catch (error) {
      throw new Error(`Coordenada de origem inválida: ${this.extrairMensagemErro(error)}`);
    }
    
    // Criar destino
    try {
      destino = new Coordenada(lat2, lon2);
    } catch (error) {
      throw new Error(`Coordenada de destino inválida: ${this.extrairMensagemErro(error)}`);
    }
    
    // Criar rota e calcular distância
    try {
      const id = `rota_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      rota = new Rota(id, origem, destino);
      distancia = rota.distanciaTotal;
    } catch (error) {
      throw new Error(`Erro ao calcular rota: ${this.extrairMensagemErro(error)}`);
    }
    
    const fim = Date.now();
    
    return {
      id: rota.getId,
      distanciaPrecisa: distancia,
      distanciaArredondada: Math.round(distancia * 100) / 100,
      unidade: 'km',
      tempoDeProcessamento: fim - inicio,
      calculadoEm: new Date().toISOString(),
      algoritmo: 'haversine',
      versaoApi: '1.0.0'
    };
  }
}