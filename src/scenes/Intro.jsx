import { useRef } from 'react'
import * as THREE from 'three'
import {
    useFrame,
    extend
} from '@react-three/fiber'
import { 
    OrbitControls,
    useHelper,
    Float,
    Effects,
    Plane
} from "@react-three/drei"
import {
    EffectComposer,
    Bloom
} from '@react-three/postprocessing'
import {
    UnrealBloomPass
} from 'three-stdlib'
import { useControls } from 'leva'

import Atrium from '../models/Atrium'
import VenusAnimated from '../models/VenusAnimated'
import Pedestal from '../models/Pedestal'
import IntroLights from '../lights/IntroLights'
import Butterfly from '../models/Butterfly'
import Flower from '../models/Flower'
import Geometry from '../models/Geometry'
import { Header, Body, Footer } from '../models/HeaderBodyFooter'
import CoderyLogo from '../models/CoderyLogo'
import FloatingImagePlane from '../models/FloatingImagePlane'


extend({ UnrealBloomPass })

export default function Intro({ setCurrentScene }) {

    const butterfly = useRef()
    const geometry = useRef()

    const flower = useRef()
    const flowerParent = useRef()
    const flowerGrandparent = useRef()

    // Animation
    useFrame( (state, delta) => {

        butterfly.current.rotation.y += 1 * delta
        butterfly.current.position.y = Math.sin( state.clock.elapsedTime ) + 5

        geometry.current.rotation.y += 0.3 * delta
        geometry.current.position.y = Math.sin( state.clock.elapsedTime / 2 ) + 5

        flowerGrandparent.current.position.y = Math.sin( state.clock.elapsedTime / 1.8 ) + 1.5
        flowerGrandparent.current.rotation.y += 0.3 * delta

        flowerParent.current.rotation.y -= 1 * delta
        flower.current.rotation.y += 0.5 * delta

    } )
    
    return (
        <>
            {/* Controls */}
            <OrbitControls
                target={ [ 0, 3, 0 ] }
                enableDamping
                autoRotate={ false }
                minDistance={ 5 }
                maxDistance={ 15 }
                enablePan={ false }
                />

            {/* Environment / Effects */}
            <IntroLights />
            <fog attach="fog" args={["black", 10, 120]} />
            <color attach="background" args={["black"]} />
            <Effects disableGamma>
                <unrealBloomPass
                    threshold={ 0.42 }
                    strength={ 0.25 }
                    radius={ 0.12 }
                    bloomFactor={ 1.2 }
                    />
            </Effects>

            {/* Models */}
            <CoderyLogo 
                position={ [ 0, 8.6, -1 ] }
                rotation={ [ Math.PI * 0.5, 0, 0 ] }
                scale={ 3.5 }
                />
            <VenusAnimated position-y={ -3 }/>
            <Pedestal position-y={ -3 } />

            <group
                ref={ butterfly }
                position={ [ 0, 3, 0 ] }
                >
                <Butterfly
                    position={ [ 3, 0, 0 ] }
                    />
            </group>

            <group
                ref={ flowerGrandparent }
                position={ [ 0, 1, 0 ] }
                >
                <group
                    ref={ flowerParent }
                    position={ [ - 4, 0, 0] }
                    >
                    <group
                        ref={ flower }
                        rotation-x={ Math.PI * 0.2 }
                        >
                        <Flower
                            scale={ 0.7 }
                            position={ [ 0, 0, 0 ] }
                            />
                    </group>
                </group>
            </group>

            <group
                ref={ geometry }
                position={ [ 0, 5, 0 ] }
                >
                <Geometry
                    position={ [ - 4.5, - 1, 0 ] }
                    />
            </group>

            <Float>
                <Header 
                    rotation-x={ Math.PI * 0.5 }
                    scale={ 0.7 }
                    position={ [ - 3, 6.56, 0 ] }
                    />
            </Float>

            <Float>
                <Body
                    rotation-x={ Math.PI * 0.5 }
                    scale={ 0.7 }
                    position={ [ 1.16, 5.08, 1.65 ] }
                    />
            </Float>

            <Float>
                <Footer
                    rotation-x={ Math.PI * 0.5 }
                    scale={ 0.7 }
                    position={ [ - 3.52, 2.88, -0.82 ] }
                    />
            </Float>


            {/* Floating Clickable Image for Skeeball Scene */}
            <Float
                floatingRange={ [ 0.5, 2 ] }
                speed={ 0.5 }
                rotationIntensity={ 0.1 }
                floatIntensity={ 0.5 }
                >
                {/* Plane Geometry */}
                {/* <Plane
                    position={ [ 30, 10, -30 ] }
                    rotation={ [ 0, - Math.PI / 4, 0 ] }
                    scale={ 15 }
                    onClick={ () => { setCurrentScene(1) } }
                    >
                    <meshBasicMaterial color="hotpink" />
                </Plane> */}
                <FloatingImagePlane
                    position={ [ 30, 10, -30 ] }
                    rotation={ [ 0, - Math.PI / 4, 0 ] }
                    scale={ 15 }
                    imageTexture="/heads-will-roll.png"
                    onClick={ () => { setCurrentScene(1) } }
                    />
            </Float>

            <Atrium position-y={ -20 } />
            
        </>
    )
}