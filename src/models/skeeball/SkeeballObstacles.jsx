import {
    useRef,
    useState
} from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'


export default function SkeeballObstacles() {
    
    return (
        <>
            <FirstObstacle 
                range={ 2 }
                speed={ 1 }
                />
            <SecondObstacle
                range={ 3.5 }
                speed={ 1.5 }
                />
        </>
    )
}

export function FirstObstacle({ range, speed }) {

    const obstacle = useGLTF('./gltf/Skeeball_Obstacle.glb')

    const ref = useRef()
    const pos = [ 0, -2.85, -12 ]
    const rotation = [(Math.PI * -0.018), 0, 0]

    const [ timeOffset ] = useState(Math.random() * Math.PI * 2)

    useFrame(( state ) => {
        if (ref.current) {
            const time = state.clock.getElapsedTime()

            const x = Math.sin((time + timeOffset) * speed) * range

            ref.current.setNextKinematicTranslation( {
                x: pos[0] + x,
                y: -2.85,
                z: -12
            } )
        }
    })

    console.log("first obstacle")
    console.log( pos )

    return (
        <RigidBody
            ref={ ref }
            colliders="trimesh"
            type="kinematicPosition"
            scale={2.5}
            position={ pos }
            rotation={ rotation }
            restitution={ 0.2 }
            friction={ 0 }
            >
            <primitive
                object={obstacle.scene}
                />
        </RigidBody>
    )
}

export function SecondObstacle({ range, speed }) {

    const secondObstacle = useGLTF('./gltf/Skeeball_Obstacle_2.glb')

    const secondRef = useRef()
    const position = [ 0, -5.35, -27 ]
    const rotation = [(Math.PI * -0.14), 0, 0]

    console.log("second obstacle")
    console.log( position )

    const [ timeOffset ] = useState(Math.random() * Math.PI * 2)

    useFrame(( state ) => {
        if ( secondRef.current) {
            const time = state.clock.getElapsedTime()

            const x = Math.sin((time + timeOffset) * speed) * range

            secondRef.current.setNextKinematicTranslation( {
                x: x,
                y: -5.35,
                z: -27
            } )
        }
    })

    return (
        <RigidBody
            ref={ secondRef }
            type="kinematicPosition"
            colliders="trimesh"
            scale={2.5}
            position={ position }
            rotation={ rotation }
            restitution={ 0.2 }
            friction={ 0 }
            >
            <primitive
                object={secondObstacle.scene}
                />
        </RigidBody>
    )
}