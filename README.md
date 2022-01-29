# Bus Mall

Bus Mall is a prestigious product catalog, found in your local public transportation vehicles. This site is a market research tool for understanding the wants of Bus Mall readers.

## Author: Jeffrey Jenkins

## Links and Resources

- Used [Meyerweb.com's Reset CSS](http://meyerweb.com/eric/tools/css/reset/) file.
- Used [Chart.JS](https://www.chartjs.org/docs/latest/) library.
- Used [Google Fonts](https://fonts.google.com/) for the H1 font.
- Referred to this [CSS Border Radius Tutorial](https://www.tutorialbrain.com/css_tutorial/css_border_radius/) to make the header border.
- Used [Public Domain Vectors](https://publicdomainvectors.org/en/free-clipart/Blue-triangles/85996.html) for the header background image.

## Reflections and Comments

### Lab 11

- I did not hit any major roadblocks with this assignment. That said it was still a lot of coding and, as per usual, more CSS fiddling than I would care to admit.
- The favorite part of my code is how I use array methods to both prevent the same image from rendering twice in one set AND preventing the same image set from being displayed twice in a row.

### Lab 12

- After trying to rework my existing logic for avoiding picture re-use, I decided to refactor my algorithm to use a persistent array of indices and generate random numbers which did not match it.
- While I was at it, I added an image element "constructor" method to my product objects, which now handles adding product images to the page.
- Finally, I've enclosed my new image chooser algorithm in a for loop controlled by a global "product quantity" variable, so it can display n-quantity of products.
- The results are now displayed in a horizontal bar chart which is an improvement over the list display.

### Lab 13

- Thanks to my commitment to working with arrays in previous labs, working with JSON storage was easy. I even put in a button to clear the user's storage and conditional logic to handle a new user visiting the site.

### Lab 15b

- After learning about yet more CSS in yesterday's readings, I was able to make a webpage which honestly looks kinda snazzy. The "click-able" elements respond when you mouse over them. The responsive CSS, the header graphic, and the chart keep the page from being excessively plain. I'm very happy with it.
- I think my CSS here is a great foundation for an actual website. It'd be a great design if it was combined with more features and content to fill the white-space.
