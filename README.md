# Campus Map
Finding the shortest path between two buidings in the University of Washington Seattle Campus using Dijkstra's Algorithm

## Path Finder Java Program
Link to documentation [here](https://github.com/bellaroseee/SDI-hw-pathfinder/tree/master)
  
### Data Structure
| Program Files | |
| --- | --- |
|[Path](https://github.com/bellaroseee/SDI-hw-pathfinder/blob/master/src/main/java/pathfinder/datastructures/Path.java) | path between two buildings |
|[Point](https://github.com/bellaroseee/SDI-hw-pathfinder/blob/master/src/main/java/pathfinder/datastructures/Point.java) | a cartesian coordinate to represent the building's location on the map|

### Parser
| Program Files | |
| --- | --- |
| [CampusPathParser](https://github.com/bellaroseee/SDI-hw-pathfinder/blob/master/src/main/java/pathfinder/parser/CampusPathsParser.java) | parses the campus building file and campus path file |
| [Dijkstra](https://github.com/bellaroseee/SDI-hw-pathfinder/blob/master/src/main/java/pathfinder/parser/Dijkstra.java) | implementation of Dijkstra's algorithm to find shortest path between two buildings |

### Campus Map Model API
| Program Files | |
| --- | --- |
| [ModelAPI](https://github.com/bellaroseee/SDI-hw-pathfinder/blob/master/src/main/java/pathfinder/ModelAPI.java) | interface representing the API that CampusMap needs to implement |
| [CampusMap](https://github.com/bellaroseee/SDI-hw-pathfinder/blob/master/src/main/java/pathfinder/CampusMap.java) | implements the ModelAPI and interacts directly with the Spark Server |
  
## Java Spark Server
Link to documentation [here](https://github.com/bellaroseee/SDI-hw-campuspaths-server/tree/master)
a simple server built with [Java Spark Framework](http://sparkjava.com/).
  
accepts 3 kinds of GET requests and send response back in JSON.
| Routes | | 
| --- | --- |
| /buildingName | returns a map of building short names to long names |
| /location | retuns a map of building short names to the corresponding points |
| /:routes | returns the shortest path between building1-building2
  
## React Web Application
takes the input of two building names and displays the shortest path between them
![landing-page](https://raw.githubusercontent.com/bellaroseee/SDI-hw-campuspaths/master/campus-map-landing-page.jpg)
