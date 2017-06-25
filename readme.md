


# Get started


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

<!--### Suggestions for testing:

1. Change out JSON Array - either change the name of chips from `thing` to match your array properties or to adjust your array items proprties to `thing` to be visible on the chip label/ avoid errors.
2. Try putting a reasonably big JSON array in there. The Dialog should still load quickly and the suggestions/chips you see should still perform quickly.
3. Try throwing at the search input / selection of chips all the possibilities you could think of including:
	* Auto-completion if you type out the suggestion in full
	* Seeing selected/non-selected chips filtered below as you type
	* Selected/de-selecting chips
	* The view of selected of chips at rest i.e. no input in the search text
4. Look at the 'dev console' button to seen an example of the kind of array could comes out of the choices you submitted for practical use/interaction with the back-end.-->

### Summary / Background

> a piece of angularJS code aiming to combine the ngMaterial directives [`md-dialog`](https://material.angularjs.org/latest/api/directive/mdDialog), [`md-chips`](https://material.angularjs.org/latest/api/directive/mdChips) and [`md-autocomplete`](https://material.angularjs.org/latest/api/directive/mdAutocomplete) to create a reasonably re-usable and performant UI module with the ability to:
> 
  * Open a `md-dialog` that contains the following interface in its own scope:
  * The ability to input text to search over a JSON Array and present autocomplete suggestions, simultaneously filter visible `md-chips` in the view based on the same searchtext
  * Represent those array items as `md-chips` in the view with a simple label but also retain their association to the full JSON from the `ng-model` when those chips are selected. Also gives the ability to search/filter based on those non-visible JSON properties in the view, i.e. a 'soft' or 'fuzzy' search.
  * Select and add these `md-chips` to an array for submission either by selecting them onscreen or entering them from the input i.e. for a form as part of a potential sign-up process or other user interaction.
  	* Also ability to remove these chips by de-selecting them visually
  * Necessary CSS/Angular Logic applied to depict chips that have been selected/ avoid duplicates etc including:
   * Style selected chips with ng-class, requiring targeting a class from a grandparent selector since you cannot apply styles directly on md-chip-template
   * Show chips with these applied selected styles as they are being filtered in the search
  * Close the `md-dialog` and submit the choices you have made that are saved in a variable in JSON for handing off
  
#### Online

[Online Demo hosted on Codepen of commit `04ff4f0` / `v0.2`](https://codepen.io/airbridge/pen/mWrYxv)

![](https://i.imgur.com/OV0Zbwy.gif)