import { CalcularRotaInputDTO, CalcularRotaOutputDTO } from '../dtos';
interface Dependencies {
}
export declare class RotaService {
    constructor(dependencies?: Dependencies);
    calcularRota(input: CalcularRotaInputDTO): Promise<CalcularRotaOutputDTO>;
}
export {};
//# sourceMappingURL=RotaServices.d.ts.map