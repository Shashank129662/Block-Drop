const SHAPES = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1],
        [1, 1],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ]

];

const COLORS = [
    "#000000",
    "#11e0f7",
    "#1175f7",
    "#f7b211",
    "#f71111",
    "#f711c6",
    "#11c2f7",
    "#00FF00"
];
let ROWS =15;
let COLS= 10;
let canvas=document.querySelector("#Game");
let ctx=canvas.getContext("2d");
ctx.scale(30,10);
let pieceObj=null;
let grid=generateGrid();
let score=0;
let scoreboard=document.getElementById("bt");
let gameOver=document.getElementById("GameOver");
let maintitle=document.getElementById("mainaudio");
//console.log(pieceObj);

function generateRandomPiece()
{
let ran=Math.floor(Math.random()*7);
console.log(SHAPES[ran]);
let piece=SHAPES[ran];
let colorIndex=ran+1;
let x=4;
let y=0;
return {piece,x,y,colorIndex};
}
setInterval(newGameState,500);
function newGameState()
{
    checkGrid();
    if(pieceObj==null)
    {
        pieceObj=generateRandomPiece();
        renderPiece();
    }
    
    moveDown();
}
function checkGrid()
{
    let count=0;
    for(let i=0;i<grid.length;i++)
    {
        let allgrid=true;
        for(let j=0;j<grid[i].length;j++)
        {
            if(grid[i][j]==0)
            {
                allgrid=false;
            }
        }
    
        if(allgrid)
        {
            grid.splice(i,1);
            grid.unshift([0,0,0,0,0,0,0,0,0,0]);
            count++;
        }
    }
    if(count==1)
    {
        score+=10;
    }
    else if(count==2)
    {
        score+=30;
    }
    else if(count==3)
    {
        score+=50;
    }
    else if(count>3)
    {
        score=+70;
    }
    scoreboard.innerHTML=+score;
}
function renderPiece()
{
    let piece=pieceObj.piece;
    for(let i=0; i<piece.length;i++)
    {
        for(let j=0 ;j<piece[i].length;j++)
        {
            if(piece[i][j]==1)
            {
                ctx.fillStyle=COLORS[pieceObj.colorIndex];
                ctx.fillRect(pieceObj.x+j,pieceObj.y+i,1,1);
            }
        }
    }
}
function lockPiece() // its locking the piceces at the end of the canvas 
{
    let piece=pieceObj.piece;
    for(let i=0;i<piece.length;i++)
    {
        for(let j=0;j<piece[i].length;j++)
        {
            if(piece[i][j]==1)
            {
                grid[pieceObj.y+i][pieceObj.x+j]=pieceObj.colorIndex;
            }
        }
    }
    if(pieceObj.y==0)
    {
        Openpopup();
        ctx.fillRect=null;
    }
    pieceObj=null;
}
function Openpopup()
{
    document.getElementById('GOpopup').style.display='block';
    gameOver.play();
}
function Closepopup()
{
    document.getElementById('GOpopup').style.display='none';
}
function GRestart()
{
   location.reload();
}
function moveDown()
{
    if(!collision(pieceObj.piece,pieceObj.x,pieceObj.y+1))
    {
    pieceObj.y+=1;
    renderGrid();
    }
    else 
    {
        lockPiece();
    }
} 
function moveLeft() {
    if (!collision(pieceObj.piece, pieceObj.x - 1, pieceObj.y)) {
        pieceObj.x -= 1;
        renderGrid();
    }
}

function moveRight() {
    if (!collision(pieceObj.piece, pieceObj.x + 1, pieceObj.y)) {
        pieceObj.x += 1;
        renderGrid();
    }
}
function moveRotate()
{
    let rotatePiece=[];
    let piece=pieceObj.piece;
    for(let i=0;i<piece.length;i++)
    {
        rotatePiece.push([]);
        for(let j=0;j<piece[i].length;j++)
        {
            rotatePiece[i].push(0);
        }
    }
    for(let i=0;i<piece.length;i++)
    {
        for(let j=0;j<piece[i].length;j++)
        {
            rotatePiece[i][j]=piece[j][i];
        }
    }
    for(let i=0;i<rotatePiece.length;i++)
    {
        rotatePiece[i]=rotatePiece[i].reverse();
    }
    if(!collision(pieceObj.piece,pieceObj.x,pieceObj.y,rotatePiece))
            pieceObj.piece=rotatePiece;
        renderGrid();
    
    
}

function collision(piece, newX, newY, rotatePiece) {
    let currentPiece = rotatePiece || piece;
    for (let i = 0; i < currentPiece.length; i++) {
        for (let j = 0; j < currentPiece[i].length; j++) {
            if (currentPiece[i][j] === 1) {
                let p = newX + j;
                let q = newY + i;
                if (p < 0 || p >= COLS || q >= ROWS || q < 0 || (grid[q] && grid[q][p])) {
                    return true;
                }
            }
        }
    }
    return false;
}
function generateGrid()
{
    let grid=[];
    for(let i=0;i<ROWS;i++)
    {
        grid.push([]);
        for(let j=0;j<COLS;j++)
        {
            grid[i].push(0);
        }
    }
    return grid;
}
function renderGrid()
{
    ctx.clearRect(0,0,canvas.height,canvas.width);
    for(let i=0; i<grid.length;i++)
    {
        for(let j=0 ;j<grid[i].length;j++)
        {
                ctx.fillStyle=COLORS[grid[i][j]];
                ctx.fillRect(j,i,1,1);
        }        
    }
    return renderPiece();
}

document.addEventListener("keydown",function(e)
{
let key=e.code;
if(key=="ArrowDown")
{
    moveDown();
}
else if(key=="ArrowLeft")
{
    moveLeft();
}
else if(key=="ArrowRight")
{
    moveRight();
}
else if(key=="ArrowUp")
{
    moveRotate();
}
});

function popup()
{
    document.getElementById('popup').style.display='block';
}
function closepopup()
{
    document.getElementById('fa-pause').style.display='none';
}
function htppopup()
{
    document.getElementById('htp').style.display='block';
}
function htpclosepopup()
{
    document.getElementById('htpclose').style.display='none';
}
