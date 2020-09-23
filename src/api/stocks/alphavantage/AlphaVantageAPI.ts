import type { IStocksApi } from "../IStocksService";

export class AlphaVantageAPI implements IStocksApi {
    constructor(private apiKey: string = 'demo') {
    }

    async search(name: string) {
        const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=${this.apiKey}`);
        const data = await response.json();

        return data;
    }
}
