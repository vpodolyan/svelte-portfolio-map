
<script lang="ts">
    import {stocksApi} from '../api/stocks';
    import type { IStockInfo } from '../api/stocks/types/IStockInfo';

    let result: IStockInfo[] = [];

    async function handleChange({target: { value }}) {
        result = await stocksApi.search(value);
    }
</script>

<div class='wrapper'>
    <div class="container">
        <input on:change={handleChange} />
        <div class='search-results'>
            <div class='search-results__item'>Wallmart</div>
            <div>Supper Pupper Rockets Corp.</div>
            <div>Crazy Sunset Studio</div>
            {#each result as stock}
                <div class='search-results__item'>{stock.name}</div>
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