# Boston Licensing Explorer

The [Licensing Explorer](http://labs.atsid.com/boston-licensing-explorer/) is a tool to view existing food, entertainment, and liquor licenses for the City of Boston within the context of other map layers such as median income and popultion density. We thought this would be an interesting tool for both citizens and City planners to use. Citizens may be interested in finding relatively underserved regions as a way of identifying optimal locations for a new business. City planners may be interested in finding these same regions as targets for strategic economic development efforts.

The City of Boston and its [Department of Innovation and Technology](http://www.cityofboston.gov/DoIT/) are sponsoring a [public hackathon](http://hubhacks2.challengepost.com/) to develop data visualizations from the City's [open data portal](https://data.cityofboston.gov/).

This site represents our submission to the hackathon. You can view it live [here](http://labs.atsid.com/boston-licensing-explorer/).

## Data sets
* From the [Boston Open Data Portal](https://data.cityofboston.gov/)
  * [Active Food Licenses](https://data.cityofboston.gov/Permitting/Active-Food-Establishment-Licenses/gb6y-34cq)
  * [Entertainment Licenses](https://data.cityofboston.gov/Permitting/Entertainment-Licenses/qq8y-k3gp)
  * [Liquor Licenses](https://data.cityofboston.gov/dataset/Liquor-Licenses/hda6-fnsh)
* From the [US Census](http://www.census.gov/)
  * [Census Tracts](http://www.census.gov/geo/maps-data/data/kml/kml_tracts.html) for Massachusetts (culled to those counties surrounding Boston)
  * Census Tract income and population data via the [Census API](http://api.census.gov/data/2013/acs5)

## Tools and technologies used

* [ArcGIS](http://www.arcgis.com/features/) - ArcGIS was used for intial data exploration and prototyping of the map layers. A trial license supplied by Esri for the Hubhacks event was used.
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) - the site uses Google Maps as the baseline mapping component.
* [GitHub Pages](https://pages.github.com/) - we hosted our site using a `gh-pages` branch within the GitHub repository for easy, free hosting.
* [node.js](https://nodejs.org/) - we did some data prep using node.js tools, and used it for our build system.
  * [togeojson](https://github.com/mapbox/togeojson) - GeoJSON is a geospatial JSON format, with robust support within Google Maps. We used the togeojson library to convert the US Census KML bounds and the Boston licenses CSV files to GeoJSON for loading into Google Maps.
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

If you want to publish the site to your `gh-pages` branch so it is publicly available, use:

    grunt publish

  
  