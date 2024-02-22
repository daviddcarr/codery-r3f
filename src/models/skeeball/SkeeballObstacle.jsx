import {
    useRef,
    useState
} from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function SkeeballObstacle({ range, speed, animated, position, rotation, offset }) {

    const obstacleRef = useRef()

    const [ timeOffset ] = useState(Math.random() * Math.PI * 2)

    const obstacle = useGLTF('./gltf/Skeeball_Obstacle.glb')

    useFrame(( state ) => {
        if (obstacleRef.current && animated) {
            const time = state.clock.getElapsedTime()

            offset = offset || timeOffset

            const x = Math.sin((time + offset) * speed) * range

            obstacleRef.current.setNextKinematicTranslation( {
                x: position[0] + x,
                y: position[1],
                z: position[2]
            } )
        }
    })

    return (
        <>
            <group
                position={ position }
                rotation={ rotation }
                >
                <RigidBody
                    ref={ obstacleRef }
                    type="kinematicPosition"
                    colliders="trimesh"
                    scale={2.5}

                    restitution={ 0.2 }
                    friction={ 0 }
                    >
                    <mesh
                        geometry={ obstacle.nodes.Obstacle.geometry }
                        material={ obstacle.nodes.Obstacle.material }
                        />
                </RigidBody>
            </group>
        </>
    )
}