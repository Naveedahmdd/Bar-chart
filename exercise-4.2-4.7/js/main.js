const container = d3.select(".responsive-svg-container");
const stage = Number(container.attr("data-stage"));
const svg = container.append("svg").attr("role", "img");
svg.append("title").text("TV brand model count exercise " + stage);
let chartWidth = stage >= 6 ? 800 : 1200;
const chartHeight = 1050;
svg.attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`);

if (stage === 2) {
  d3.select("h1").style("color", "#287348");
  d3.select(".container").append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");
  svg.attr("viewBox", "0 0 600 180");
  svg.append("rect").attr("x", 50).attr("y", 50)
    .attr("width", 100).attr("height", 30).attr("fill", "green");
} else if (stage === 3) {
  svg.attr("viewBox", "0 0 1200 1600").style("border", "1px solid black");
  svg.append("rect").attr("x", 10).attr("y", 10)
    .attr("width", 414).attr("height", 16).attr("fill", "blue");
} else {
  d3.csv("data/tvBrandCount.csv", d => ({brand: d.brand, count: +d.count}))
    .then(data => {
      if (data.some(d => !d.brand || !Number.isFinite(d.count) || d.count < 0)) {
        throw new Error("The CSV must contain brand and non-negative numeric count columns.");
      }
      data.sort((a, b) => d3.descending(a.count, b.count));
      console.log("Typed CSV rows:", data);
      console.log("Rows:", data.length);
      console.log("Maximum:", d3.max(data, d => d.count));
      console.log("Minimum:", d3.min(data, d => d.count));
      console.log("Extent:", d3.extent(data, d => d.count));
      d3.select("#status").text(`${data.length} brands · ${d3.sum(data, d => d.count).toLocaleString()} models`);
      drawBarChart(data);
      if (stage === 7) {
        d3.select("#sort").on("change", function () {
          data.sort(this.value === "brand"
            ? (a, b) => d3.ascending(a.brand, b.brand)
            : (a, b) => d3.descending(a.count, b.count));
          drawBarChart(data);
        });
        d3.select("#resize").on("click", function () {
          chartWidth = chartWidth === 800 ? 560 : 800;
          this.textContent = chartWidth === 800 ? "Use compact chart" : "Use wide chart";
          drawBarChart(data);
        });
      }
    }).catch(error => {
      console.error(error);
      d3.select("#status").attr("class", "error")
        .text("Data could not load. Open through Live Server and check data/tvBrandCount.csv.");
    });
}

const drawBarChart = data => {
  if (stage === 4) {
    svg.attr("viewBox", "0 0 700 160");
    svg.append("text").attr("x", 20).attr("y", 60)
      .attr("font-size", 24).text("CSV loaded — view the data in the console.");
    return;
  }
  if (stage === 5) {
    const barHeight = 28;
    const barSpacing = 12;
    svg.selectAll("rect").data(data).join("rect")
      .attr("class", d => `bar count-${d.count}`)
      .attr("x", 0).attr("y", (d, i) => i * (barHeight + barSpacing))
      .attr("width", d => d.count).attr("height", barHeight).attr("fill", "#367558");
    return;
  }
  svg.attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`);
  const margin = {top: 20, right: 65, bottom: 55, left: stage === 7 ? 155 : 15};
  const innerWidth = chartWidth - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count) * 1.05]).nice().range([0, innerWidth]);
  const yScale = d3.scaleBand().domain(data.map(d => d.brand))
    .range([0, innerHeight]).padding(0.25);
  const plot = svg.selectAll("g.plot").data([null]).join("g")
    .attr("class", "plot").attr("transform", `translate(${margin.left},${margin.top})`);
  const barAndLabel = plot.selectAll("g.bar-row").data(data, d => d.brand)
    .join("g").attr("class", "bar-row")
    .attr("transform", d => `translate(0,${yScale(d.brand)})`);
  barAndLabel.selectAll("rect").data(d => [d]).join("rect")
    .attr("class", d => `bar count-${d.count}`)
    .attr("x", 0).attr("y", 0).attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth()).attr("fill", "#367558");
  if (stage === 7) {
    barAndLabel.selectAll("text.brand-label").data(d => [d]).join("text")
      .attr("class", "brand-label").text(d => d.brand)
      .attr("x", -10).attr("y", yScale.bandwidth() / 2)
      .attr("dy", "0.35em").attr("text-anchor", "end").attr("font-size", 13);
    barAndLabel.selectAll("text.count-label").data(d => [d]).join("text")
      .attr("class", "count-label").text(d => d.count)
      .attr("x", d => xScale(d.count) + 8).attr("y", yScale.bandwidth() / 2)
      .attr("dy", "0.35em").attr("font-size", 13);
    svg.selectAll("g.axis").data([null]).join("g").attr("class", "axis")
      .attr("transform", `translate(${margin.left},${margin.top + innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(5));
    svg.selectAll("text.axis-title").data([null]).join("text").attr("class", "axis-title")
      .attr("x", margin.left + innerWidth / 2).attr("y", chartHeight - 8)
      .attr("text-anchor", "middle").attr("font-size", 14).text("Number of TV models");
  }
};
