import { Suspense, useState } from 'react'

import { Canvas } from '@react-three/fiber'

import Intro from './scenes/Intro'
import Skeeball from './scenes/Skeeball'
import SkeeballUI from './ui/SkeeballUI'

function App() {

  const [ currentScene, setCurrentScene ] = useState(0)

  return (
    <div className='h-screen w-full'>
        <Suspense
          fallback={
            <div className={`opacity-100 fixed z-50 w-full h-screen bg-black flex justify-center items-center `}>
                <div className="loading-container relative h-[300px] w-[300px]">
                    <div className="loading-animation max-w-[300px] w-full bg-contain h-[300px] bg-no-repeat bg-center">
                        <img src="/gif/hello-loading.gif" width="300" height="300" alt='loading' />
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
          </Canvas>
          { currentScene === 1 && <SkeeballUI /> }

          {/* Back Button */}
          { currentScene !== 0 && (
            <div
              className={`opacity-100 absolute top-0 left-0 z-100 flex justify-center items-center p-3`}
        
              >
                <button className="p-3 bg-white text-black" onClick={() => setCurrentScene(0)}> Back </button>
            </div>
          )}
        </Suspense>

      </div>
  );
}

export default App;
