import React ,{useState, useEffect, Component} from 'react';
//import React, {Component} from 'react';
import {Node} from './Node.js';
import './Pathfinder.css';
import './Astar';
import Astar from './Astar';



let cols = 28;
let rows = 10;
//let Node_start_row = 0;
let Node_start_col = 0;
let Node_end_row = rows-1;
let Node_end_col = cols-1;

let tt=0;






export const Pathfinder = () =>{
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [VisitedNodes, setVisitedNodes] = useState([]);
    const [wall ,setWall] = useState([]);
    const [Node_start_row, setNode_start_row] = useState(0);


    //props
    // constructor(props){
    //     super(props);
    //     this.state = {
    //       grid: [],
    //       mouseIsPressed: false,
    //       topMessage: "Dijkstra Algorithm",
    //       weight: 1,
    //       changeWeight: false,
    //       distanceToBeTraveled: 0,
    //     };
    //   }
    
    const [state, setState] = useState({
        grid:Grid,
        mouseIsPressed: false,
        topMessage: "Dijkstra Algorithm",
        weight: 1,
        changeWeight: false,
        distanceToBeTraveled: 0,
       })


  function  handleMouseDown(rows, cols) {
        if (this.state.topMessage !== "Dijkstra Algorithm") return;
    
        let newGrid = [];
     
          newGrid = getNewGridWithWallToggled(this.state.grid, rows, cols);
        
    
        this.setState({ grid: newGrid, mouseIsPressed: true });
      }
    
      // On entering the new node element.
    function  handleMouseEnter(rows, cols) {
        if (this.state.topMessage !== "Dijkstra Algorithm") return;
        if (!this.state.mouseIsPressed) return;
    
        let newGrid = [];
        newGrid = getNewGridWithWallToggled(this.state.grid, rows, cols);
    
        this.setState({ grid: newGrid, mouseIsPressed: true });
      }
    
      // When we release the mouse
     function handleMouseUp() {
        if (this.state.topMessage !== "Dijkstra Algorithm") return;
        this.setState({ mouseIsPressed: false });
      }





    useEffect (()=>{
        initalizeGrid();
        
    },[]);
 
    

    const initalizeGrid = () =>{
        const grid = new Array(rows);
        for(let i=0;i<rows;i++){
            grid[i] = new Array(cols);
        }


        createSpot(grid);
        setGrid(grid);
        addNeighbours(grid);



        

         let startNode = grid[Node_start_row][Node_start_col];
        let endNode = grid[Node_end_row][Node_end_col];
       let path =  Astar(startNode,endNode);
       startNode.iswall = false;
       endNode.iswall = false;
       setPath(path.path);
       setVisitedNodes(path.visitedNodes);


    };

    
   
 

// for creating the spot 

const createSpot = (grid) =>{
     for(let i=0;i<rows;i++){
         for(let j=0;j<cols;j++){
             grid[i][j] = new Spot(i,j);
         }
     }
};


// for addneighbours;

const addNeighbours = (grid) =>{
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            grid[i][j].addneighbours(grid);
        }
    }
}







function Spot(i,j){
    this.x = i;
    this.y = j;
    this.isStart = this.x === Node_start_row && this.y === Node_start_col;
    this.isEnd = this.x === Node_end_row && this.y === Node_end_col;
    this.g= 0;
    this.f= 0;
    this.h=0;
    this.iswall = false;
    if(Math.random(1)<0.2){
        this.iswall = true;
      
    }
    // <button onClick={handleClick} >j</button>
    this.neighbours = [];
    this.previous = undefined;
    this.addneighbours = function(grid){
        let i = this.x;
        let j = this.y;
        if(i>0) this.neighbours.push(grid[i-1][j]);
        if(i<rows -1) this.neighbours.push(grid[i+1][j]);
        if(j>0) this.neighbours.push(grid[i][j-1]);
        if(j<cols-1) this.neighbours.push(grid[i][j+1]);
    }
}
console.log(Grid);

const gridwithNode = (
    <div> 
    {Grid.map((row,rowIndex)=>{
        return(
            
            <div key = {rowIndex} className= "rowWrapper">
                {row.map((col, colIndex)=>{
                    const {isStart, isEnd, iswall} = col;
                    return <Node 
                    key = {colIndex} 
                    isStart = {isStart} 
                    isEnd = {isEnd} 
                    row = {rowIndex} 
                    col = {colIndex}
                    iswall = {iswall}
                   // mouseIsPressed={mouseIsPressed}
                    // onMouseDown={(row, col) =>
                    //           this.handleMouseDown(row, col)
                    //         }
                    // onMouseEnter={(row, col) =>
                    //           this.handleMouseEnter(row, col)
                    //         }
                    // onMouseUp={() => this.handleMouseUp()}
                    />;
    
                })}
                
            </div>
            
        );
    })}
    </div>
);


const visualizeShortestPath = (shortestPathNodes)=>{
    for(let i=0;i<shortestPathNodes.length;i++){
        setTimeout(()=>{
            const node = shortestPathNodes[i];
            document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
        },10*i);
    }
};

const visualizePath = () =>{
    for(let i=0;i<=VisitedNodes.length;i++){
       if(i===VisitedNodes.length){
        setTimeout(()=>{
            visualizeShortestPath(Path);
        },20*i);
    }
    
    else{
        setTimeout(()=>{
        const node = VisitedNodes[i];
            document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
        },20*i);
    }
    }
}


// const changeStart = (Node_start_row,Node_start_col)=>{
//     Node_start_col=2;
//     Node_start_row = 2;
//     startNode = grid[2][2];
// }
const restart = () =>{
    window.location.reload(false);

}





return(


    


    
    <div className = "Wrapper">
    
    <button className="btn1" onClick={restart} >Restart</button>
    <button className="btn" onClick={visualizePath}>Visualize A*</button>
        {getNewGridWithWallToggled}
        {gridwithNode}
    </div>
    
);

};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    const newNode = {
      ...node, // copying other properties of the node
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };