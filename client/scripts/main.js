import d3 from 'd3';
import scatterPlot from './scatter-plot';
import dataProcessor from './scatter-data-processor';
import circleTimeline from './circle-timeline';

const dataLocation = '../data/jetscatter.csv';
const circleDataLocation = '../data/expediaCleaned.csv';

function dataLoaded(error, data) {

    let div = document.getElementById('scatter');
    let rect = div.getBoundingClientRect();
    let viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

	let processedData = dataProcessor(data);
    let jetSpendingScatter = scatterPlot();

    jetSpendingScatter
    	.data(processedData)
    	.title('Spending on jet perquisites by S&P 500 comapanies')
    	.subtitle('$m, 2014')
    	.source('Source: Securities and Exchanges Commission')
    	.circleSize(2)
    	.height(300)
    	.width(rect.width)
        .viewportW(viewportW)
    	.margin({
		    top:50,
		    left:25,
		    bottom:50,
		    right:10
		});

	d3.select('#scatter')
		.call(jetSpendingScatter);
}

function drawCircleTimeline(error, data) {
	const circleData = data;
	const drawCTL = circleTimeline();
	const div = document.getElementById('circleTimeline');
	const rect = div.getBoundingClientRect();


	drawCTL
		.data(circleData)
		.title('Spending on jet perquisites by S&P 500 comapanies')
		.subtitle('$m, 2014')
		.source('Source: Securities and Exchanges Commission')
		.maxCircle(30)
		.height(500)
		.width(rect.width)
		.margin({
			top: 50,
			left: 0,
			bottom: 50,
			right: 30
		});

	d3.select('#circleTimeline')
		.call(drawCTL);
}

d3.csv(dataLocation, dataLoaded);
d3.csv(circleDataLocation, drawCircleTimeline);
