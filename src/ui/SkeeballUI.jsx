import { useState } from "react"

import useSkeeballGame from "../stores/useSkeeballGame"

export default function SkeeballUI() {

    const [ scoreCopied, setScoreCopied ] = useState(false)

    const [
        playerScore,
        maxAttempts,
        playerAttempts,
        gameEnded,
        resetGame
     ] = useSkeeballGame((state) => [
        state.playerScore,
        state.maxAttempts,
        state.playerAttempts,
        state.gameEnded,
        state.resetGame
     ])

    const shareScore = () => {
        // Save score mesage to clipboard
        navigator.clipboard.writeText(`I just scored ${playerScore} on Lapero Skeeball!`)
        setScoreCopied(true)
    }

    return (
        <div className="fixed inset-0 w-full h-screen z-50 pointer-events-none">
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

            <div className="absolute top-4 left-0 w-full text-white text-center text-2xl">
                <span>
                    Score: { playerScore }
                </span>
            </div>

            <div className="absolute bottom-4 left-0 w-full text-white text-center text-2xl">
                <span>
                    { playerAttempts } / { maxAttempts }
                </span>
            </div>
        </div>
    )

}