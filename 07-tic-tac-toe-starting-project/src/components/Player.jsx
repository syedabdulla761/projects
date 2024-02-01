import { useState } from "react"

export default function Player({ initialName, symbol, isActive, OnChangeName }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setisEditing] = useState(false);

    function handleEditClick() {
        setisEditing(x => !x);

        if (isEditing) {
            OnChangeName(symbol, playerName);
        }
    }

    return <li className={isActive ? "active" : undefined}>
        <span className="player">
            {!isEditing ?
                <span className="player-name">{playerName}</span> :
                <input type="text" required value={playerName} onChange={(event) => setPlayerName(event.target.value)}></input>
            }
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
}