import type { BuscarEnderecoOutputDTO } from '../../application/dtos/BuscarEnderecoOutputDTO';

// Provider para buscar CEPs brasileiros via ViaCEP API
export class ViaCEPProvider {
    private baseUrl = 'https://viacep.com.br/ws';
    
    async buscarEnderecoPorCep(cep: string): Promise<BuscarEnderecoOutputDTO> {
        // 🎓 CONCEITO: Limpar entrada
        const cepLimpo = cep.replace(/\D/g, '');
        
        // 🎓 CONCEITO: Validar formato
        if (cepLimpo.length !== 8) {
            throw new Error('CEP deve ter 8 dígitos');
        }
        
        const url = `${this.baseUrl}/${cepLimpo}/json/`;
        
        // TODO: Fazer requisição
        // TODO: Transformar resposta ViaCEP → DTO
        throw new Error('ViaCEP implementation pending');
    }
}