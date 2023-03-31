const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

const numberOfBoxes = 9

const fillValue = Object.freeze({
    X: Symbol('X'),
    O: Symbol('O'),
})


var boardState = {
    winningConds: new Map()
}

boardState.winningConds.set(1, [[0, 2]])
boardState.winningConds.set(3, [[0, 6]])
boardState.winningConds.set(5, [[2, 8]])
boardState.winningConds.set(7, [[6, 8]])
boardState.winningConds.set(4, [[0, 8], [2, 6], [1, 7], [3, 5]])

boardState.getAvailableIndexes = () =>
{
    availableIndexes = []

    for (let boardIdx of boardState.board.keys())
    {
        if (!boardState.board.get(boardIdx))
        {
            availableIndexes.push(boardIdx)
        }
    }
    return availableIndexes
}

document.addEventListener('DOMContentLoaded', addDataAttributes)

function clearBoardState()
{
    boardState.board = new Map()
    for (let i = 0; i < numberOfBoxes; ++i) { boardState.board.set(i, null); }
}

function addDataAttributes()
{
    document.querySelectorAll('#grid div').forEach((div, i) =>
    {
        clearBoardState()
        div.dataset.order = i
        div.addEventListener('click', playerPlaysX)
    })
}


function fillSpaceWithImageOf(element, fillVal)
{
    const image = document.createElement('img')
    image.src = (fillVal === fillValue.X) ? X_IMAGE_URL : O_IMAGE_URL
    boardState.board.set(parseInt(element.dataset.order), fillVal);
    element.appendChild(image)
}



function playerPlaysX(event)
{
    const element = event.currentTarget;
    fillSpaceWithImageOf(element, fillValue.X)
    element.removeEventListener('click', playerPlaysX)

    let winner = checkWinner()

    if (!winner)
    {
        computerPlaysO()
    } else
    {
        finishGame(winner)
    }
}

function computerPlaysO()
{
    const div = selectRandomAvailableDiv()
    fillSpaceWithImageOf(div, fillValue.O)
    div.removeEventListener('click', playerPlaysX)

    let winner = checkWinner()

    if (winner)
    {
        finishGame(winner)
    }
}


function selectRandomAvailableDiv()
{
    let availableIndexes = boardState.getAvailableIndexes()
    var idx = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    const element = document.querySelector(`[data-order='${idx}']`);
    return element
}


function checkWinner()
{
    let boardFull = true
    for (boardId of boardState.board.keys())
    {
        fillVal = boardState.board.get(boardId)
        boardFull = boardFull && fillVal

        winningConds = boardState.winningConds.get(boardId)
        if (fillVal && winningConds)
        {
            for (cond of winningConds)
            {
                if (isWinningCondSatisfied(cond, fillVal))
                {
                    return fillVal.description
                }
            }
        }
    }
    if (boardFull)
    {
        return 'withdraw'
    }
}

function isWinningCondSatisfied(nearIdxs, fillVal)
{
    let nearElems = nearIdxs.map(idx => boardState.board.get(idx))
    return nearElems.every(elem => elem && elem === fillVal)
}

function finishGame(winner)
{
    clearBoardState()
    document.querySelectorAll('#grid div').forEach(div =>
    {
        div.innerHTML = ''
        div.addEventListener('click', playerPlaysX)
    })
    p = document.createElement('p')
    p.textContent = `winner is ${winner}. Board is clear for replay`
    document.querySelector('#game-screen').appendChild(p)
}
