interface ISuggestItem {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}

interface Region {
    latitude: number;
    longitude: number;

    latitudeDelta?: number;
    longitudeDelta?: number;

    name?: string;
    region?: string;
    country?: string;
}

export type { Region, ISuggestItem };
