// ===== BARREL EXPORT DOS DTOs =====
// Re-exporta todos os DTOs de forma limpa

// DTOs principais do sistema
export type { CalcularRotaInputDTO } from './CalcularRotaInputDTO';
export type { CalcularRotaOutputDTO } from './CalcularRotaOutputDTO';

export type { BuscarEnderecoInputDTO } from './BuscarEnderecoInputDTO';
export type { BuscarEnderecoOutputDTO } from './BuscarEnderecoOutputDTO';
export type { CoordenadaDTO } from './CoordenadaDTO';

// DTOs de erro e validação
export type { ValidacaoErrorDTO } from './ValidacaoErrorDTO';

// ===== TIPOS AUXILIARES PARA USE CASES =====
// Tipos úteis que serão usados pelos Use Cases

export type TipoRota = 'mais-curta' | 'mais-rapida';
export type TipoVeiculo = 'carro' | 'bicicleta' | 'a-pe';
export type UnidadeMedida = 'km' | 'miles';