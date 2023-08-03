import {HtmlWrapper,Text,Field,Square,Item,NumbersDiv,Numbers} from "../../styles/Main";
import { useState, useEffect } from "react";

//исходные данные
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const TABLE = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];
const TABLE1 = [
    [0, 0, 8, 0, 3, 0, 5, 4, 0],
    [3, 0, 0, 4, 0, 7, 9, 0, 0],
    [4, 1, 0, 0, 0, 8, 0, 0, 2],
    [0, 4, 3, 5, 0, 2, 0, 6, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 8],
    [0, 6, 0, 3, 0, 9, 4, 1, 0],
    [1, 0, 0, 8, 0, 0, 0, 2, 7],
    [0, 0, 5, 6, 0, 3, 0, 0, 4],
    [0, 2, 9, 0, 7, 0, 8, 0, 0]
];
const TABLE2 = [
    [6, 0, 0, 1, 0, 8, 2, 0, 3],
    [0, 2, 0, 0, 4, 0, 0, 9, 0],
    [8, 0, 3, 0, 0, 5, 4, 0, 0],
    [5, 0, 4, 6, 0, 7, 0, 0, 9],
    [0, 3, 0, 0, 0, 0, 0, 5, 0],
    [7, 0, 0, 8, 0, 3, 1, 0, 2],
    [0, 0, 1, 7, 0, 0, 9, 0, 6],
    [0, 8, 0, 0, 3, 0, 0, 2, 0],
    [3, 0, 2, 9, 0, 4, 0, 0, 5]
];

//функция для решения судоку (работает только на простых вариантов с одним решением)
function Sudoku_Solution(solution: number[][]) {
    const puzzle = solution.map((row) => [...row]);

    while (true) {
        //все клетки заполнены вернем решение
        if (puzzle.every((row) => row.every((cell) => cell))) {return puzzle;}

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (puzzle[i][j] !== 0) continue

                let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                let row = puzzle[i];
                let column = puzzle.map((r) => r[j]);

                let ii = Math.floor(i / 3) * 3;
                let jj = Math.floor(j / 3) * 3;
                let square = puzzle.slice(ii, ii + 3).map((r) => r.slice(jj, jj + 3)).flat();

                //удаляем числа, которые уже есть
                [row, column, square].forEach((arr) => {numbers = numbers.filter((n) => !arr.includes(n));});
                
                //если осталось одно число, ставим в текущюю клетку
                if (numbers.length === 1) puzzle[i][j] = numbers[0]
            }
        }
    }
}

//решенная судоку
const sudokuTableSolution: number[][] = Sudoku_Solution(TABLE)

function Main() {
  const [sudokuTable, setSudokuTable] = useState<number[][]>(TABLE); //заполняемая судоку
  const [sudokuItem, setSudokuItem] = useState<string>("");//текущий индекс заполняемого поля
  const [restartCount, setRestartCount] = useState(0); //новая игра

  //получаем элемент для изменения стилей
  function Element(index: string) {
    return document.getElementById(index);
  }

  //если началась новая игра
  useEffect(() => {
    setSudokuTable(JSON.parse(JSON.stringify(TABLE))); 
    setSudokuItem("");
  }, [restartCount]);

  //новая игра
  function Restart() {
    setRestartCount(restartCount + 1);
  }

  //пользователь нажал на выбранное поле
  function FieldClick(Index: string) {
    for (let i = 0; i < sudokuTable.length; i++) {
        for (let j = 0; j < sudokuTable[i].length; j++) {
            if (sudokuTable[i][j] === 0) Element(i + "_" + j)?.style?.setProperty("background-color", "#FFFFFF");
            else Element(i + "_" + j)?.style?.setProperty("background-color", "#E0FFFF");
        }
    }   
    Element(Index)?.style?.setProperty("background-color", "#B0C4DE");
    setSudokuItem(Index);
  }

  //пользователь нажал на выбранную цифру для заполнения поля
  function NumberClick(value: number) {
    let El = Element(sudokuItem);
    if (!El) return
    let i = Number(sudokuItem[0]);
    let j = Number(sudokuItem[2]);
    if (sudokuTable[i][j] === 0 || (El && El.style.color === "red")) {
        const newSudokuTable = Array.from(sudokuTable);
        newSudokuTable[i][j] = value;
        setSudokuTable(newSudokuTable); 

        Element(i + "_" + j)?.style?.setProperty("background-color", "#B0C4DE");
        if (sudokuTable[i][j]===sudokuTableSolution[i][j]) Element(i + "_" + j)?.style?.setProperty("color", "blue");
        else Element(i + "_" + j)?.style?.setProperty("color", "red");     
    }
  } 

  //при изменении исходной таблицы
  useEffect(() => {
    for (let i = 0; i < sudokuTable.length; i++) {
      for (let j = 0; j < sudokuTable[i].length; j++) {
        if (sudokuTable[i][j] === 0) Element(i + "_" + j)?.style?.setProperty("background-color", "#FFFFFF");
        else Element(i + "_" + j)?.style?.setProperty("background-color", "#E0FFFF");
      }
    }    
    Element(sudokuItem)?.style?.setProperty("background-color", "#B0C4DE");
  }, [sudokuTable]);

  return (
    <HtmlWrapper>
      <Text>Sudoku Game</Text>
      <Field>
        {sudokuTable.map((row, rowIndex) => (
          <Square key={rowIndex}>
            {row.map((value, columnIndex) => (
              <Item key={columnIndex} id={rowIndex + "_" + columnIndex} onClick={() => FieldClick(rowIndex + "_" + columnIndex)}>{value !== 0 ? value : ""}</Item>
            ))}
          </Square>
        ))}
      </Field>
      <Text onClick={() => Restart()}>Restart</Text>
      <NumbersDiv>
        {NUMBERS.map((value, idx) => (
          <Numbers key={idx} id={String(value)} onClick={() => NumberClick(value)}>{value}</Numbers>
        ))}
      </NumbersDiv>
    </HtmlWrapper>
  );
}

export default Main;
