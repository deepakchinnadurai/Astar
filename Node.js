  
import React from "react";
import "./Node.css";
import './Pathfinder';
export const Node = ({isStart, isEnd,row , col, iswall,mouseIsPressed,onMouseDown,onMouseEnter,onMouseUp }) =>{
    const classes = isStart ? "node-start" 
    : iswall 
    ? "iswall" 
    :isEnd 
    ? "node-end"
    :"";
    return <div className = {
        `node ${classes}`}
         id = {`node-${row}-${col}`}
       
         ></div>;

};