import { useState } from 'react'
import Tile from './Tile.jsx'
export default function Column() {
    const [tiles, setTiles] = useState([])


    return (
        <div className="pt-[.29rem] space-y-[.6rem]">
            <Tile />
            <Tile />
            <Tile />
            <Tile />
            <Tile />
        </div>
    )
}