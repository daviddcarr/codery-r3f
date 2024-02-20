import { useState } from 'react'
import {
    OrbitControls,
    Effects,
    Environment
} from '@react-three/drei'
import {
    Physics
} from '@react-three/rapier'

import SkeeballLights from '../lights/SkeeballLights'
import SkeeballLane from '../models/SkeeballLane'
import SkeeballObstacle from '../models/SkeeballObstacle'
import SkeeballPlayer from '../models/SkeeballPlayer'
import SkeeballRings from '../models/SkeeballRings'
import GiantColumns from '../models/GiantColumns'

import useSkeeballGame from '../stores/useSkeeballGame'

const debug = false
const debugCameraPos = [0, -30, -90]


export default function Skeeball() {

    const [ hasScored, setHasScored ] = useState(false)
    const [ score, setScore ] = useState(0)

    const addToPlayerScore = useSkeeballGame((state) => state.addToPlayerScore)

    const updateScore = (value) => {
        if (!hasScored) {
            console.log('updateScore ' + (score + value))
            setScore(score + value)
            setHasScored(true)

            addToPlayerScore(value)
        }
    }

    const resetHasScored = () => {
        setHasScored(false)
    }

    return <>

        {/* Controls */}
        { debug && <OrbitControls
            makeDefault
            enableDamping
            autoRotate={ false }
            target={ debugCameraPos }
            /> }

        {/* Environment / Effects */}
        <SkeeballLights />
        <fog attach="fog" args={["black", 10, 90]} />
        <color attach="background" args={["black"]} />
        <Effects disableGamma>
            <unrealBloomPass
                threshold={ 0.42 }
                strength={ 0.05 }
                radius={ 0.12 }
                bloomFactor={ 1 }
                />
        </Effects>

        <Environment files={"/hdri/empty_warehouse_01_4k.hdr"} />

        <Physics>
            {/* { debug && <Debug /> } */}
            <SkeeballLane
                restitution={ 0.2 }
                friction={ 0.8 }
                scale={ 2 }
                />
            <SkeeballPlayer
                position={ [ 0, 0.5, 0 ] }
                debug={ debug }
                restitution={ 0.2 }
                friction={ 0.8 }
                resetFunction={ resetHasScored }
                />

            <GiantColumns />


            {/*
            ** Animated Goal Rings
            */}
            <SkeeballRings
                position={ [ 0, -29, - 90 ] }
                rotation={ [ Math.PI * 0.15, 0, 0 ] }
                collisionFunction={ updateScore }
                />


            {/* 
            ** Animated Obastacles
            */}
            <SkeeballObstacle
                animated={ true }
                range={ 2 }
                speed={ 1 }
                position={ [ 0, -2.85, -12 ] }
                rotation={[(Math.PI * -0.018), 0, 0]}
                />
            <SkeeballObstacle
                animated={ true }
                range={ 3.5 }
                speed={ 1.5 }
                position={ [ 0, -5.35, -27 ] }
                rotation={[(Math.PI * -0.14), 0, 0]}
                />

            <SkeeballObstacle
                animated={ true }
                range={ 1.75 }
                speed={ 1.5 }
                position={ [ 2.2, -13.9, -37 ] }
                rotation={[(Math.PI * -0.27), 0, 0]}
                offset={ Math.PI }
                />
             <SkeeballObstacle
                animated={ true }
                range={ 1.75 }
                speed={ 1.5 }
                position={ [ - 2.2, -13.9, -37 ] }
                rotation={[(Math.PI * -0.27), 0, 0]}
                offset={ Math.PI / 3 }
                />
            
            <SkeeballObstacle
                animated={ true }
                range={ 5 }
                speed={ 2 }
                position={ [ 0, -22.3, -45 ] }
                rotation={[(Math.PI * -0.225), 0, 0]}
                />
        </Physics>

    </>
}