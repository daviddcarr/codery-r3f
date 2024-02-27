import * as THREE from 'three'
import { useState, useRef, createRef, useEffect } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, shaderMaterial } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { Physics } from '@react-three/rapier'
import { useMiniGolfGame } from '../stores/useMiniGolfGame'
import useCodery from '../stores/useCodery'

import Course from '../models/mini-golf/Courses'
// import Colosseum from '../models/mini-golf/Colosseum'
import SoldierHead from '../models/mini-golf/SoldierHead'

import waveVertexShader from '../shaders/waves/vertex.glsl'
import waveFragmentShader from '../shaders/waves/fragment.glsl'

const oceanPlanes = [
  {
    position: [0, 0, 0],
    args: [50, 50, 2000, 2000]
  },
  {
    position: [1, 0, 0],
    args: [50, 50, 500, 500]
  },
  {
    position: [1, 0, 1],
    args: [50, 50, 500, 500]
  },
  {
    position: [0, 0, 1],
    args: [50, 50, 2000, 2000]
  },
  {
    position: [-1, 0, 1],
    args: [50, 50, 500, 500]
  },
  {
    position: [-1, 0, 0],
    args: [50, 50, 500, 500]
  },
  {
    position: [-1, 0, -1],
    args: [50, 50, 500, 500]
  },
  {
    position: [0, 0, -1],
    args: [50, 50, 2000, 2000]
  },
  {
    position: [1, 0, -1],
    args: [50, 50, 500, 500]
  }
]

export default function MiniGolf() {

  const [ 
    setIsLoading 
  ] = useCodery((state) => [
      state.setIsLoading
  ])

    const [ 
        cameraMode, 
        gamePaused,
        currentLevel        
      ] = useMiniGolfGame((state) => [ 
        state.cameraMode,
        state.gamePaused,
        state.currentLevel
      ])

    const debugObject = {}
    debugObject.depthColor = '#151c37'
    debugObject.surfaceColor = '#545c6c'

    const [ orbitTarget, setOrbitTarget ] = useState([0, 0, 0])
    const [ cameraFollowPosition, setCameraFollowPosition ] = useState([0.25, 0.25, 0])
    
    const WaveMaterial = shaderMaterial(
        {
            uTime: 0,
            uColor: new THREE.Color("black"),
            uSmallWavesElevation: 0.1,
            uSmallWavesFrequency: 1.0,
            uSmallWavesSpeed: 0.2,
            uSmallIterations: 2,
            uBigWavesElevation: 0.2,
            uBigWavesFrequency: new THREE.Vector2(1.2, 0.5),
            uBigWavesSpeed: 0.75,
            uDepthColor: new THREE.Color('#04050a'),
            uSurfaceColor: new THREE.Color('#222324'),
            uColorOffset: 0.925,
            uColorMultiplier: 1

        },
        waveVertexShader,
        waveFragmentShader
    )

    const waveMaterials = useRef([])

    waveMaterials.current = oceanPlanes.map((oceanPlane, index) => waveMaterials.current[index] ?? createRef())

    useFrame((state) => {

        waveMaterials.current.forEach((material) => {
            material.current.uTime = state.clock.elapsedTime
        })

    })

    extend({ WaveMaterial })
    
    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        <>

            {/* <fog 
              attach="fog" 
              args={["black", 1, 30]} 
              /> */}
            <color 
              attach="background" 
              args={["black"]} 
              />
            <Environment 
              files={"hdri/green_sanctuary_1k.hdr"}
              />

            <directionalLight 
              position={[2, 2, 2]} 
              intensity={1} 
              shadow-mapSize={[1024, 1024]}
              castShadow 
              />

            <EffectComposer>
              <DepthOfField
                focusDistance={0}
                focalLength={0.05}
                bokehScale={5}
                />
            </EffectComposer>

            <OrbitControls 
              makeDefault 
              enabled={cameraMode === 'free' && gamePaused} 
              target={orbitTarget}
              maxDistance={15}
              maxZoom={5}
              />

            <Physics
              timeSet="vary"
              paused={gamePaused}
              >

              <Course 
                number={currentLevel} 
                setOrbitTarget={setOrbitTarget} 
                cameraFollowPosition={cameraFollowPosition} 
                setCameraFollowPosition={setCameraFollowPosition} />

            </Physics>


            <SoldierHead
              position={[-15, 0, 5]}
              scale={[0.08, 0.08, 0.08]}
              rotation={[0, Math.PI / 3, 0]}
              />

            {/* Ocean Plane */}

            {
              oceanPlanes.map((oceanPlane, index) => {
                
                const updatedPosition = new THREE.Vector3(oceanPlane.position[0] * 50, oceanPlane.position[1] - 2.2, oceanPlane.position[2] * 50)

                return (
                  <mesh
                    key={index}
                    position={updatedPosition}
                    rotation={[-Math.PI / 2, 0, 0]}
                    >
                    <planeGeometry args={oceanPlane.args} />
                    <waveMaterial ref={waveMaterials.current[index]} />
                  </mesh>
                )
            })
            }

        </>
    )
}