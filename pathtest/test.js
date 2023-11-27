
const PF = require("pathfinding");
const ROWS = 3;
const COLS = 3;
const grid = new PF.Grid(ROWS,COLS);
const finder = new PF.AStarFinder({
	diagonalMovement: PF.DiagonalMovement.Never
});

function make_everything_walkable(grid) {
	for(let i=0;i<ROWS;i++) {
		for(let j=0;j<COLS;j++) {
			grid.setWalkableAt(i,j,true);
		}
	}
}

let set_list = [[1,0]];
for (let i=0;i<set_list.length;i++) {
	const s = set_list[i];
	grid.setWalkableAt(s[0],s[1],false);
}

grid.setWalkableAt(1,0,false);

let path = finder.findPath(0,0,2,2,grid);

console.log(path)
