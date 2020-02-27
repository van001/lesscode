/**
 * How to check if two Strings are anagrams of each other
 * Army is anagram of Mary
 * 
 * 1. Sort the 2 arrays.
 * 2. convert to string and compare if they are equal. Return the value.
**/
const {test, $, toList, toString, sort, blank, eq} = require('../lib/fp')

const  sortStr = $(toString,sort,toList)
const isAnagram = str1 => str2 => eq (sortStr(str1))(sortStr(str2))

const data =[
    [['army','mary'],true],
    [['one','two'],false]
]

test(isAnagram)(data)
