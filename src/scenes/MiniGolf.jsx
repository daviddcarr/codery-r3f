import * as THREE from 'three'
import { useState, useRef, useEffect } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, shaderMaterial } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { Physics } from '@react-three/rapier'
import { useMiniGolfGame } from '../stores/useMiniGolfGame'

import { useControls } from "leva"

import Course from '../models/mini-golf/Courses'
import Colosseum from '../models/mini-golf/Colosseum'

import waveVertexShader from '../shaders/waves/vertex.glsl'
import waveFragmentShader from '../shaders/waves/fragment.glsl'


export default function MiniGolf() {

    const [ 
        cameraMode, 
        currentLevel,
      ] = useMiniGolfGame((state) => [ 
        state.cameraMode,
        state.currentLevel,
      ])

    const debugObject = {}
    debugObject.depthColor = '#151c37'
    debugObject.surfaceColor = '#545c6c'

    const [ orbitTarget, setOrbitTarget ] = useState([0, 0, 0])
    const [ cameraFollowPosition, setCameraFollowPosition ] = useState([0.25, 0.25, 0])

    const {
      smallWavesElevation,
      smallWavesFrequency,
      smallWavesSpeed,
      smallIterations,
      bigWavesElevation,
      bigWavesFrequency,
      bigWavesSpeed,
      depthColor,
      surfaceColor,
      colorOffset,
      colorMultiplier
    } = useControls({
      smallWavesElevation: { value: 0.15, min: 0, max: 1, step: 0.1 },
      smallWavesFrequency: { value: 0.2, min: 1, max: 10, step: 0.1 },
      smallWavesSpeed: { value: 0.2, min: 0, max: 2, step: 0.1 },
      smallIterations: { value: 2, min: 1, max: 20, step: 1 },
      bigWavesElevation: { value: 0.2, min: 0, max: 1, step: 0.1 },
      bigWavesFrequency: new THREE.Vector2(1.2, 0.5),
      bigWavesSpeed: { value: 0.75, min: 0, max: 2, step: 0.1 },
      depthColor: '#04050a',
      surfaceColor: '#222324',
      colorOffset: { value: 0.925, min: 0, max: 2, step: 0.001 },
      colorMultiplier: { value: 1, min: 0, max: 5, step: 0.1 }
    })
    
    const WaveMaterial = shaderMaterial(
        {
            uTime: 0,
            uColor: new THREE.Color("black"),
            uSmallWavesElevation: smallWavesElevation,
            uSmallWavesFrequency: smallWavesFrequency,
            uSmallWavesSpeed: smallWavesSpeed,
            uSmallIterations: smallIterations,
            uBigWavesElevation: bigWavesElevation,
            uBigWavesFrequency: bigWavesFrequency,
            uBigWavesSpeed: bigWavesSpeed,
            uDepthColor: new THREE.Color(depthColor),
            uSurfaceColor: new THREE.Color(surfaceColor),
            uColorOffset: colorOffset,
            uColorMultiplier: colorMultiplier

        },
        waveVertexShader,
        waveFragmentShader
    )

    const waveMaterial = useRef()

    useEffect(() => {
        waveMaterial.uSmallWavesElevation = smallWavesElevation
        waveMaterial.uSmallWavesFrequency = smallWavesFrequency
        waveMaterial.uSmallWavesSpeed = smallWavesSpeed
        waveMaterial.uSmallIterations = smallIterations
        waveMaterial.uBigWavesElevation = bigWavesElevation
        waveMaterial.uBigWavesFrequency = bigWavesFrequency
        waveMaterial.uBigWavesSpeed = bigWavesSpeed
        waveMaterial.uDepthColor = new THREE.Color(depthColor)
        waveMaterial.uSurfaceColor = new THREE.Color(surfaceColor)
        waveMaterial.uColorOffset = colorOffset
        waveMaterial.uColorMultiplier = colorMultiplier
    }, [waveMaterial, smallWavesElevation, smallWavesFrequency, smallWavesSpeed, smallIterations, bigWavesElevation, bigWavesFrequency, bigWavesSpeed, depthColor, surfaceColor, colorOffset, colorMultiplier])

    useFrame((state, delta) => {
        waveMaterial.current.uTime += delta
    })

    extend({ WaveMaterial })
    
    return (
        <>

            {/* <Sky sunPosition={[2, 2, 2]} /> */}
            <fog 
              attach="fog" 
              args={["black", 1, 50]} 
              />
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

            <Colosseum
              position={[0, -2, 0]}
              />

            {/* Ocean Plane */}
            <mesh 
              position={[0, -1, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              >
              <planeGeometry args={[50, 50, 2000, 2000]} />
              <waveMaterial ref={waveMaterial} />
            </mesh>

            

        </>
    )
}