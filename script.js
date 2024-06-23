// for filling the sudoku
document.querySelector("#sudoku-board").addEventListener("keyup",function(event){
    let a=event.key;
    event.target.textContent=a.match(/[1-9]/g);
    // if(a>=0&&a<=9){
    //     event.target.textContent=a;
    // }
    // else{
    //     event.target.textContent="";
    // }
});

const boardMatrix=[];
//solve sudoku 


function isSafe(row, col, num){

    for(let d = 0; d <9; d++){
        if(d==col){
            continue;
        }
        if (boardMatrix[row][d] == num){
            return false;
        }
    }
    for(let r = 0; r < 9; r++){
        if(r==row){
            continue;
        }
        if (boardMatrix[r][col] == num){
            return false;
        }
    }
 
    let sqrt = 3;
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
 
    for(let r = boxRowStart;r < boxRowStart + sqrt; r++){
        for(let d = boxColStart;d < boxColStart + sqrt; d++){
            if(r==row&&d==col){
                continue;
            }
            if (boardMatrix[r][d] == num){
                return false;
            }
        }
    }
 
    return true;
}

function isValid(){

    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if (boardMatrix[i][j] != 0){
                let num=boardMatrix[i][j];
                let row=i;
                let col=j;
                if(!isSafe(i,j,num)){
                    return false;
                }
            }
        }
    }
    return true;
}

// solving boardMatrix
 
function solveSudoku()
{
    let n=9;
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            if (boardMatrix[i][j] == 0){
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty){
            break;
        }
    }
 
    if (isEmpty){
        return true;
    }
 
    for(let num = 1; num <= n; num++){
        if (isSafe( row, col, num)){
            boardMatrix[row][col] = num;
            if (solveSudoku()){
                return true;
            }
            else{
                boardMatrix[row][col] = 0;
            }
        }
    }
    return false;
}


// console.log(boardMatrix);
document.querySelector(".button-solve").addEventListener("click",function(event){

    // let td=document.querySelectorAll("#r2>td");
    // console.log(td[1].textContent);
    
    for(let i=1;i<=9;i++){
        let arr=[];
        let td=document.querySelectorAll("#r"+i+">td");
        // console.log(td);
        for(let j=0;j<td.length;j++){
            console.log(td[j].textContent);
            if(td[j].textContent==""){
                arr[j]=0
            }
            else{
                arr[j]=parseInt(td[j].textContent,10);
            }
        }
        boardMatrix[i-1]=arr;
    }
    console.log(boardMatrix);
    if(isValid()){
        let solution=solveSudoku();
        if(solution==false){
            alert("invalid board");
        }
        else{
            stringtoboard();
        }
    }
    else{
        alert("invalid board");
    }
});

// printing on board:
function stringtoboard(){
    // console.log(boardMatrix);
    for(let i=0;i<9;i++){
        let td=document.querySelectorAll("#r"+(i+1)+">td");
        for(let j=0;j<td.length;j++){
            td[j].textContent=boardMatrix[i][j];
        }
    }
}


// javascript for clearing the board.
document.querySelector(".button-clear").addEventListener("click",function(event){
    for(let i=1;i<=9;i++){
        let td=document.querySelectorAll("#r"+i+">td");
        for(let j=0;j<td.length;j++){
            td[j].textContent="";
        }
    }
});
