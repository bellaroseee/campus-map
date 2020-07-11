/*
 * Copyright (C) 2020 Kevin Zatloukal.  All rights reserved.  Permission is
 * hereby granted to students registered for University of Washington
 * CSE 331 for use solely during Spring Quarter 2020 for purposes of
 * the course.  No other use, copying, distribution, or modification
 * is permitted without prior written consent. Copyrights for
 * third-party components of this work must be honored.  Instructors
 * interested in reusing these course materials should contact the
 * author.
 */

import React, {Component} from 'react';
import MapCanvas from "./MapCanvas";
import Query from "./Query";
import Route from "./Route";
import "./App.css";


interface AppState {
    locationMap: Map<String, [number, number]>;
    path: Route;
}

class App extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            locationMap: new Map<String, [number, number]>(),
            path: new Route(),
        };
        this.loadBuildingLocation();
    }

    loadBuildingLocation() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:4567/location");
        xhr.onload = () => this.loadBuildingLocationFinished(xhr);
        xhr.send(null);
    };

    loadBuildingLocationFinished(xhr: XMLHttpRequest) {
        if (xhr.status !== 200) {
            console.log("Error: " + xhr.statusText);
        }
        let locationMap: Map<string, [number, number]> = new Map();
        if (xhr.responseText.length > 0) {
            let locations = JSON.parse(xhr.response);
            for (let key of Object.keys(locations)) {
                const [x,y]:[number, number] = [locations[key].x, locations[key].y];
                locationMap.set(key, [x, y]);
            }
        }
        this.setState({
            locationMap: locationMap,
        });
    };


    updatePath = (newPath: Route) => {
        this.setState({
           path: newPath,
        });
    };

    render() {
        return (
            <div>
                <div className={"title"}>
                    <h1>Welcome to Campus Map</h1>
                </div>
                <Query onChange={this.updatePath}/>
                <MapCanvas path={this.state.path} locationMap={this.state.locationMap}/>
            </div>
        );
    }

}

export default App;
