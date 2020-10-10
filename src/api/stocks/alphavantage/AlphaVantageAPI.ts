import type { IStocksApi } from "../IStocksService";
import type { IStockInfo } from "../types/IStockInfo";

export class AlphaVantageAPI implements IStocksApi {
    constructor(private apiKey: string = 'demo') {
    }
    
    async search(name: string) {
        const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=${this.apiKey}`);
        const data = await response.json();
        
        return data.bestMatches && data.bestMatches.map(item => ({ name: item['2. name'], symbol: item['1. symbol'] })) || [];
    }

    async getQuoteInfo(symbol: string): Promise<IStockInfo> {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`);
        const data = await response.json();

        if (!data['Global Quote']) {
            throw new Error('Quote not found');
        }

        const {'05. price': price} = data['Global Quote'];
        return {symbol, price};
    }
}
