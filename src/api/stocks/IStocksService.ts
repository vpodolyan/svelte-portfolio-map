import type { IStockInfo } from "./types/IStockInfo";

export interface IStocksApi {
    search(name: string): Promise<IStockInfo[]>;
}
