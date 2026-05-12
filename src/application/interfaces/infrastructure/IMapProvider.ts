export interface IMapProvider {
    geocode(address: string): Promise<any>;
    reverseGeocode(lat: number, lng: number): Promise<any>;
    getDirections(origin: any, destination: any, mode: string): Promise<any>;
}
