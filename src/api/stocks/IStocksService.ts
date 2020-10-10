import type { IStockInfo } from "./types/IStockInfo";
import type { IStockSearchInfo } from "./types/IStockSearchInfo"

export interface IStocksApi {
    search(name: string): Promise<IStockSearchInfo[]>;
    getQuoteInfo(symbol: string): Promise<IStockInfo>;
}
