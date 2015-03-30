# Boston Licensing Explorer

The City of Boston and its [Department of Innovation and Technology](http://www.cityofboston.gov/DoIT/) are sponsoring a [public hackathon](http://hubhacks2.challengepost.com/) to develop data visualizations from the City's [open data portal](https://data.cityofboston.gov/).

This site represents our submission to the hackathon. You can view it live at http://labs.atsid.com/boston-licensing-explorer/.

The Licensing Explorer is a tool to view existing food, entertainment, and liquor licenses for the City of Boston within the context of other map layers such as median income and population density. We thought this would be an interesting tool for both citizens and City planners to use. Citizens may be interested in finding relatively underserved regions as a way of identifying optimal locations to start a new business. City planners may be interested in finding these same regions as targets for strategic economic development efforts.

## What can you do with it?

* Overlay City of Boston data points for food establishments, liquor licenses, and entertainment licenses. These points can also be viewed as a heatmap.
* View basic census tract data for the tracts in the City of Boston and bordering counties. This data includes median household income, population, land area, and a calculation of population density.
* View geoprocessed data that combines the census tracts and license points:
 * Number of licenses per census tract.
 * Calculations for persons per license, as an indicator of under-served regions.

## What's next?

* We'd like to create a weighted average 'score' for each tract, by combining the income, density, and license calculations. This would ideally be user-editable, so potential business owners or City planners could run scenarios that optimized the display for different local conditions and pinpoint the best places to put a new business.
* The spatial joining was done directly using the census tract data. Applying a buffer around each tract before computing the join could produce a more useful measurement, by accounting for establishments that occur on the tract borders and should therefore be counted more than once.

## Data sets
* From the [Boston Open Data Portal](https://data.cityofboston.gov/)
  * [Active Food Licenses](https://data.cityofboston.gov/Permitting/Active-Food-Establishment-Licenses/gb6y-34cq)
  * [Entertainment Licenses](https://data.cityofboston.gov/Permitting/Entertainment-Licenses/qq8y-k3gp)
  * [Liquor Licenses](https://data.cityofboston.gov/dataset/Liquor-Licenses/hda6-fnsh)
* From the [US Census](http://www.census.gov/)
  * [Census Tracts](http://www.census.gov/geo/maps-data/data/kml/kml_tracts.html) for Massachusetts (pre-culled to those counties surrounding Boston).
  * Census Tract income and population data via the [Census API](http://api.census.gov/data/2013/acs5). We load this data live from the Census API and merge it with the tract polygons using the tract GEOID.

## Tools and technologies used

* [ArcGIS](http://www.arcgis.com/features/) - ArcGIS was used for initial data exploration and prototyping of the map layers. A trial license supplied by Esri for the Hubhacks event was used.
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) - the site uses Google Maps as the baseline mapping component.
* [GitHub Pages](https://pages.github.com/) - we hosted our site using a `gh-pages` branch within the GitHub repository for easy, free hosting.
* [node.js](https://nodejs.org/) - we did some data prep using node.js tools, and used it for our build system.
  * [togeojson](https://github.com/mapbox/togeojson) - GeoJSON is a geospatial JSON format, with robust support within Google Maps. We used the togeojson library to convert the US Census KML boundaries and the Boston licenses CSV files to GeoJSON for loading into Google Maps.
  * [geolib](https://github.com/manuelbieh/Geolib) - we used geolib to write a spatial join script that summarized point locations within polygons in our GeoJSON files.
  * [grunt](http://gruntjs.com/) - grunt is a JavaScript build system for node.js. We used it for code quality (linting) and testing (with karma+mocha).

## Development instructions

Because the app is entirely client-side, you don't really need to do anything special. Any web server that can host the project folder will do, but we've setup a development server with node + grunt so it's easy to work on.

First, make sure you have node.js installed from the [node.js website](https://nodejs.org/download/).

Then, install the project development dependencies and get the grunt command line:

    npm install
    npm install -g grunt-cli

Start the local node server to get everything up and running:

    grunt server

Now you can navigate to `localhost:9001` to see the app. Note that `grunt server` also starts a file watcher that will run jshint and karma whenever a file is saved.

If you want to publish the site to your `gh-pages` branch so it is publicly hosted, use:

    grunt publish

## Additional Notes

### Census Data

This product uses the Census Bureau Data API but is not endorsed or certified by the Census Bureau.

### Color Gradients

Graduated color palettes for the census tract symbology were obtained from COLOURlovers.com. All are Creative Commons [CC-BY-NC-SA](http://creativecommons.org/licenses/by-nc-sa/3.0/) licensed.

* [echo](http://www.colourlovers.com/palette/84571/echo) by [delphian](http://www.colourlovers.com/lover/delphian/loveNote)
* [another pearl](http://www.colourlovers.com/palette/114453/another_pearl) by [velveteen](http://www.colourlovers.com/lover/velveteen/loveNote).
* [peach belle](http://www.colourlovers.com/palette/16580/%3C3_peachbelle) by [Anitra](http://www.colourlovers.com/lover/Anitra/loveNote)
* [a cold day](http://www.colourlovers.com/palette/24741/a_cold_day) by [stinger](http://www.colourlovers.com/lover/stinger/loveNote)

Data bins were obtained by first running a [Jenks natural breaks](http://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization)
categorization on the layer data, and then rounding boundary numbers to more easily-readable values.
