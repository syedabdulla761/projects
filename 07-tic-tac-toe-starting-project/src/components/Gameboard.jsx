export default function Gameboard({ onSelectSquare, Board }) {
    

    return (
        <ol id="game-board">
            {Board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((col, colIndex) => (
                            <li key={colIndex}>
                                <button 
                                onClick={() => onSelectSquare(rowIndex, colIndex)}
                                disabled={ col !==null}
                                >{col}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}