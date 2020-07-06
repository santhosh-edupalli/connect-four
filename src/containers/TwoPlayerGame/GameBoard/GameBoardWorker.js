import _ from 'lodash'

export const checkforResult = (board, rows, columns) => {
    return checkVertical(board, rows, columns) || checkDiagonalRight(board, rows, columns) || checkDiagonalLeft(board, rows, columns) || checkHorizontal(board, rows, columns) || checkDraw(board, rows, columns);
}

export const getPlayer = (tInfo,id) => {
    let presentGameIndex = tInfo.indexOf(0)
    switch(id){
        case 1:
            let gamesPlayed = tInfo.length - _.countBy(tInfo)[0]
            return gamesPlayed % 2 === 0 ? 1 : 2
        case 2:
            return tInfo[presentGameIndex-1] === 1 ? 2 : 1
        case 3:
            return tInfo[presentGameIndex-1] === 1 ? 1 : 2
        case 4:
            return 1
        case 5:
            return 2
        default:
            return 1
    }
}

const checkVertical = (board,rows, columns) => {
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c]) {
                if (board[r][c] === board[r - 1][c] &&
                    board[r][c] === board[r - 2][c] &&
                    board[r][c] === board[r - 3][c]) {
                    return board[r][c];    
                }
            }
        }
    }
}
  
const checkHorizontal = (board,rows, columns) => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            if (board[r][c]) {
                if (board[r][c] === board[r][c + 1] && 
                    board[r][c] === board[r][c + 2] &&
                    board[r][c] === board[r][c + 3]) {
                    return board[r][c];
                }
            }
        }
    }
}
  
const checkDiagonalRight = (board,rows, columns) => {
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            if (board[r][c]) {
                if (board[r][c] === board[r - 1][c + 1] &&
                    board[r][c] === board[r - 2][c + 2] &&
                    board[r][c] === board[r - 3][c + 3]) {
                    return board[r][c];
                }
            }
        }
    }
}
  
const checkDiagonalLeft = (board,rows, columns) => {
    for (let r = 3; r < rows; r++) {
        for (let c = 3; c < columns; c++) {
            if (board[r][c]) {
                if (board[r][c] === board[r - 1][c - 1] &&
                    board[r][c] === board[r - 2][c - 2] &&
                    board[r][c] === board[r - 3][c - 3]) {
                    return board[r][c];
                }
            }
        }
    }
}
  
const checkDraw = (board,rows, columns) => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === null) {
                return null;
            }
        }
    }
    return 3;    
}
  