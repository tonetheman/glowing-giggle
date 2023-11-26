
const PF = require("pathfinding");
const grid = new PF.Grid(3,3);
const finder = new PF.AStarFinder({
	diagonalMovement: PF.DiagonalMovement.Never
});
grid.setWalkableAt(1,0,false);
let path = finder.findPath(0,0,2,2,grid);

console.log(path)
