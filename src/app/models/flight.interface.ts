export interface Flight {
    flightNumber: string;
    status: 'hangar' | 'airborne' | 'malfunction';
    takeoffTime: string;
    landingTime: string;
    takeoffAirport: string;
    landingAirport: string;
    takeoffTimeDelay?: number;
    landingTimeDelay?: number;
}