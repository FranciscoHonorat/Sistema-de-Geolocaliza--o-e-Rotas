// ===== APPLICATION INTERFACES - BARREL EXPORT =====
// Organização central de todas as interfaces da camada Application

// ===== USE CASES INTERFACES =====
// Contratos dos casos de uso (Application Layer)
export type { IBuscarEnderecoUseCase } from './use-cases/IBuscarEnderecoUseCase';
export type { ICalcularRotaUseCase } from './use-cases/ICalcularRotaUseCase';

// ===== REPOSITORY INTERFACES =====
// Contratos de acesso a dados (abstração de persistência)
export type { IEnderecoRepository } from './repositories/IEnderecoRepository';
export type { IRotaRepository } from './repositories/IRotaRepository';

// ===== INFRASTRUCTURE INTERFACES =====
// Contratos de serviços externos (abstração de infraestrutura)
export type { ICacheService } from './infrastructure/ICacheService';
export type { ILogger } from './infrastructure/ILogger';
export type { IMapProvider } from './infrastructure/IMapProvider';

// ===== BARREL EXPORTS ORGANIZADOS =====
// Re-exporta grupos completos para imports mais limpos
export * from './infrastructure';
export * from './repositories';
export * from './use-cases';
