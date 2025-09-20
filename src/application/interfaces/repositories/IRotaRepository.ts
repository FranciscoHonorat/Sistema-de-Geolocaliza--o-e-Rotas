
import type { Rota } from "../../../domian/entities/rota";
export interface IRotaRepository {
  // Salvar rota calculada
  salvar(rota: Rota): Promise<string>; // retorna ID
  
  // Buscar rota por ID
  buscarPorId(id: string): Promise<Rota | null>;
  
  // Histórico de rotas do usuário
  buscarPorUsuario(usuarioId: string): Promise<Rota[]>;
}