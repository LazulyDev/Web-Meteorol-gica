export interface MeteoResponse {
    name: string;               // nombre de la ciudad
    main: {
        temp: number;           // temperatura actual
        feels_like: number;     // sensación térmica
        humidity: number;       // humedad %
    };
    weather: {
        description: string;    // descripción del clima
        icon: string;           // icono del clima
    }[];
    wind: {
        speed: number;          // velocidad del viento en m/s
    };
}