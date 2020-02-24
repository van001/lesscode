# Inspiration
Inspired by the work of [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church)(Lambda Calculus) & John Backus's paper '[Can programming be liberated...](https://github.com/van001/lesscode/blob/master/can-programming-be-liberated.pdf)', this is my first attempt to define a functional library/construct that could be implemented in any programming language that supports functional programming and can be applied to solve complex problems in variety of industry/ domain. 

# Philosophy
In grand schemes of things entire universe can be described in terms of few abstractions. We call them law of nature. Programming is no exception. While imperative thinking allows each individual to be an individual, it may confuse others if they are not used to their way of thinking :). Functional thinking abstracts the complexity and provide us a generic way to  communicate and work together. None the less we need both, individualism as well as ability to work/exist as a group.

Even-though it's started by an individual 'I', it cannot be functional unless it's adaopted by 'You/We'. Please feel free to join hands with me with your feedbacks, suggestions or whatever way you feel like connecting/ contributing.

# Approach
Initial goal is to influence programmers, including myself to start thinking in terms of functional programming and start constructing programs using pure functions(as much as) and function composition (lego blocks) using fewer data-structures and tools(functions) to solve variety of complex problems.

I will try to solve [common algorithm and interview questions](https://github.com/van001/lesscode/tree/master/nodejs/excercise) using FP and see if it's possible to stick to the [design principles outlined below](https://github.com/van001/lesscode/blob/master/readme.md#Design). I will use javscript for the initial implementation but the goal is to come up with a functional construct that is language independent and can be implemented in any language that supports functional programming.

# Design
The goal of any functional programming language is to have pure functions (function without any side effect), fewer constructs (lego blocks or moving parts) to deal with & ways to compose those functions to do complex things (glue/ attach).

## 1. Fewer objects/ structures
I will start with frequently used objects and data-structures (categories) that are used in real world to solve many complex business problems.

#### Strings (single object)

#### List (container - multiple objects) 

#### Maps (dictionary - multiple objects; key-value store )


## 2. Pure Functions 
I will build functions around those data-structures to help us consume and manipulate them. 

#### Single input/Output
By default every function will have one input and one output. Both input and/or output can be functions.

#### Currying
Currying to define functions with more than one parameter and upto 3 parameters, after which function will have arbitrary paramaters. If a function takes more than one parameter we post-fix the name with no of parameters (up to 3). 

#### Conversion
Conversion functions to morph object from one category to another.


## 3. Function composition
We will define clear composition techniques to combines functions that operate on different data-structures. 
