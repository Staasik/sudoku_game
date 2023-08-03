  //генерирует и возвращает судоку таблицу размером 9x9
  export function generateSudokuTable(): number[][] {
    const table: number[][] = new Array(9).fill(0).map(() => new Array(9).fill(0));
    generateSudoku(table); //генерация судоку
    return table; 
  }
  
  //рекурсивно генерирует судоку таблицу
  function generateSudoku(table: number[][]): boolean {
    const emptyCell = findEmptyCell(table); //первая пустая ячейка в таблице
    if (!emptyCell) return true; //нет пустых ячеек, судоку сгенерирована
    const [row, col] = emptyCell; //координаты пустой ячейки
    for (const num of shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      if (isValidMove(table, row, col, num) && (table[row][col] = num) && generateSudoku(table)) return true;
      //если число подходит и генерация продолжается, иначе
      table[row][col] = 0; //число не подходит, сброс и продолжаем
    }
    return false; //ни одно число не подходит в текущую ячейку
  }
  
  //находит первую пустую ячейку
  function findEmptyCell(table: number[][]): [number, number] | null {
    for (let row = 0; row < 9; row++)
      for (let col = 0; col < 9; col++)
        if (table[row][col]==0) return [row, col];
    return null; 
  }
  
  //порверка допустимости числа в указанную ячейку
  function isValidMove(table: number[][], row: number, col: number, num: number): boolean {
    const startRow = Math.floor(row / 3) * 3; 
    const startCol = Math.floor(col / 3) * 3; 
    for (let i = 0; i < 9; i++)
      //проверяет по строке, столбцу и квадрату 3x3, чтобы не повторялись числа
      if (table[row][i] === num || table[i][col] === num || table[startRow + Math.floor(i / 3)][startCol + (i % 3)] === num)
        return false; //число присутствует
    return true; //число не повторяется
  }
  
  //перемешивает элементы в массиве рандомно
  function shuffleArray(arr: any[]): any[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
    return arr; 
  }
  
  //заполняет количество случайных непустых ячеек в судоку таблице
  export function fillRandomValues(table: number[][], count: number): number[][] {
    const randomArray: number[] = [];
    var arr = table.flat();
    var sudoku: number[][] = []
    //создаем массив случайных индексов для пустых элементов
    while (randomArray.length < 81-count) {
      const randomNumber = Math.floor(Math.random() * 81);
      if (!randomArray.includes(randomNumber)) {
        randomArray.push(randomNumber);
      }
    }
    //обнуляем эти элементы
    randomArray.forEach(index => {
      arr[index] = 0;
    });
    //делаем и возращаем матрицу
    for (let i = 0; i < 9; i++) {
      const row = arr.slice(i * 9, i * 9 + 9);
      sudoku.push(row);
    }
    return sudoku
  }