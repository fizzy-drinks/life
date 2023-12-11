'use client'

import { FC, MouseEventHandler } from "react"

const ClickListener: FC<{ onSquareClicked: (squareCoords: [number, number]) => void }> = ({ onSquareClicked }) => {
    const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
        const {innerWidth: w, innerHeight: h} = window
        onSquareClicked(
            [event.pageX - Math.floor(w / 2), event.pageY - Math.floor(h / 2)]
                .map(n => Math.floor(n / 32)) as [number, number]
        )
    }
    
    return (
        <div className="w-full h-full absolute top-0 left-0" onClick={onClick} />
    )
}

export default ClickListener