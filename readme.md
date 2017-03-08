


# Get started

#### Online

[Online Demo hosted on Codepen of commit `50716ba`](https://codepen.io/airbridge/pen/mWrYxv)

#### Local

1. Clone the repository `git clone https://github.com/airbr/ngchip-dialog-search.git`
2. Open `index.html`

	_TODO:_ Add instructions for local installation of dependencies. Currently using CDN's for the following dependencies:
	
	CSS:
	
	* Angular Material 1.1.3
	* Google Fonts Roboto

	
	JS:
	
	* AngularJS 1.6.2
	* Angular Route 1.6.2
	* Angular Animate 1.6.2
	* Angular Aria 1.6.2
	* Angular Messages 1.6.2
	* [SVG Assets Cache](https://github.com/angular/material/blob/master/docs/guides/CODEPEN.md)
	* Angular Material 1.1.3

### Suggestions for testing:

1. Change out JSON Array - either change the name of chips from `thing` to match your array properties or to adjust your array items proprties to `thing` to be visible on the chip label/ avoid errors.
2. Try putting a reasonably big JSON array in there. The Dialog should still load quickly and the suggestions/chips you see should still perform quickly.
3. Try throwing at the search input / selection of chips all the possibilities you could think of including:
	* Auto-completion if you type out the suggestion in full
	* Seeing selected/non-selected chips filtered below as you type
	* Selected/de-selecting chips
	* The view of selected of chips at rest i.e. no input in the search text
4. Look at the 'dev console' button to seen an example of the kind of array could comes out of the choices you submitted for practical use/interaction with the back-end.


### Summary

> An AngularJS/Angular Material project aiming to combine the ngMaterial directives [`md-dialog`](https://material.angularjs.org/latest/api/directive/mdDialog), [`md-chips`](https://material.angularjs.org/latest/api/directive/mdChips) and [`md-autocomplete`](https://material.angularjs.org/latest/api/directive/mdAutocomplete) to create a reasonably re-usable and performant UI module with the ability to:
> 
  * Open a `md-dialog` that contains the following interface in its own scope:
  * The ability to input text to search over a JSON Array and present autocomplete suggestions, simultaneously filter visible `md-chips` in the view based on the same searchtext
  * Represent those array items as `md-chips` in the view with a simple label but also retain their association to the full JSON from the `ng-model` when those chips are selected. Also gives the ability to search/filter based on those non-visible JSON properties in the view, i.e. a 'soft' or 'fuzzy' search.
  * Select and add these `md-chips` to an array for submission either by selecting them onscreen or entering them from the input i.e. for a form as part of a potential sign-up process or other user interaction.
  	* Also ability to remove these chips by de-selecting them visually
  * Necessary CSS/Angular Logic applied to depict chips that have been selected/ avoid duplicates etc including:
   * Style selected chips with ng-class, requiring targeting a class from a grandparent selector since you cannot apply styles directly on md-chip-template
   * Show chips with these applied selected styles as they are being filtered in the search
  * Close the `md-dialog` and submit the choices you have made that are saved in a variable in a flexible JSON formay for parsing/calling to an API
  

This project comes out of difficulties experienced with using [Angular Material for Angular 1.x](https://material.angularjs.org/latest/) after being instructed to use a number of particular directives in the workplace. Angular Material directives can be very enticing and desirable based on their initial demonstrations/examples- most people would say that they are 'cool' and I have been instructed by clients to use them in particular ways. AngularJS/ 1.x is also not particularly supported anymore so it is not likely that major fixes/additions are coming anytime.

However as I was having to modify the usage of these directives I found a lot of difficulty and some creativity was required to actually get the directives to work together. The project ended up including a number of css-workarounds and applying a pretty full range of Angular directives such as `ng-filter`, `ng-if`, `ng-show`, `ng-class` and more while keeping attention to their proper usage to avoid it loading slowly/not performing. 

Performance wise when I started I found lots of problems, the dialog loaded slowly with lots of chips in it, the chips loading slowly because they were being loaded from the model, the filter was running slowly... These primarily seemed to be solved by mapping the JSON array to prepare it for filtering and searching via an IIFE in the beginning and then limiting the scope of what was being repeated in the view. I used ng-repeat and filters where I could instead of ng-model and limiting ng-model to the input process only as much as possible.


#### Future development

As at `v0.1` this project is my attempt at paring it down to the bare minimum for something re-usable. Im sure it can be simplified further. This makes it a little more challenging for demonstration purposes, as the current example has a number of issues like the dialog resizing rapidly.
		

