# Functional Thinking
## Inspiration
![Lego Kids](lego-kid.jpeg) Inspired by the work of [Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church)(Lambda Calculus) & John Backus's paper '[Can programming be liberated...](https://github.com/van001/lesscode/blob/master/can-programming-be-liberated.pdf)', this is my first attempt to define a functional library/construct that could be implemented in any programming language that supports functional programming and can be applied to solve complex problems in variety of industry/ domain. 

> Lost in translation is real.

## Philosophy
> Universe is either expanding or contracting - Albert Eienstien.

In the grand scheme of things, the entire universe can be described in terms of few a abstractions. We call them the law of nature. Programming is no exception. While imperative thinking allows each individual to be an individual, it may confuse others if they are not used to "their" way of thinking :). Functional thinking abstracts the complexity (function) and opinion (implementation) & provide us a generic way to  communicate and work together. Nonetheless, we need both,  individualism and the ability to work/exist as a group.

> What if I ask you to reverse words in a sentence like 'my name is neelesh' -> 'neelesh is name my'

and you think
```
Sentence is a just a String of Strings (words) separated by a whitespace, so
1. Reverse the entire String so it becomes       : 'hseleen si eman ym'
2. Transform the String into List of Strings     : [ 'hseleen', 'si', 'eman', 'ym' ]
3. Apply reverse to all the Strings in the List  : [ 'neelesh', 'is', 'name', 'my' ]
4. Transform the List of Strings to String again : neelesh is name my

or programatically :
const sreverseSentence = $(l2String2(space), lmap2(sreverse), s2List2(space), sreverse)
```
[reverse-sentence.js](https://github.com/van001/lesscode/blob/master/application/nodejs/algorithm/string/sreverseSentence.js)

> Or if I ask you to find intersection of 2 Lists of Strings : ['dog','cat','horse','mouse'] ⨅ ['dog','cat','bird'] = ['dog','cat']
```
And you say , 
1. If either of the Lists are empty, return the empty List       : []
2. Transform one of the List to a Map                            : {'dog':1,'cat':1,'bird':1}
3. Transform the Map to List by matching it against another List : [dog','cat']

or programatically : 
const lintersection2 = lst1 => lst2 => leqEmpty(lst1) || leqEmpty(lst2) ? [] : $(m2List2(lst2), l2Map)(lst1)

```
[intersection.js](https://github.com/van001/lesscode/blob/master/application/nodejs/algorithm/list/intersection.js)

** $ is a [composition function](https://github.com/van001/lesscode/blob/master/readme.md#3.) and functions are named with certain [rules](https://github.com/van001/lesscode/blob/master/readme.md#Function-naming).

Even-though it is started by an individual 'I', it cannot be functional unless it's adopted by 'You/We'. Please feel free to send me your your feedbacks, suggestions or whatever way you feel like connecting/ contributing. 
My email is neelesh.vaikhary@gmail.com
## Goal
> Eating your own dog food.

The initial goal is to influence programmers (including myself), to start thinking in terms of functional programming and construct programs using pure functions (no side-effect), function composition (lego blocks), fewer categories/ data-structures and tools (functions). Also I want to find few patterns that could be used to solve any problem using FT (functionla thinking). 

Eventually I want to solve many real-world complex problems and see how practical is it to do clutter-free programming using functional thinking.

> Complex: [Compress a String](https://github.com/van001/lesscode/blob/master/application/nodejs/algorithm/string/scompress.js) | [All subsets](https://github.com/van001/lesscode/blob/master/application/nodejs/algorithm/list/lsubsets.js) | [2 Sum](https://github.com/van001/lesscode/blob/master/application/nodejs/algorithm/list/l2sum2.js)

## Approach
I will try to solve [common algorithm and interview questions](https://github.com/van001/lesscode/tree/master/application/nodejs) using FP and see if it's possible to stick to the [design principles outlined below](https://github.com/van001/lesscode/blob/master/readme.md#Design). I will use javscript for the initial implementation but the goal is to come up with a functional construct that is language independent and can be implemented in any language that supports functional programming.

I will also solve real-world programming problems like making Http calls, Fetching data from database etc and that is when I will introduce parallel composition techniques.

I will not impelement any number or mathemetical functions but reuse it form the stardard libraries provided by the language itself.

## Design
> I like to [KISS](https://en.wikipedia.org/wiki/KISS_principle) ;)

Three basic rules - fewer data-structures (categories), pure functions (function without any side effect),  & function composition (to glue them together). 

### 1. Fewer objects and categories
I will start with frequently used objects and categories that are used in real-world to solve many complex business problems. 

> Single object (like characters or number) will belong to String category and bunch of objects will belong to either List or Map. 

#### String (single object)
![String](string.png)
String may conatin bunch of characters or numbers. e.g, 
```
'Neelesh Vaikhary 123'
```

#### List (container - multiple objects; serially accessible) 
![List](list.png)

List may contain list of Strings or List itself.
```
['My','Name','is','Neelesh Vaikhary']
[[1,2],[3,4],[5,6]]
```

#### Map (dictionary - multiple objects; randomly accessible via key)
![Map](map.jpeg)

Map may contain another String, List or a Map, uniquely identified by a key (String). 
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
Most programming language provide the implementation of the above categories, so I will just re-use them.
In future I may use the above categories to build more complex categories like Heap, Tree & Graph.

### 2. Pure Functions 
> Be a rebel but have few rules in life.

For each of the above categories(String, List & Map), I will build functions to consume, modify & transform (similar or other) categories.

#### Function-naming

> Will the real slim shaddy, please standup, please standup...

Name makes a huge difference. Just looking at the name we should be able to tell :
- What category it's operating (String List or Map) ?
- What transformation it's performing (if any) - 2 (List 2 Map, List to String) or X (any of List, String or Map) ?
- What is it really doing (sort, update, add etc.)?
- Last but not least what's the arity - 1 (default),2,3,4 or A(arbitrary) (number of parameters it need)?

I suggest we name functions as 
```
<l|s|m>[2|X]<operation>[arity] 

e.g. 
suppercase - function to convert String to uppercase String
lXhead  - function to retrieve head of the List
l2Map2 - function to transform List to Map
```
> Where <l|s|m> denote category - String, List or Map; [2|X] denote category transformation; <operation> - what function does; arity - how many parameters it takes. 2 or 3 denotes 2 or 3 parameters 'A' denotes arbitrary. 

By default last parameter of a function acts on the object from the same category on which it is defined.
```
const sreplace3 = pattern => replaceWith => str =>  str.replace(pattern,replaceWith) 
```

#### Single-input 
Most of the functions will have only one input and one output. Both input and/or output can be functions.
```
const lXhead = l => l[0]
```
> 'l' denotes a List function, X for transformation, head tells about the operation. A single input function defined for a given category will always act on the same category object - List, String or Map

#### Multiple-input 
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
#### Category-helpers
Category helper functions transform one category to another preserving the structure. String remains String, List remains List and Map remains Map.

```
// String helper functions :
supperCase - converts String characters to uppercase
scapitalize - converts the 1st character of a String to uppercase
...

//List helper function

//Map helper function
```

#### Category-transformer
Category transformer functions transform one category to another without preserving the structure. String becomes List, List becomes String or Map, Map becomes List or String.

```
String to :


List to :
const l2Map2 = map => lst => lst.reduce((acc, val) => { acc[val]) ? acc[val] += 1 : acc[val] = 1; return acc }, map)
const l2String2= ptrn => lst => lst.join(ptrn)

Map to : 
const m2List2 = lst => map => lst.filter( val => map[val] !=null)
```
> 

#### Point-free-style
I will write functions in [point free style](https://en.wikipedia.org/wiki/Tacit_programming), as much as possible. 
```
const space = ' '
const l2String = lst => lst.join(space)
```
> l2String is declared in Point free style 

### 3. Function composition
![Search](search.png) 
> Whole is greater than sum of parts.

A single function is limited : 

> l2Map2  // converts List to Map. 

Combining them could accomplish some major task :

> const search = key =>  $(mXfind(key), l2Map) // combine 2 functions to create a new function search.

I will define clear composition strategy to combine functions from similar or different categories, or the functions that transform categories (String to List, List to Map etc).

> I will define composition function as '$'. It will be of arbitrary arity, so won't use currying. Also since it's a one of kind, we will not say $A (used lated for special case), but simple $. Eventaully I will define parallel composition using $$, $$$, $$$$ or $A, to allow upto 3 parallel composition or parallel composition of any arity ($A).

#### Structure preserving functions
By default all the functions that preserve structure and category are composable.
```
$(suppercase, sreverse) // reverses the String and converts it to uppercase.
```

#### Non-structure preserving functions
After applying non-structure preserving function you can keep composing with structure preserving functions of the transformed category.
```
const { $,  l2String2, lmap2, space, s2List2, sreverse} = require('../lib/lc-core')

/** 
reverse words in a sentence :: 'my name is neelesh' -> 'neelesh is name my'
1. reverse the string
2. split string into list of strings
3. Apply reverse operation to all items in the list
4. Convert List back to String
**/

const reverseSentence = $p(l2String2(space), lmap2(sreverse), s2List2(space), sreverse)

console.log(reverseSentence('my name is neelesh'))
```
> After s2List2 (String to List transformation), one could only compose with List functions - lmap2, l2String2 etc.

***$ is a composition function. Enabling printing with $p, we get...***

```
hseleen si eman ym // sreverse
[ 'hseleen', 'si', 'eman', 'ym' ] // s2List2(space)
[ 'neelesh', 'is', 'name', 'my' ] // lmap2(sreverse)
neelesh is name my // l2String2(space)
```

[Function Library](https://github.com/van001/lesscode/blob/master/application/nodejs/lc.js)

## Application
> There is a saying in the valley - ideas are dime a dozen. So let's execute & prove it...

1. [Common algorithm and interview questions](https://github.com/van001/lesscode/tree/master/application/nodejs)



