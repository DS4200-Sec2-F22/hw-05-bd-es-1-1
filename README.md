# hw-05
hw-05 - Binding Data

Link to GitHub Pages: `[insert your clickable hyperlink here]`

Clone this repo and work locally. Be sure to push the final version of your code (and any significant updates along the way) before submitting. To work locally, you will need to set up a Python Simple Server. Instructions for this are included below.  

## Purpose

The purpose of this assignment is to practice creating interactive visualizations with D3.  

## Instructions

1. Resources to support this assignment are provided in the Resources section below.  

1. You can find a reference for what your final webpage should look like in the "reference" folder of your cloned directory. 

1. Create a GitHub Page for your repo and add the link to your GitHub Page above where you see `[insert your clickable hyperlink here]`. 

1. Using the index.html file included in your repo, an *external* stylesheet (no styling should be done inline; it should all be done via external css), and an *external* javascript file (no javascript code should be included in your html file; it should all be done via external js) please do the following: 

   - Make all font on your webpage Arial. 
   - Add a title: "hw-05".
   - Add a centered header: "hw-05: Interactive Graph with D3".
   - Create two columns on your webpage. The left should take up 60% of the page and the right should take up 40%. 
   - In the left column, use D3 to create a scatterplot of the data in the scatter-data.csv file included in this repo. The D3 library is included in the js folder of this repo; be sure to include it in your html file. Your scatterplot should include the following interactive features:
      - If the user hovers over a point, that point should highlight.  
      - If the user clicks on a point, that point should be given a border. 
      - If the user clicks on a point that already has a border, the point's border should disappear. 
   - In the right column of your webpage, allow the user to input coordinates for a new point they want to add to the scatterplot. You may restrict inputs to integers between 1 and 9 so that you do not need to change your scatterplot scale from earlier. You can be creative in how you solicit points from the user, but if you need an idea for how to start, try emulating the reference solution. Once the user submits their coordiantes, add the appropriate point to your scatterplot. This point should have all the same event handling capabilities as your existing points. Note: it is okay if all of your points reset to be un-bordered after the user adds a new point.  
   - In the left column of your page, under the scatterplot, use D3 to create a bar chart of the data in the bar-data.csv file included in this repo. Your bar chart should include the following interactive features:
      - If the user hovers over a bar, that bar should highlight, and a tooltip should appear that tells the user the bar's values. While it is present, the tooltip should overlay the visualization.   
   - Add a centered header to the bottom of your page. The header should say "Acknowledgements" in font smaller than the font used for your first header. Under this header, add a div. Inside of this div add a bulleted list of the resources you used to complete this assignment.  

## Python Simple Server

- In order to read data from csv files, you will need to use a python simple server. To do that, follow these steps:
  - `CD` or open a terminal / command prompt window in the same folder that holds your website code.
  - Start a python simple server with one of these commands (depending on how you set python up on your machine): `python -m http.server`, `python3 -m http.server`, or `py -m http.server`. 
  - After running the command, wait for the output: `Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)`.
  - Open your web browser (Firefox or Chrome) and navigate to the URL: http://localhost:8000. This is where you will see your code rendered. 

## Resources 

* [HTML Page on w3schools](https://www.w3schools.com/html/default.asp). (On the left-hand side of the page there is a menu bar with links to various topics.) 

* [CSS Page on w3schools](https://www.w3schools.com/css/default.asp). (On the left-hand side of the page there is a menu bar with links to various topics.) 

**Note that there are different versions of D3 (we are using version 6), so make sure the tutorials you use are up-to-date (or you at least understand what is different about v6 versus older versions).**

* [Intro to D3 - Creative Coding for the Web](https://www.fluidencodings.com/teaching-materials/cc-for-the-web/v1/page.php?pid=svg)

* [D3 Data Joins - Creative Coding for the Web](https://www.fluidencodings.com/teaching-materials/cc-for-the-web/v1/page.php?pid=data-joins) 

* Intro to D3 in 10 basic examples: https://www.d3-graph-gallery.com/intro_d3js.html (highly recommend this resource)

* D3 Coursera by Enrico Bertini: https://www.coursera.org/learn/information-visualization-programming-d3js

* What is D3? https://d3js.org/

* Example D3 Charts: https://observablehq.com/@d3/gallery

* Interactive Data Visualization for the Web by Scott Murray: Available through Northeastern Library

* Tips and Tricks: https://leanpub.com/D3-Tips-and-Tricks/read (written for v3 but well written)

## Submission

* Be sure to push all changes to your repo and follow all instructions above. 
* Submit your assignment on Gradescope  
