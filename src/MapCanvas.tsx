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
import "./Map.css";

interface MapState {
    backgroundImage: HTMLImageElement | null;
}

interface MapProps {
    locationMap: Map<String, [number, number]>;
    path: any;
}

class MapCanvas extends Component<MapProps, MapState > {

    // NOTE:
    // This component is a suggestion for you to use, if you would like to.
    // It has some skeleton code that helps set up some of the more difficult parts
    // of getting <canvas> elements to display nicely with large images.
    //
    // If you don't want to use this component, you're free to delete it.

    canvas: React.RefObject<HTMLCanvasElement>;

    constructor(props: MapProps) {
        super(props);
        this.state = {
            backgroundImage: null
        };
        this.canvas = React.createRef();
    }

    componentDidMount() {
        this.fetchAndSaveImage();
        this.drawBackgroundImage();
    };

    componentDidUpdate() {
        this.drawBackgroundImage();
        this.drawPath();
    };

    handleClick(event: any) {
        let xPosition = event.clientX;
        let yPosition = event.clientY;
        let clientPoint:[number, number] = [xPosition, yPosition];
        console.log(xPosition, yPosition);
        console.log(event);
        // let map = this.props.locationMap;
        // console.log(map.keys());
    };

    fetchAndSaveImage() {
        // Creates an Image object, and sets a callback function
        // for when the image is done loading (it might take a while).
        let background: HTMLImageElement = new Image();
        background.onload = () => {
            this.setState({
                backgroundImage: background
            });
        };
        // Once our callback is set up, we tell the image what file it should
        // load from. This also triggers the loading process.
        background.src = "./campus_map.jpg";
    };

    drawBackgroundImage() {
        let canvas = this.canvas.current;
        if (canvas === null) throw Error("Unable to draw, no canvas ref.");
        let ctx = canvas.getContext("2d");
        if (ctx === null) throw Error("Unable to draw, no valid graphics context.");
        if (this.state.backgroundImage !== null) { // This means the image has been loaded.
            // Sets the internal "drawing space" of the canvas to have the correct size.
            // This helps the canvas not be blurry.
            canvas.width = this.state.backgroundImage.width;
            canvas.height = this.state.backgroundImage.height;
            ctx.drawImage(this.state.backgroundImage, 0, 0);
        }
        // draw the locations together with the map
        // this.drawLocations();
    };

    drawPath() {
        let canvas = this.canvas.current;
        if (canvas === null) throw Error("Unable to draw, no canvas ref.");
        let ctx = canvas.getContext("2d");
        let l = this.props.path.paths;
        if (l !== undefined) {
            for (let i = 0; i < l.length; i++) {
                this.drawLine(ctx, [l[i].start.x, l[i].start.y], [l[i].end.x, l[i].end.y]);
                this.drawCircle(ctx, [l[i].start.x, l[i].start.y], "purple");
            }
        }
    };

    drawLine = (ctx: any,  coordinate1: [number, number],  coordinate2: [number, number]) => {
        // default color is set to white
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(coordinate1[0], coordinate1[1]);
        ctx.lineTo(coordinate2[0], coordinate2[1]);
        ctx.stroke();
    };

    drawLocations() {
        let canvas = this.canvas.current;
        if (canvas === null) throw Error("Unable to draw, no canvas ref.");
        let ctx = canvas.getContext("2d");
        // @ts-ignore
        for (let key of this.props.locationMap.keys()) {
            let point = this.props.locationMap.get(key);
            if (point != undefined) {
                this.drawCircle(ctx, point, "blue");
            }
        }
    };

    drawCircle = (ctx: any,  coordinate1: [number, number], color:string) => {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(coordinate1[0],coordinate1[1],5,0,2*Math.PI);
        ctx.stroke();
        ctx.fill();
    };

    render() {
        return (
            <canvas ref={this.canvas} onClick={this.handleClick}/>
        )
    }
}

export default MapCanvas;