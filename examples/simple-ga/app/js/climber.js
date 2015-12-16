'use strict';

const terrain = require('./terrain.js');


class Climber {
	/**
	 * @param {int} x: The initial position of the climber, in
	 *   regards to the terrain.
	*/
	constructor(x) {
		let bound = terrain.size;
		if (typeof x !== 'number') {
			x = Math.floor(Math.random() * bound);
		} else if (x >= bound || x < 0) {
			throw new Error('Climber out of bounds!');
		}
		this.position = x;
		this.fitness = -1;
	}

	/**
	 * @description: GETTER for the current fitness of a climber.
	 *   This was added to allow for error handling.
	*/
	get fitness() {
		if (this.fitness < 0) {
			throw new Error('Reading uncalculated climber fitness!');
		}
		return this.fitness;
	}

	set fitness(f) {} // Required setter
}

module.exports = Climber;