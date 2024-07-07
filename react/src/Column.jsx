import { useState } from 'react'
import Tile from './Tile.jsx'
export default function Column() {
    const [tiles, setTiles] = useState([])
    const addTile = () => {
        if (tiles.length > 6) return
        setTiles([...tiles, <Tile className="bg-red-500" />])
    }

    return (
        <div className="flex flex-col justify-end h-auto w-[4.4rem] pt-[.29rem] space-y-[.6rem] z-10"
            onClick={addTile}
        >
            <Tile className="bg-red-500" />
            {tiles &&
                tiles.map((tile, index) => (
                    <div key={index}> {tile}</div>
                   
            ))}
        </div>
    )
}