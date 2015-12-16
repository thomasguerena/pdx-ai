'use strict';

const Climber = require('./climber.js'); // Climber class
const terrain = require('./terrain.js'); // terrain singleton
const loop = require('./loop.js');       // helper "loop" function

// -- Adjustable Parameters -- //

const ANIM_SPEED = 1000; // animation delay in ms
const POPULATION_SIZE = 10; // number of climbers in population
const TERRAIN_SIZE = 50; // number of bars in the terrain chart

terrain.build(TERRAIN_SIZE);


// -- Declare and Initialize Variables -- //

const climbers = []; // population to evolve
// ...

// Generate initial population...
for (let i = 0; i < POPULATION_SIZE; ++i) {
	climbers.push(new Climber());
}

// Evolution loop
loop(function () {

	// Here is where you write your "evolution" loop.
	// Your loop should include the following:
	//   - Evaluation  (calculate fitness of each climber)
	//   - Selection   (decide which climbers should mate)
	//   - Culling     (not mating? not surviving...)
	//   - Crossover   (couples generate children, decide DNA)
	//   - Mutation    (decide when and how climbers mutate)

	// ...

	terrain.update(climbers); // update the UI
}, ANIM_SPEED);