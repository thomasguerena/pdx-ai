'use strict';

const $ = require('../bower_components/jquery/dist/jquery.min.js');
const Chart = require('../bower_components/Chart.js/Chart.min.js');

// Resize chart to fit window.
Chart.defaults.global.responsive = true;


class Terrain {

	/**
	 * @param {DOM El} canvas: An HTML Canvas element.
	 * @param {int} variation: The number of peaks and troughs in
	 *   the terrain.
	*/
	constructor(canvas, variation) {

		this.canvas = canvas;

		if (typeof variation !== 'undefined') {
			this.build(variation);
		}
	}

	/**
	 * @param {int} size: The number of bars in the the chart
	 *   representing the terrain. This roughly depicts the
	 *   number of peaks and troughs.
	*/
	build (size) {
		this.data = this.generateData(size);
		this.chart = new Chart(this.canvas.getContext('2d'))
			.Bar(this.data, {
				scaleOverride: true,
				scaleStartValue: 0,
				scaleStepWidth: 10,
				scaleSteps: 10
		});
	}

	/**
	 * @description: Generates a dataset for Chart.js to render.
	 * @param {int} variation: The number of peaks and troughs in
	 *   the terrain.
	 * @returns {Object} data: Valid data object for Chart.js line
	 *   charts. See Chart.js documentation for details.
	*/
	generateData(variation) {
		const data = {
		    labels: [],
		    datasets: [{
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: []
	        }]
		};

		for (let i = 0; i < variation; ++i) {
			data.labels.push('');
			data.datasets[0].data.push(Math.random() * 100);
		}

		return data;
	}

	/**
	 * @param {int} x: An x-coordinate value.
	 * @returns {int} height at position "x".
	*/
	heightAt(x) {
		let data = this.data.datasets[0].data;
		return x < data.length ? data[x] : 0;
	}

	/**
	 * @description: GETTER for number of data points in
	 *   the graph, which is effectively the width (or
	 *   size), of the terrain.
	*/
	get size() {
		return this.data.labels.length;
	}

	/**
	 * @description: Update the terrain to display the position
	 *   of the climbers.
	 * @param {Array of Climber} climbers: The current population.
	*/
	update (climbers) {
		const positions = {};
		const bars = this.chart.datasets[0].bars;

		climbers.forEach((climber) => {
			let pos = climber.position;
			if (typeof positions[pos] === 'undefined') {
				positions[pos] = 1;
			} else {
				positions[pos] += 1;
			}
		});

		for (let i = 0; i < terrain.size; ++i) {
			if (typeof positions[i + ''] !== 'undefined') {
				this.chart.scale.xLabels[i] = positions[i + ''];
				bars[i].fillColor = '#F00';
			} else {
				this.chart.scale.xLabels[i] = '';
				bars[i].fillColor = 'rgba(220,220,220,0.2)';
			}
			bars[i].save();
		}
		this.chart.update();
	}
}

const terrain = new Terrain($('#chart')[0]);
module.exports = terrain;