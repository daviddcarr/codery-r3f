import { useState } from "react"

import useSkeeballGame from "../stores/useSkeeballGame"
import { LuInfo, LuMousePointerClick } from "react-icons/lu"
import { FaArrowRightArrowLeft } from "react-icons/fa6"


export default function SkeeballUI() {

    const [ scoreCopied, setScoreCopied ] = useState(false)
    const [ tooltipClosed, setTooltipClosed ] = useState(false)

    const [
        playerScore,
        maxAttempts,
        playerAttempts,
        gameEnded,
        resetGame,
     ] = useSkeeballGame((state) => [
        state.playerScore,
        state.maxAttempts,
        state.playerAttempts,
        state.gameEnded,
        state.resetGame,
     ])

    const shareScore = () => {
        // Save score mesage to clipboard
        navigator.clipboard.writeText(`I just scored ${playerScore} on Lapero Skeeball!`)
        setScoreCopied(true)
    }

    return (
        <div className="fixed inset-0 w-full h-screen pointer-events-none">

            {!tooltipClosed && (
            <div className="absolute max-w-96 w-[90vw] z-20 top-0 left-1/2 translate-x-[-50%] bg-purple text-white p-5 pt-6 rounded-b">
                <h2 className="text-3xl mb-6 font-heading">Quick Guide</h2>

                <ul className="space-y-4">
                    <li><div className="flex items-center gap-3"><div><FaArrowRightArrowLeft className="text-[40px]" /></div> <span className="font-body"> Move the ball / head left or right with your cursor!</span></div></li>
                    <li><div className="flex items-center gap-3"><div><LuMousePointerClick className="text-[40px]" /></div> <span className="font-body"> Click or tap the ball to make it begin rolling!</span></div></li>
                </ul>

                <p className="text-sm text-white mt-5 font-body">
                    <strong>Recommended:</strong> To fully enjoy this experience, use a device with a cursor (mouse or touchpad). Mobile interaction is supported, but may not offer the intended gameplay. 
                </p>

              <div className="flex justify-center w-full mt-4">

                <button
                  className="pointer-events-auto bg-gray-700 hover:bg-yellow text-white hover:text-black p-2 pt-3 rounded-md mt-4"
                  onClick={() => setTooltipClosed(true)}
                  >
                  Close
                </button>
              </div>

            </div>

            )}


            {gameEnded && (
            <div className="absolute max-w-96 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-purple text-white p-5 pt-6 rounded">
                <h2 className="text-3xl mb-6 font-heading">Final Score</h2>

                <div className="text-6xl font-heading text-center">
                    { playerScore }
                </div>

              <div className="flex justify-center w-full mt-4 gap-2">
                <button
                    className="pointer-events-auto bg-gray-700 hover:bg-yellow text-white hover:text-black p-2 pt-3 rounded-md mt-4"
                    onClick={() => {
                        resetGame()
                        setScoreCopied(false)
                    }}
                    >
                    Reset
                </button>
                <button
                    className={`pointer-events-auto ${scoreCopied ? 'bg-teal text-black' : 'bg-gray-700 text-white'} hover:bg-yellow hover:text-black p-2 pt-3 rounded-md mt-4`}
                    onClick={() => shareScore()}
                    >
                    { !scoreCopied ? 'Share' : 'Copied!' }
                </button>
              </div>

            </div>

          )}

            <div className="absolute top-4 left-0 w-full text-white text-center text-lg md:text-2xl">
                <span>
                    Score: { playerScore }
                </span>
            </div>

            <div className="absolute top-4 right-4 text-white text-center text-lg md:text-2xl">
                <span>
                    { playerAttempts } / { maxAttempts }
                </span>
            </div>

            <div className="absolute bottom-4 right-4">
                <button className={`${tooltipClosed ? 'bg-gray-700 text-white' : 'bg-teal text-black'} hover:bg-purple hover:text-white  p-2 rounded-md pointer-events-auto`}
                    onClick={() => setTooltipClosed(!tooltipClosed)}>
                    <LuInfo className="w-6 h-6" />
                </button>
            </div>
        </div>
    )

}