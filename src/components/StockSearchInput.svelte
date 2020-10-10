
<script lang="ts">
    import {stocksApi} from '../api/stocks';
    import type { IStockSearchInfo } from '../api/stocks/types/IStockSearchInfo';

    import { stocksData } from '../stores';

    let result: IStockSearchInfo[] = [];

    async function handleChange({target: { value }}) {
        result = await stocksApi.search(value);
    }

    async function onStockClick(stock: IStockSearchInfo) {
        try {
            const result = await stocksApi.getQuoteInfo(stock.symbol);
            stocksData.update(data => ({...data, children: [...data.children, {name: stock.symbol, value: +result.price}]})) 
        } catch {}
    }
</script>

<div class='wrapper'>
    <div class="container">
        <input on:change={handleChange} />
        <div class='search-results'>
            {#each result as stock}
                <div
                    class='search-results__item'
                    on:click={() => onStockClick(stock)}
                >
                    {stock.name}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    input {
        color: #ff3e00;
        font-size: 2em;
        font-weight: 300;
        border: none;
        border-bottom: 1px solid #ff3e00;
        outline: none;
        margin: 12px;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container {
        color: #ff3e00;
        font-size: 1.5em;
        font-weight: 100;
    }

    .search-results {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 32px;
    }

    .search-results__item {
        transition: color 0.2s;
        width: 100%;
        text-align: left;
    }

    .search-results__item:hover {
        color: #ff3e3F;
        cursor: pointer;
    }
</style>