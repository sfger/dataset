# HTML5 dataset API shim/Pollyfills
[Javascrip HTML5 dataset API][2]: Method of applying and accessing custom data to elements.

Test in IE8+. In theory it support any browser that support [Object.defineProperty][1]

```html
<div id="test" data-test="test" data--Test="TEST" data---*--8--test="test" data---*-test='111' data-*1test1='222' data-list-*-Test="list-test"></div>
```

```Javascript
var test = document.querySelector('#test');
console.log(test.dataset);
/* output:
*1test1 : "222"
--*--8-Test : "test"
--*Test : "111"
Test : "TEST"
list-*Test : "list-test"
test : "test"
*/
console.log(test.dataset.test);
console.log(test.dataset.Test);
console.log(test.dataset.Test);
console.log(test.dataset['--*--8-Test'])
```

## Known issues
* In the upper example: ie8 access test.dataset does not show the dataset object as normally, but test.dataset.test or any other access works fine!

[1]: http://caniuse.com/#search=defineProperty
[2]: http://caniuse.com/#search=dataset
