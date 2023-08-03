import {HtmlWrapper,Text,Field,Square,Item,NumbersDiv,Numbers,MiniText,MiniTextDiv} from "../../styles/Main";
import { useState, useEffect } from "react";
import {generateSudokuTable,fillRandomValues} from "./Generator"

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];//массив чисел для кликов
var sudokuTableSolution = generateSudokuTable()//судоку решенная
var sudokuTableCell = fillRandomValues(sudokuTableSolution,40)//судоку не решенная

function Main() {
  const [N, setN] = useState<number>(40);//уровень сложности
  const [sudokuTable, setSudokuTable] = useState<number[][]>(sudokuTableCell); //заполняемая судоку
  const [sudokuItem, setSudokuItem] = useState<string>("");//текущий индекс заполняемого поля
  const [gameOver, setGameOver] = useState(N); //новая игра (количество заполненных клеток) надо 81

  //смена сложности
  function ChangeN(count: number){
    setN(count)
  }
  //при смене сложности
  useEffect(() => {      
    Restart();
    Element("Easy")?.style?.setProperty("color", N === 40 ? "red" : "black");
    Element("Medium")?.style?.setProperty("color", N === 30 ? "red" : "black");
    Element("Hard")?.style?.setProperty("color", N === 20 ? "red" : "black");
  }, [N]);

  //получаем элемент для изменения стилей
  function Element(index: string) {
    return document.getElementById(index);
  }
  
  //новая игра
  function Restart() {
    sudokuTableSolution = generateSudokuTable()//новая судоку решенная
    sudokuTableCell = fillRandomValues(sudokuTableSolution,N)//новая судоку не решенная
    setSudokuTable(sudokuTableCell)//сброс текущей судоку
    setSudokuItem("")//сброс текущего индекса
    setGameOver(N)//сброс количества заполненных клеток
    const text = document.getElementById("text");
    if (text) {
      text.textContent = "Sudoku Game";
    }
    for (let i = 0; i < sudokuTable.length; i++) {
      for (let j = 0; j < sudokuTable[i].length; j++) {
          Element(i + "_" + j)?.style?.setProperty("color", "black");
      }
  }
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
        if (sudokuTable[i][j]===sudokuTableSolution[i][j]) {
          Element(i + "_" + j)?.style?.setProperty("color", "blue");
          setGameOver(gameOver+1)
        }
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
    if (gameOver===81) {
      const text = document.getElementById("text");
      if (text) {
        text.textContent = "Congratulations!!!";
      }
    }
  }, [sudokuTable]);

  return (
    <HtmlWrapper>
      <Text id="text">Sudoku Game</Text>
      <MiniTextDiv>
        <MiniText id="Easy" onClick={()=>ChangeN(40)}>Easy</MiniText>
        <MiniText id="Medium" onClick={()=>ChangeN(30)}>Medium</MiniText>
        <MiniText id="Hard" onClick={()=>ChangeN(20)}>Hard</MiniText>
      </MiniTextDiv>
      <Field>
        {sudokuTable.map((row, rowIndex) => (
          <Square key={rowIndex}>
            {row.map((value, columnIndex) => (
              <Item key={columnIndex} id={rowIndex + "_" + columnIndex} onClick={() => FieldClick(rowIndex + "_" + columnIndex)}>{value !== 0 ? value : ""}</Item>
            ))}
          </Square>
        ))}
      </Field>
      <Text onClick={() => Restart()}>New Game</Text>
      <NumbersDiv>
        {NUMBERS.map((value, idx) => (
          <Numbers key={idx} id={String(value)} onClick={() => NumberClick(value)}>{value}</Numbers>
        ))}
      </NumbersDiv>
    </HtmlWrapper>
  );
}

export default Main;
