
<script lang="ts">
    import {clickOutside} from '../helpers/clickOutside';

    import {stocksApi} from '../api/stocks';
    import type { IStockSearchInfo } from '../api/stocks/types/IStockSearchInfo';

    import { stocksData } from '../stores';

    let showResults = false;
    let result: IStockSearchInfo[] = [];

    async function handleChange({target: { value }}) {
        result = await stocksApi.search(value);
        showResults = true;
    }

    function handleClickOutside() {
        showResults = false;
    }

    async function onStockClick(stock: IStockSearchInfo) {
        try {
            const result = await stocksApi.getQuoteInfo(stock.symbol);
            stocksData.update(data => ({...data, children: [...data.children, {name: stock.symbol, value: +result.price}]})) 
        } catch {}
        finally {
            showResults = false;
        }
    }
</script>

<div class='wrapper'>
    <div class="container">
        <input on:change={handleChange} />
        {#if showResults}
            <div class='search-results' use:clickOutside on:clickoutside={handleClickOutside} >
                {#each result as stock}
                    <div
                        class='search-results__item'
                        on:click={() => onStockClick(stock)}
                    >
                        {stock.name}<span class='search-results__item__symbol'>{stock.symbol}</span>
                    </div>
                {/each}
            </div>
        {/if}
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
        line-height: 2.5em;
    }

    .search-results {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 32px;
        box-shadow: 0px 3px 7px 0px rgba(50, 50, 50, 0.55);
        background: white;
        z-index: 100;
    }

    .search-results__item {
        transition: color 0.2s;
        width: 100%;
        text-align: left;
    }

    .search-results__item__symbol {
        font-size: 0.6em;
        vertical-align: super;
        padding-left: 4px;
    }

    .search-results__item:hover {
        color: #ff3e3F;
        cursor: pointer;
    }
</style>