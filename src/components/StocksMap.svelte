<script lang="ts">
    import { treemap, hierarchy } from 'd3';
    import { select } from 'd3-selection';
    import { stocksData } from '../stores';

    let svgElement;

    stocksData.subscribe(data => {
        drawTreeMap(data);
    });

    function drawTreeMap(data) {
        const root = hierarchy(data).sum((d) => d.value);
        const graph = treemap()
            .size([600, 600])
            .padding(2)
            (root);

        const svg = select(svgElement);

        svg.html('');

        svg
            .selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y0)
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', (d) => d.y1 - d.y0)
                .style("stroke", "black")
                .style("fill", "#734E99");
        
        svg
            .selectAll("text")
            .data(root.leaves())
            .enter()
            .append("text")
                .attr("x", (d) => d.x0 + 5)    // +10 to adjust position (more right)
                .attr("y", (d) => d.y0 + 20)   // +20 to adjust position (lower)
                .text((d) => d.data.name)
                .attr("font-size", "15px")
                .attr("fill", "white")
    }
</script>

<svg bind:this={svgElement} viewBox='0 0 800 800'>
</svg>

<style>
	svg {
		/* width: 80%; */
		/* height: 80%; */
	}
</style>