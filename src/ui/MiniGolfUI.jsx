import { useMiniGolfGame } from "../stores/useMiniGolfGame"

import { GiPauseButton, GiPlayButton } from 'react-icons/gi'
import { LuRotate3D, LuFocus, LuInfo } from "react-icons/lu"
import { FaCheckCircle } from "react-icons/fa"
import { FaArrowRotateRight } from "react-icons/fa6"

import { useState } from 'react'

export default function SkeeballUI() {

    const [ 
        cameraMode, 
        toggleCameraMode,
        gamePaused,
        setGamePaused,
        ballIsReady,
        toggleGamePaused,
        currentLevel,
        gameState,
        gameEnded,
        resetGame
      ] = useMiniGolfGame((state) => [ 
        state.cameraMode,
        state.toggleCameraMode,
        state.gamePaused,
        state.setGamePaused,
        state.ballIsReady,
        state.toggleGamePaused,
        state.currentLevel,
        state.gameState,
        state.gameEnded,
        state.resetGame
      ])

    const [ tooltipClosed, setTooltipClosed ] = useState(false)
    const [ scoreCopied, setScoreCopied ] = useState(false)

    const calculateScore = () => {
        let score = 0
        for (let i = 0; i < gameState.length; i++) {
            score += gameState[i].strokes
        }
        let par = 0
        for (let i = 0; i < gameState.length; i++) {
            par += gameState[i].par
        }

        return [ score, par ]
    }

    const shareScore = () => {
        // Save score mesage to clipboard
        const [
          score,
          par
        ] = calculateScore()

        navigator.clipboard.writeText(`I just scored ${score} / ${par} on Lapero Mini Golf!`)
        setScoreCopied(true)
      }
    

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">

          {!tooltipClosed && (
            <div className="absolute max-w-96 w-[90vw] z-20 top-0 left-1/2 translate-x-[-50%] bg-purple text-white p-5 pt-6 rounded-b">
                <h2 className="text-3xl mb-6 font-heading">Quick Guide</h2>

                <ul className="space-y-4">
                    <li><div className="flex items-center gap-3"><div><GiPlayButton className="text-[40px]" /></div> <span className="font-body">Enable Play  Mode, Click and Drag on the ball to configure your swing!</span></div></li>
                    <li><div className="flex items-center gap-3"><div><GiPauseButton className="text-[40px]" /></div> <span className="font-body">Pause the game by clicking the pause button.</span></div></li>
                    <li><div className="flex items-center gap-3"><div><FaCheckCircle className="text-[40px]" /></div> <span className="font-body">The green checkmark indicates that the ball is ready!</span></div></li>
                    <li><div className="flex items-center gap-3"><div><LuFocus className="text-[40px]" /></div> <span className="font-body">Enable Follow Camera Mode, Camera will follow the ball.</span></div></li>
                    <li><div className="flex items-center gap-3"><div><LuRotate3D className="text-[40px]" /></div> <span className="font-body">Enable Free Camera Mode, Camera will not follow the ball, but can be moved when game is paused.</span></div></li>
                </ul>

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

          {
            gameEnded && (
              <div className="absolute max-w-96 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-purple text-white p-5 pt-6 rounded">
                <h2 className="text-3xl mb-6 font-heading">Final Score</h2>

                <div className="text-6xl font-heading text-center">
                    { calculateScore()[0] } / { calculateScore()[1] }
                </div>

              <div className="flex justify-center w-full mt-4 gap-2">
                <button
                    className="pointer-events-auto bg-gray-700 hover:bg-yellow text-white hover:text-black p-2 pt-3 rounded-md mt-4"
                    // TODO: Write a reset function in game store
                    onClick={() => {
                        resetGame()
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
            )
          }

            <div className="flex justify-between absolute bottom-0 w-full p-4 items-center">
              <div className="flex gap-2">
                <button
                  className="bg-gray-700 hover:bg-purple-600 text-white p-2 rounded-md pointer-events-auto"
                  onClick={() => {
                    toggleGamePaused()
                    setTooltipClosed(true)
                  }}
                  >
                  {gamePaused ? (
                    <GiPlayButton className="w-6 h-6" />
                  ): (
                    <GiPauseButton className="w-6 h-6" />
                  )}
                </button>
                <button
                  className="bg-gray-700 hover:bg-purple-600 text-white p-2 rounded-md pointer-events-auto"
                  onClick={() => {
                    if (cameraMode === 'follow') {
                      setGamePaused(true)
                    }
                    toggleCameraMode()
                    setTooltipClosed(true)
                  }}
                  >
                    {cameraMode === 'free' ? (
                      <LuFocus className="w-6 h-6" />
                    ) : (
                      <LuRotate3D className="w-6 h-6" />
                    )}
                </button>
              </div>
              <button className={`${tooltipClosed ? 'bg-gray-700 text-white' : 'bg-teal text-black'} hover:bg-purple hover:text-white  p-2 rounded-md pointer-events-auto`}
                onClick={() => setTooltipClosed(!tooltipClosed)}>
                <LuInfo className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute top-0 right-0 p-3">
              <div className={`p-2 rounded ${ ballIsReady ? 'bg-green-600' : 'bg-gray-700'}`}>
                      {
                        ballIsReady ? (
                          <FaCheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <FaArrowRotateRight className="w-6 h-6 text-white animate-spin" />
                        )
                      }
              </div>
            </div>


            <div className="absolute top-1/2 -translate-y-1/2 left-0 bg-black bg-opacity-50 py-2 rounded-r">
                <ul className="">
                  { gameState.map((level, index) => {
                      return (
                        <li key={index} className={`${ currentLevel === index + 1 ? 'text-black bg-white text-xl -mr-2 rounded-r' : 'text-white text-md'} p-2 pt-3`}>
                          <span className="relative -top-1">{ level.strokes }</span> / <span className="relative top-1">{ level.par }</span>
                        </li>
                      )
                  }) }
                </ul>
            </div>
          </div>
    )

}