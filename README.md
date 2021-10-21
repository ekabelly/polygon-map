## Polygon Map

this app creates a polygon on the map when 3 points are selected.

to run this project, please fill in a bing maps api key in an .env file

for example, run:
`touch .env.local`

and fill it with:

`REACT_APP_BING_MAPS_KEY=YOUR_API_KEY_HERE`

then, to start a development environment, run:

`npm i`
and then
`npm start`

### This Is Just a Sample

this is just a small fraction of what is possible with bing api.
given more time and effort, I would:
1. style the project
2. separate the polyLines and polyGons logic from the map component and create a layer on the map for them.
3. I would replace the map's pin with a svg.
4. I would probably change map component to a functional component.
5. catch errors
6.  and more!
