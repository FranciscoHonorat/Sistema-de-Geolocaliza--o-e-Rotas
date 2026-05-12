import axios from 'axios';
import type { BuscarEnderecoOutputDTO } from '../../application/dtos/BuscarEnderecoOutputDTO';

interface ViaCEPResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: boolean;
}

// Provider para buscar CEPs brasileiros via ViaCEP API
export class ViaCEPProvider {
    private baseUrl = 'https://viacep.com.br/ws';
    
    async buscarEnderecoPorCep(cep: string): Promise<BuscarEnderecoOutputDTO> {
        try {
            const cepLimpo = cep.replace(/\D/g, '');

            if (cepLimpo.length !== 8) {
                throw new Error('CEP deve ter 8 dígitos');
            }

            const response = await axios.get<ViaCEPResponse>(`${this.baseUrl}/${cepLimpo}/json/`);

            if (response.data.erro) {
                throw new Error('CEP não encontrado');
            }

            return {
                endereco: `${response.data.logradouro}, ${response.data.bairro}`,
                coordenadas: { latitude: 0, longitude: 0 },
                cep: response.data.cep,
                cidade: response.data.localidade,
                estado: response.data.uf,
                pais: 'Brasil'
            };
        } catch (error) {
            throw new Error(`Erro ao buscar CEP: ${error}`);
        }
    }
}