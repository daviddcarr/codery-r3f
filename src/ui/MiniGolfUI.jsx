import { useMiniGolfGame } from "../stores/useMiniGolfGame"

import { useState } from 'react'

export default function SkeeballUI() {

    const [ 
        cameraMode, 
        toggleCameraMode, 
        currentLevel,
        gameState
      ] = useMiniGolfGame((state) => [ 
        state.cameraMode,
        state.toggleCameraMode, 
        state.currentLevel,
        state.gameState
      ])

    const [ modeSwitched, setModeSwitched ] = useState(false)
    

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="flex justify-between absolute bottom-0 w-full p-4 items-center">
              <button
                className="bg-gray-700 hover:bg-purple-600 text-white p-2 rounded-md pointer-events-auto"
                onClick={() => {
                  toggleCameraMode()
                  setModeSwitched(true)
                }}
                >
                {cameraMode === 'free' ? 'Play Mode' : 'Pause (Free Camera)'}
              </button>
              { !modeSwitched && <div className="bg-blue-400 text-white p-2 rounded-md">
                <p><strong>Tip:</strong> Click and drag on the ball in Play Mode to start!</p>
              </div> }
              <div className="bg-white p-2 rounded-md">
                <p className="text-black">Stroke Count: { gameState[currentLevel-1].strokes }</p>
              </div>
            </div>


            <div className="absolute top-1/2 -translate-y-1/2 left-0 bg-black bg-opacity-50 py-2 rounded-r">
                <ul className="">
                  { gameState.map((level, index) => {
                      return (
                        <li key={index} className={`${ currentLevel === index + 1 ? 'text-black bg-white text-xl -mr-2 rounded-r' : 'text-white text-md'} p-2`}>
                          <span className="relative -top-1">{ level.strokes }</span> / <span className="relative top-1">{ level.par }</span>
                        </li>
                      )
                  }) }
                </ul>
            </div>
          </div>
    )

}