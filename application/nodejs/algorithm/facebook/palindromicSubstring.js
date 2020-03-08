
const print = val => { console.log(val); return val } //print
const trace = label => val => { print(label); print(val); print(' '); return val } // trace with label
const $ = (...func) => (...args) => func.reduceRight((args, func) => [func(...args)], args)[0] // composition function
const $P = (...f) => (...args) => f.map(fn => fn(...args))// Executes the functions in parallel and return the reuslt as List

/** String **/
// Constants
const space = ' '
const blank = ''

// Category Changers
const s2List = ptrn => str => str.split(ptrn)


// List
const lprepend = lst1 => lst2 => lst2.concat(lst1) // prepend lst2 to lst1
const lappend = lst1 => lst2 => lst1.concat(lst2) // append lst2 to lst1
const lreverse = lst => lst.reduce((acc, val) => lappend([val])(acc), [])
const l2String = sep => lst => lst.reduce((acc, val) => '' + acc + sep + val)

const lallSubset2 = lst => lst.reduce((lst, val) => (lst.map(lprepend([val]))), [[]])

const lallSubstring = str => s2List(blank)(str)

//
const isPalindrome = str => $(l2String(blank), lreverse, s2List(blank))(str) === str


print($(isPalindrome)('aaa'))
print(lallSubstring('abc'))

public class Solution {
    int count = 0;
    
    public int countSubstrings(String s) {
        if (s == null || s.length() == 0) return 0;
        
        for (int i = 0; i < s.length(); i++) { // i is the mid point
            extendPalindrome(s, i, i); // odd length;
            extendPalindrome(s, i, i + 1); // even length
        }
        
        return count;
    }
    
    private void extendPalindrome(String s, int left, int right) {
        while (left >=0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            count++; left--; right++;
        }
    }
}

class Solution {
    public int countSubstrings(String S) {
        int N = S.length(), ans = 0;
        for (int center = 0; center <= 2*N-1; ++center) {
            int left = center / 2;
            int right = left + center % 2;
            while (left >= 0 && right < N && S.charAt(left) == S.charAt(right)) {
                ans++;
                left--;
                right++;
            }
        }
        return ans;
    }
}

Comments: 33