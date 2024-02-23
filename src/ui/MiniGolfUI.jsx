import { useMiniGolfGame } from "../stores/useMiniGolfGame"

import { GiPauseButton, GiPlayButton } from 'react-icons/gi'
import { LuRotate3D, LuFocus } from "react-icons/lu";

import { useState } from 'react'

export default function SkeeballUI() {

    const [ 
        cameraMode, 
        toggleCameraMode,
        gamePaused,
        setGamePaused,
        toggleGamePaused,
        currentLevel,
        gameState
      ] = useMiniGolfGame((state) => [ 
        state.cameraMode,
        state.toggleCameraMode,
        state.gamePaused,
        state.setGamePaused,
        state.toggleGamePaused,
        state.currentLevel,
        state.gameState
      ])

    const [ tooltipClosed, setTooltipClosed ] = useState(false)
    

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">


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
              { !tooltipClosed && <div className="bg-blue-400 text-white p-2 rounded-md">
                <p><strong>Tip:</strong> Click and drag on the ball in Play Mode to start!</p>
              </div> }
              <div className="bg-white p-2 pt-3 rounded-md">
                <p className="text-black">Stroke Count: { gameState[currentLevel-1].strokes }</p>
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