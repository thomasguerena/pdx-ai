# Hill Climbers
#### (It's a pun)

This is a do-it-yourself tutorial on simple genetic algorithms. Really, it's just a bit of boiler plate code and some links to help you build a simple GA to solve the classic "hill climbing" problem. It was written by Thomas Guerena. Contact him if you have issues.
## Genetic Algorithms
There's a great MIT Lecture on Genetic Algorithms [here](https://www.youtube.com/watch?v=kHyNqSnzP8Y). But I'll try my best to summarize.

Genetic Algorithms are a way of solving problems by imitating the biological process of evolution. You start with some population of individuals, determine how fit those individuals are for their environment, mate the N fittest individuals, and then repeat the process.

The 6 elementary stages:
1. Generation
2. Evaluation
3. Selection
4. Culling
5. Cross-over
6. Mutation

I'm going to introduce genetic algorithms, but if you want to dive straight into the code, skip to the __Ready to Code__ section.

##### Generation:
You need some random "seed" population. In this example, that initial population will be "climbers" (now you see the pun). A climber is an object containing a `.position` and `.fitness`.
##### Evaluation:
We need some way of determining the __fitness__ of a climber. This is crucial to all genetic algorithms. Luckily, `.position` is an x-coordinate that correlates to some y-value in our terrain model (a bar graph). Since a climber's goal is to reach the top of the highest mountain, the current altitude of a climber seems like a good gauge of fitness. Obviously, the greater the y-value, the fitter the climber.
##### Selection:
We're here to mate (brown-chicken-brown-cow), but we first need to determine which individuals get coupled. Since we have a fitness value for every individual in our population, it makes sense to sort our population by fitness. Now, we can mate the first two, second two, etc. This is called __Fitness Rank__. This is the simplest selection method. However, it's often advantageous to encourage _diversity_. We can do that by sorting by both _fitness_ and _diversity_. The goal is to couple individuals who are both very fit and very different from each other. This is called __Diversity-Fitness Rank__.
##### Culling:
This step is simple. Since we've chosen __n__ individuals to form couples, we can remove all non-coupled individuals from the population. The thinking is, if they're not fit enough this generation, they shouldn't be fit enough next generation either. Survival of the fittest, and only the fittest. Computationally, they are dead weight. (Don't dive too deep into the philosophical implications. It get's real dark real fast...)
##### Cross-over:
At this point, we have couples ready to mate. Let's just look at one couple, and call its individuals __A__ and __B__. There's an assumption that __A__ and __B__ have some genetic structure representing whatever attributes determine their fitness, and that their genetic structure is identical. In this example, we're calculating fitness using an individual's _position_. Therefore, _position_ should be our attribute, and we can say that our genetic structure is a binary representation of that integer, `.position`. If we noramlize _position_ to (for example) 8-bit binary, then we can say __A__ and __B__ have identitcal genetic structure.

This brings us to __cross-over__. If we have parents __A__ and __B__, then we want their children to have genetic information from both parents. There are two easy ways to do this - __swapping__ and __interleaving__. (Probably not the technical terms)

###### Swapping:
Assume the following.
```
A.position = 17 = 0001 0001
B.position = 40 = 0010 1000
```
Our goal is to produce a child that inherits the first four bits from parent __A__, and the secound four bits from parents __B__. In our example, we can afford to create a second child which inherits the first four bits from __B__, and second four bits from __A__.
```
child1 = 0001 1000 = 24
child2 = 0010 0001 = 33
```
###### Interleaving:
Again, assume the following.
```
A.position = 85  = 0101 0101
B.position = 170 = 1010 1010
```
Rather than splitting genetic information in two and inheriting half from each parent, we'll alternate parents bit-by-bit. For example, the first child may take the first bit from __A__, second bit from __B__, third bit from __A__, and so on. The second child would begin with __B__, and perform the same process.
```
child1 = 0000 0000 = 0
child2 = 1111 1111 = 255
```
Phew! Almost there.
##### Mutation:
Mutation is a subtle but extremely important part of genetic algorithms. Knowing when, where, and how to mutate individuals is completely problem dependent. For this reason, it's said that GAs are as much art as they are science. At the highest level, mutation is a _random_ alteration to an individual's genome.

For example:
```
indiv.position = 0010 0110
...mutation occurs...
indiv.position = 0010 0111 // last bit was flipped!
```
How much to mutate, which individuals to mutate, and how often to mutate will greatly determine how quickly your algorithm arrives at optimal (or optimal-enough) solutions. If you're having difficulty converging on a solution (your population is either not diverse enough or has chaotic diversity), check out [simulated annealing](http://www.theprojectspot.com/tutorial-post/simulated-annealing-algorithm-for-beginners/6).

_tldr version_ - Begin evolution with very high mutation rate, then reduce mutation rate over time.
##### Repeat:
Steps two through six are repeated until you decide you're finished evolving. In our example, there is no evolution terminator. The program just runs until you kill it.

## Ready to Code
The only file you need to edit (hopefully) is `app/js/main.js`. This code is written in ES6 NodeJS inside an [Electron](http://electron.atom.io/) (formally Atom Shell) application. This means you're within a hybrid context of Node and the browser. If you're a beginner and none of this makes sense to you, just know you're programming in Javascript.
##### Installation:
You'll need a modern version of NodeJS. Install the lastest version [here](https://nodejs.org/en/).

Once that 's finished...
```
$ node -v
# If the above doesn't report a version number, your NodeJS isn't installed properly.
$ cd .../pdx-ai/examples/simple-ga
$ npm install
$ cd app
$ npm install -g bower  # If you don't already have bower installed...
$ bower install
```
Once installed, you can launch the app with `npm start`.

In order for your changes to take effect, you will either need to kill the app `ctrl-c` and launch it again, or type `location.reload()` into the developer tools console (inside the app). This console can be opened via `ctrl-shift-i` on Linux or Windows and `command-shift-i` on Mac. I recommend detaching the console from your Window to keep the application UI readable.

You will find further instructions in the `app/js/main.js` file. Good luck!

If you get stuck and have any questions or comments, direct them to the author, Thomas Guerena. You can post in the issues on [Github](https://github.com/thomasguerena/pdx-ai), or on our [Meetup](http://www.meetup.com/PDX-Artificial-Intelligence/) page (if you're a member of PDX AI).