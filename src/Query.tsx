/*
 * Copyright (C) 2020 Bella Rose.
 */

import React, {Component} from 'react';
import Dropdown from "./Dropdown";
import Route from "./Route";
import "./Query.css";

interface QueryProps {
    onChange(newPath: Route): any;
}

interface QueryState {
    origin: string;
    destination: string;
    buildingList: string[];
    buildingMap: Map<string, string>;
    path: Route;
}

// this thingy is supposed to contain the drop down menu to select destination and origin
class Query extends Component<QueryProps, QueryState> {

    constructor(props: QueryProps) {
        super(props);
        this.state = ({
            origin: "Choose a Building",
            destination: "Choose a Building",
            buildingList: [],
            buildingMap: new Map(),
            path: new Route(), // TODO take a second look at this
        });
        this.loadBuildings();
    }

    updateOri = (newBuilding: string) => {
        this.setState({
                origin: newBuilding,
            }
        );
    };

    updateDest = (newBuilding: string) => {
        this.setState({
                destination: newBuilding,
            }
        );
    };

    clearPath = () => {
        let path = new Route();
        let newPlace = "Choose a Building";
        this.setState({
            path: path,
            origin: newPlace,
            destination: newPlace,
        });
        this.props.onChange(path);
    };

    // send path to parent
    findPath = () => {
        if (this.state.origin === "Choose a Building" || this.state.destination === "Choose a Building") {
            alert("Please choose origin and destination building");
            return;
        }
        const origin = this.state.buildingMap.get(this.state.origin);
        const dest = this.state.buildingMap.get(this.state.destination);

        let route = ""; // TODO: if fails to get route, will get 404
        if (origin !== undefined && dest !== undefined) {
            route = origin + "-" + dest;
        }
        this.searchRoute(route);
    };

    searchRoute(route: string) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:4567/" + route);
        xhr.onload = () => this.searchRouteFinished(xhr);
        xhr.send(null);
    };

    searchRouteFinished(xhr: XMLHttpRequest) {
        if (xhr.status !== 200) {
            // TODO: DO I NEED TO CHANGE THIS TO ALERT?
            console.log("Error: " + xhr.statusText);
        }
        if (xhr.responseText.length > 0) {
            let pathResult = JSON.parse(xhr.response);
            let route = new Route();
            route.totalCost = pathResult.cost;
            route.locationCoordinate = [pathResult.start.x, pathResult.start.y];
            route.paths = pathResult.path;
            this.setState({
                path: route,
            });
            this.props.onChange(route); // update path
        }
    };

    loadBuildings() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:4567/buildingName");
        xhr.onload = () => this.loadBuildingFinished(xhr);
        xhr.send(null);
    };

    loadBuildingFinished(xhr: XMLHttpRequest) {
        if (xhr.status !== 200) {
            // TODO: DO I NEED TO CHANGE THIS TO ALERT?
            console.log("Error: " + xhr.statusText);
        }
        const buildingList: string[] = [];
        let buildingMap: Map<string, string> = new Map();
        if (xhr.responseText.length > 0) {
            let buildingNames = JSON.parse(xhr.response);
            for (let key of Object.keys(buildingNames)) {
                buildingMap.set(buildingNames[key], key); // the map key set is reversed from the one in Model API
                buildingList.push(buildingNames[key]);
            }
        }
        this.setState({
            buildingList: buildingList,
            buildingMap: buildingMap,
        });
    };

    render() {
        return (
            <div>

                <div className="query-get-building">
                    <div className="query-label">From</div>
                    <Dropdown default={this.state.origin}
                              buildingList={this.state.buildingList}
                              onChange={this.updateOri}/>
                </div>
                <div className="query-get-building">
                    <div className="query-label">Destination</div>
                    <Dropdown default={this.state.destination}
                              buildingList={this.state.buildingList}
                              onChange={this.updateDest}/>
                </div>
                <div className="query-button">
                    <button onClick={this.findPath}>FindPath</button>
                    <button onClick={this.clearPath}>Clear</button>
                </div>
            </div>
        );
    }

}

export default Query;