import { axiosInstance } from "./axios";

export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

const CURRENCIES_URL = "/currencies";

export const getCurrencies = async (): Promise<Currency[]> => {
    const response = await axiosInstance.get<Currency[]>(CURRENCIES_URL);
    
    return response.data;
}