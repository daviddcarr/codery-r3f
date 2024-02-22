import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
    useGLTF,
} from '@react-three/drei'
import {
    RigidBody,
    CylinderCollider
} from '@react-three/rapier'


export default function SkeeballRings({ position, rotation, scale, collisionFunction }) {


    return (
        <group
            position={ position }
            rotation={ rotation }
            scale={ scale }
            >
            <RingLargest
                position={[0, -8, 0]}
                rotation={[0, 0, 0]}
                parentPosition={position}
                collisionFunction={collisionFunction}
                animated={false}
                />
            <RingLarge
                position={[0, -5, -3]}
                rotation={[(Math.PI * 0.06), 0, 0]}
                parentPosition={position}
                collisionFunction={collisionFunction}
                animated={true}
                />
            <RingMedium
                // position={[0, -2, -3]}
                position={[0, -1.24, -3]}
                rotation={[(Math.PI * 0.12), 0, 0]}
                parentPosition={position}
                collisionFunction={collisionFunction}
                animated={true}
                />
            <RingSmallest
                position={[0, 0.5, -1]}
                rotation={[(Math.PI * 0.18), 0, 0]}
                parentPosition={position}
                collisionFunction={collisionFunction}
                animated={true}
                />
        </group>
    )
}


function RingLargest({position, parentPosition, rotation, collisionFunction, animated}) {
    const ringLargest = useGLTF('./gltf/Skeeball_RingLargest.glb')

    const ringLargestRef = useRef()

    useFrame(( state ) => {
        if (ringLargestRef.current && animated) {
            const time = state.clock.getElapsedTime()

            const speed = 1
            const range = 1

            const x = Math.sin((time * speed) * range)

            const nextTranslation = {
                x: parentPosition[0] + position[0] + x,
                y: parentPosition[1] + position[1],
                z: parentPosition[2] + position[2]
            }

            ringLargestRef.current.setNextKinematicTranslation( nextTranslation )
        }
    })

    return (
        <group
            position={ position }
            rotation={ rotation }
            >
            <RigidBody
                type="kinematicPosition"
                colliders="trimesh"
                ref={ ringLargestRef }
                >
                <primitive
                    object={ringLargest.scene}
                    />
                <CylinderCollider
                    onIntersectionEnter={ () => { 
                        collisionFunction(10)
                    } }
                    position={ [0, -1, 0] }
                    args={ [1, 13.2 ] }
                    sensor
                    />
            </RigidBody>
        </group>
    )
}

function RingLarge({position, parentPosition, rotation, collisionFunction, animated}) {
    const ringLarge = useGLTF('./gltf/Skeeball_RingLarge.glb')

    const ringLargeRef = useRef()

    const speed = 0.5
    const range = 3
    const offset = Math.PI * (Math.random() * 2)

    useFrame(( state ) => {
        if (ringLargeRef.current && animated) {
            const time = state.clock.getElapsedTime()


            const x = Math.sin(((time + offset) * speed)) * range

            const nextTranslation = {
                x: parentPosition[0] + position[0] + x,
                y: parentPosition[1] + position[1],
                z: parentPosition[2] + position[2]
            }

            ringLargeRef.current.setNextKinematicTranslation( nextTranslation )
        }
    })

    return (
        <group
            position={ position }
            rotation={ rotation }
            >
            <RigidBody
                type="kinematicPosition"
                colliders="trimesh"
                ref={ ringLargeRef }
                >
                <primitive
                    object={ringLarge.scene}
                    />
                <CylinderCollider
                    onIntersectionEnter={ () => {
                        collisionFunction(25)
                    } }
                    position={ [0, -1, 0] }
                    args={ [0.5, 7.3, 5 ] }
                    sensor
                    />
            </RigidBody>
        </group>
    )
}

function RingMedium({position, parentPosition, rotation, collisionFunction, animated}) {
    const ringMedium = useGLTF('./gltf/Skeeball_RingMedium.glb')

    const ringMediumRef = useRef()

    const speed = 1
    const range = 2
    const offset = Math.PI * (Math.random() * 2)

    useFrame(( state ) => {
        if (ringMediumRef.current && animated) {
            const time = state.clock.getElapsedTime()


            const x = Math.sin(((time + offset) * speed)) * range

            const nextTranslation = {
                x: parentPosition[0] + position[0] + x,
                y: parentPosition[1] + position[1],
                z: parentPosition[2] + position[2]
            }

            ringMediumRef.current.setNextKinematicTranslation( nextTranslation )
        }
    })

    return (
        <group
            position={ position }
            rotation={ rotation }
            >
            <RigidBody
                type="kinematicPosition"
                colliders="trimesh"
                ref={ ringMediumRef }
                >
                <primitive
                    object={ringMedium.scene}
                    />
                <CylinderCollider
                    onIntersectionEnter={ () => {
                        collisionFunction(50)
                    } }
                    position={ [0, -1, 0] }
                    args={ [0.5, 3.7, 5 ] }
                    sensor
                    />
            </RigidBody>
        </group>
    )
}

function RingSmallest({position, parentPosition, rotation, collisionFunction, animated}) {
    const ringSmall = useGLTF('./gltf/Skeeball_RingSmallest.glb')

    const ringSmallRef = useRef()

    const speed = 1.5
    const range = 2.5
    const offset = Math.PI * (Math.random() * 2)

    useFrame(( state ) => {
        if (ringSmallRef.current && animated) {
            const time = state.clock.getElapsedTime()


            const x = Math.sin(((time + offset) * speed)) * range

            const nextTranslation = {
                x: parentPosition[0] + position[0] + x,
                y: parentPosition[1] + position[1],
                z: parentPosition[2] + position[2]
            }

            ringSmallRef.current.setNextKinematicTranslation( nextTranslation )
        }
    })

    return (
        <group
            position={ position }
            rotation={ rotation }
            >
            <RigidBody
                type="kinematicPosition"
                colliders="trimesh"
                ref={ ringSmallRef }
                >
                <primitive
                    object={ringSmall.scene}
                    />
                <CylinderCollider
                    onIntersectionEnter={ () => {
                        collisionFunction(100)
                    } }
                    position={ [0, -1, 0] }
                    args={ [0.5, 1.6, 5 ] }
                    sensor
                    />
            </RigidBody>
        </group>
    )
}

