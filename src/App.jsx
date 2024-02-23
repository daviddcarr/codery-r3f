import { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'

import Intro from './scenes/Intro'
import Skeeball from './scenes/Skeeball'
import SkeeballUI from './ui/SkeeballUI'
import MiniGolf from './scenes/MiniGolf'
import MiniGolfUI from './ui/MiniGolfUI'

import useCodery from './stores/useCodery'

function App() {

  const progress = useProgress()

  const [ 
    currentScene,
    setCurrentScene,
    isLoading, 
    setIsLoading 
  ] = useCodery((state) => [
      state.currentScene,
      state.setCurrentScene,
      state.isLoading,
      state.setIsLoading
  ])

  return (
    <div className='h-screen w-full'>
      { isLoading &&
       (
        <div className={`opacity-100 fixed z-50 w-full h-screen bg-black flex justify-center items-center `}>
          <div className="loading-container relative h-[300px] w-[300px]">
              <div className="loading-animation max-w-[300px] w-full bg-contain h-[300px] bg-no-repeat bg-center">
                  <img src="/gif/hello-loading.gif" width="300" height="300" alt='loading' />
              </div>
              <div className="loading-bar max-w-[300px] w-full h-[5px] bg-slate-500 rounded">
                  <div 
                    className={`loading-bar-inner h-[5px] bg-purple rounded`}
                    style={{ width: `${progress.loaded}%` }}
                    ></div>
              </div>
          </div>
      </div>
      )}
        <Suspense
          fallback={
            <div className={`opacity-100 fixed z-100 w-full h-screen bg-black flex justify-center items-center `}>
                <div className="loading-container relative h-[300px] w-[300px]">
                    <div className="loading-animation max-w-[300px] w-full bg-contain h-[300px] bg-no-repeat bg-center">
                        <img src="/gif/hello-loading.gif" width="300" height="300" alt='loading' />
                    </div>
                    <div className="loading-bar max-w-[300px] w-full h-[5px] bg-slate-500 rounded">
                        <div 
                          className={`loading-bar-inner h-[5px] bg-purple rounded`}
                          style={{ width: `${progress.loaded}%` }}
                          ></div>
                    </div>
                </div>
            </div>
          }
          >
          <Canvas
            key={currentScene}
            camera={ {
              fov: 75,
              near: 0.1,
              far: 1000,
              position: [0, 3, 10],
            } }
            shadows
            >
              { currentScene === 0 && <Intro setCurrentScene={ setCurrentScene } /> }
              { currentScene === 1 && <Skeeball setCurrentScene={ setCurrentScene } /> }
              { currentScene === 2 && <MiniGolf setCurrentScene={ setCurrentScene } /> }
          </Canvas>
          { currentScene === 1 && <SkeeballUI /> }
          { currentScene === 2 && <MiniGolfUI /> }


          {/* Back Button */}
          { currentScene !== 0 && (
            <div
              className={`opacity-100 absolute top-0 left-0 z-100 flex justify-center items-center p-3`}

              >
                <button className="p-3 pt-4 bg-white text-black transition-colors leading-none hover:bg-yellow" onClick={() => {
                  setCurrentScene(0)
                  setIsLoading(true)
                }}> Back </button>
            </div>
          )}
        </Suspense>

      </div>
  );
}

export default App;
