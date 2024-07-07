
export default function Column({tiles}) {
    return (
        <div className="flex flex-col justify-end h-auto w-[4.4rem] pt-[.29rem] space-y-[.6rem] z-10">
            {tiles &&
                tiles.map((tile, index) => (
                    <div key={index}> {tile}</div>                 
            ))}
        </div>
    )
}