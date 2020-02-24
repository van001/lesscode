# Inspiration
Inspired by the work of [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church)(Lambda Calculus) & John Backus's paper '[Can programming be liberated...](https://github.com/van001/lesscode/blob/master/can-programming-be-liberated.pdf)', this is my first attempt to define a functional library/construct that could be implemented in any programming language that supports functional programming and can be applied to solve complex problems in variety of industry/ domain. 

# Philosophy
In grand schemes of things entire universe can be described in terms of few abstractions. We call them law of nature. Programming is no exception. While imperative thinking allows each individual to be an individual, it may confuse others if they are not used to their way of thinking :). Functional thinking abstracts the complexity and opinion & provide us a generic way to  communicate and work together. None-the-less we need both, individualism as well as ability to work/exist as a group.

Even-though it is started by an individual 'I', it cannot be functional unless it's adopted by 'You/We'. Please feel free to join hands with me with your feedbacks, suggestions or whatever way you feel like connecting/ contributing.

# Approach
Initial goal is to influence programmers, including myself to start thinking in terms of functional programming and start constructing programs using pure functions(no side-effect) and function composition (lego blocks) using fewer data-structures and tools(functions).

I will try to solve [common algorithm and interview questions](https://github.com/van001/lesscode/tree/master/nodejs/excercise) using FP and see if it's possible to stick to the [design principles outlined below](https://github.com/van001/lesscode/blob/master/readme.md#Design). I will use javscript for the initial implementation but the goal is to come up with a functional construct that is language independent and can be implemented in any language that supports functional programming.

I will not be impelementing any number or mathemetical functions but reuse it form the stardard libraries provided by the language itself.

# Design
The goal of any functional programming language is to have pure functions (function without any side effect), fewer constructs (lego blocks or moving parts) to deal with & ways to compose those functions to do complex things (glue/ attach).

## 1. Fewer objects/ structures
I will start with frequently used objects and data-structures (categories) that are used in real world to solve many complex business problems. Simple object will be String and Container objects will be List and Map.

#### String (single object)
String may conatin bunch of characters. e.g, 
```
'Neelesh Vaikhary'
```

#### List (container - multiple objects; serially accessible) 
List may contain list of Strings or List itself.
```
['My','Name','is','Neelesh Vaikhary']
```

#### Map (dictionary - multiple objects; randomly accessible via key)
Map may contain another String, List or a Map, uniquely itendified by a key (String). 
```
{
    'name' : 'Neelesh Vaikhary',
    'address' : {
                    'city': 'San Francisco',
                    'state':'CA'
                },
    'patents' : ['123','456','8910']
}
```

## 2. Pure Functions 
For each of the above categories(String, List & Map), I will build functions to consume & transform (to similar or other) categories. Similar category transformation will preserve the structure - a List will stay List. Other categroy transformation will not preserve the structure - for e.g. when a List is converted to Map or a String

#### Single input/Output
By default every function will have one input and one output. Both input and/or output can be functions.

#### Currying
Currying to define functions with more than one parameter and upto 3 parameters, after which function will have arbitrary paramaters. If a function takes more than one parameter we post-fix the name with no of parameters (up to 3). 

#### Conversion
Conversion functions to morph object from one category to another.


## 3. Function composition
We will define clear composition techniques to combines functions that operate on different categories. 
