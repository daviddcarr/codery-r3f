import { useState } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import { useMiniGolfGame } from '../stores/useMiniGolfGame'

import Course from '../models/mini-golf/Courses'


export default function MiniGolf({ setCurrentScene }) {

    const [ 
        cameraMode, 
        currentLevel,
      ] = useMiniGolfGame((state) => [ 
        state.cameraMode,
        state.currentLevel,
      ])

    const [ orbitTarget, setOrbitTarget ] = useState([0, 0, 0])
    const [ cameraFollowPosition, setCameraFollowPosition ] = useState([0.25, 0.25, 0])
    
    
    return (
        <>

            {/* <Sky sunPosition={[2, 2, 2]} /> */}
            <fog attach="fog" args={["black", 1, 20]} />
            <color attach="background" args={["black"]} />
            <Environment 
              files={"hdri/green_sanctuary_1k.hdr"}
              />
            <directionalLight 
              position={[2, 2, 2]} 
              intensity={1} 
              castShadow 
              />

            <OrbitControls 
              makeDefault 
              enabled={cameraMode === 'free'} 
              target={orbitTarget}
              />

            <Physics
              timeSet="vary"
              paused={cameraMode === 'free'}
              >

              <Course 
                number={currentLevel} 
                setOrbitTarget={setOrbitTarget} 
                cameraFollowPosition={cameraFollowPosition} 
                setCameraFollowPosition={setCameraFollowPosition} />

            </Physics>

        </>
    )
}