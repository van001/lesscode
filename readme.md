
# Inspiration
![Lego Kids](lego-kid.jpeg) Inspired by the work of [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church)(Lambda Calculus) & John Backus's paper '[Can programming be liberated...](https://github.com/van001/lesscode/blob/master/can-programming-be-liberated.pdf)', this is my first attempt to define a functional library/construct that could be implemented in any programming language that supports functional programming and can be applied to solve complex problems in variety of industry/ domain. 

> Lost in translation is real.

# Philosophy
> Universe is either expanding or contracting - Albert Eienstien.

In grand schemes of things entire universe can be described in terms of few abstractions. We call them law of nature. Programming is no exception. While imperative thinking allows each individual to be an individual, it may confuse others if they are not used to their way of thinking :). Functional thinking abstracts the complexity (function) and opinion(implementation) & provide us a generic way to  communicate and work together. None-the-less we need both, individualism as well as ability to work/exist as a group.

> What if I ask you to reverse words in a sentence like 'my name is neelesh' -> 'neelesh is name my'

and you think
```
Sentence is a String of words (String) separated by a whitespace, so
1. I can reverse the entire String so it becomes : 'hseleen si eman ym'
2. Then I can break this one String into List of Strings : [ 'hseleen', 'si', 'eman', 'ym' ]
3. Now I can just reverse all those Strings in the List : [ 'neelesh', 'is', 'name', 'my' ]
4. And finally join the List of Strings to form one String : neelesh is name my

or programatically :
const sreverseSentence = $(l2String2(space), lapply2(sreverse), s2List2(space), sreverse)
```
> Or if I ask you to find intersection of 2 Lists of Strings : ['dog','cat','horse','mouse'] ⨅ ['dog','cat','bird'] = ['dog','cat']
```
And you say , 
1. If either of the list is empty, return empty list : []
2. Convert one list to map (to save space convert smaller list to map) : {'dog':1,'cat':1,'bird':1}
3. Return all the items form the 2nd list which are found in the Map : [dog','cat']

or programatically : 
const lintersection2 = lst1 => lst2 => leqEmpty(lst1) || leqEmpty(lst2) ? [] : $(minList2(lst2), l2Map)(lst1)

```
**$ is way to compose functions.**

Even-though it is started by an individual 'I', it cannot be functional unless it's adopted by 'You/We'. Please feel free to join hands with me with your feedbacks, suggestions or whatever way you feel like connecting/ contributing.
# Goal
> Eating your own dog food.

Initial goal is to influence programmers, including myself to start thinking in terms of functional programming and start constructing programs using pure functions(no side-effect) and function composition (lego blocks) using fewer data-structures and tools(functions).

# Approach
I will try to solve [common algorithm and interview questions](https://github.com/van001/lesscode/tree/master/nodejs/excercise) using FP and see if it's possible to stick to the [design principles outlined below](https://github.com/van001/lesscode/blob/master/readme.md#Design). I will use javscript for the initial implementation but the goal is to come up with a functional construct that is language independent and can be implemented in any language that supports functional programming.

I will also solve real-world programming problems like making Http calls, Fetching data from database etc and that is when I will introduce parallel composition techniques.

I will not impelement any number or mathemetical functions but reuse it form the stardard libraries provided by the language itself.

# Design
> I like to [KISS](https://en.wikipedia.org/wiki/KISS_principle) ;)

The goal of any functional programming language is to have pure functions (function without any side effect), fewer constructs (lego blocks or moving parts) to deal with & ways to compose those functions to do complex things (glue/ attach).

## 1. Fewer objects and categories
I will start with frequently used objects and categories that are used in real-world to solve many complex business problems. 

Single object will belong to String category and bunch of objects will belong to either List or Map. 

#### String (single object)
![String](string.png)
String may conatin bunch of characters. e.g, 
```
'Neelesh Vaikhary'
```

#### List (container - multiple objects; serially accessible) 
![List](list.png)

List may contain list of Strings or List itself.
```
['My','Name','is','Neelesh Vaikhary']
```

#### Map (dictionary - multiple objects; randomly accessible via key)
![Map](map.jpeg)

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
Most programming language provide the implementation of the above categories, so we may not have to implement but just use them.
In future I may use this base object and categories to build complex categories like Heap, Tree & Graph.

## 2. Pure Functions 
For each of the above categories(String, List & Map), I will build functions to consume & transform (similar or other) categories.

#### Function naming

Name makes a huge difference. Just looking at the function name we should be able to tell on what category it applies, what it does and what is the arity. 
I suggest we name functions as 
```
[l|s|m][operation][arity] 

e.g. 
const lhead = l => l[0] // function to retrieve head of the List
```
> Where [l|s|m] denote category - String, List or Map; operation - what function is suppose to do; arity - how many parameters it takes. 2 or 3 denotes 2 or 3 parameters 'A' denotes arbitrary. 

By default last parameter of a function acts on the object from the same category on which it is defined.
```
const sreplace3 = pattern => replaceWith => str =>  str.replace(pattern,replaceWith) 
```

#### Single input functions
Most of the functions will have only one input and one output. Both input and/or output can be functions.
```
const lhead = l => l[0]
```
> 'l' denotes a List function, head tells about the operation. A single input function defined for a given category will always act on the same category object - List, String or Map

#### Multiple input functions
###### Currying
I will use [Currying](https://en.wikipedia.org/wiki/Currying) to define functions with more than one parameter and upto 3 parameters, after which function will have arbitrary paramaters. If a function takes more than one parameter we post-fix the name with no. of parameters (up to 3). 
```
const sreplace3 = pattern => replaceWith => str =>  str.replace(pattern,replaceWith) 
```
> 's' denotes a String function, replace tells us about the operation, 3 tells that function takes 3 parameters. 

Currying also helps us to partially apply a function so that we can use it over
```
const sreplace3 = pattern => replaceWith => str =>  str.replace(pattern,replaceWith) 

const replaceNYCWithJKF = sreplace3(/JFK/)('NYC')
```
> You can use replaceNYCWithJKF over and over to replace 'NYC' with 'JFK' for multiple strings. Just make sure that the last paramter should be the object on which the function would apply.

#### Category conversion functions
Conversion functions will morph object from one category to another. I should come up with a clear naming convention to identify such functions.
```
const l2Map = lst => lst.reduce((acc, val) => { 
        (acc[val]) ? acc[val] += 1 : acc[val] = 1; return acc 
    }, {})

const space = ' '
const l2String = lst => lst.join(space)
```
> l2Map - converts List to Map; l2String - converts List to String

#### Point free style
I will write functions in [point free style](https://en.wikipedia.org/wiki/Tacit_programming), as much as possible. 
```
const space = ' '
const l2String = lst => lst.join(space)
```
> l2String is declared in Point free style 




## 3. Function composition
> Whole is greater than the sum of parts.

A single function is limited, but combined can accomplish major task. I will define clear composition strategy to combine functions from similar or different categories, or the functions that transform categories (String to List, List to Map etc).


> I will define composition function as '$'. It will be of arbitrary arity, so won't use currying. Also since it's a one of kind, we will not say $A (used lated for special case), but simple $. Eventaully I will define parallel composition using $$, $$$, $$$$ or $A, to allow upto 3 parallel composition or parallel composition of any arity ($A).

#### Structure preserving functions
By default all the functions that preserve the structure are composable within that category.
```
```

#### Non-structure preserving functions
After applying non-structure preserving function you can keep composing with structure preserving functions of the transformed category.
```
const { $,  l2String2, lapply2, space, s2List2, sreverse} = require('../lib/lc-core')

/** 
reverse words in a sentence :: 'my name is neelesh' -> 'neelesh is name my'
1. reverse the string
2. split string into list of strings
3. Apply reverse operation to all items in the list
4. Convert List back to String
**/

const reverseSentence = $(l2String2(space), lapply2(sreverse), s2List2(space), sreverse)

console.log(reverseSentence('my name is neelesh'))
```
> After s2List2 (String to List transformation), one could only compose with List functions - lapply2, l2String2 etc.

$ is a composition function. Enabling print with $p, we get

```
hseleen si eman ym // sreverse
[ 'hseleen', 'si', 'eman', 'ym' ] // s2List2(space)
[ 'neelesh', 'is', 'name', 'my' ] // lapply2(sreverse)
neelesh is name my // l2String2(space)
```

# Application
> Even though we are all individuals, we still have a herd mentality.

1. [Common algorithm and interview questions](https://github.com/van001/lesscode/tree/master/nodejs/excercise)



