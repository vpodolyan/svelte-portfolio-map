import { AlphaVantageAPI } from "./alphavantage/AlphaVantageAPI";

export const stocksApi = new AlphaVantageAPI(appConfig.env.ALPHA_VANTAGE_API_KEY);