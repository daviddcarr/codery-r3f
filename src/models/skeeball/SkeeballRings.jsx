import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import {
    useGLTF,
} from '@react-three/drei'
import {
    RigidBody,
    CylinderCollider
} from '@react-three/rapier'

const defaultColor = '#FFFFFF'
const succesColor = '#6a12e9'


export default function SkeeballRings({ position, rotation, scale, collisionFunction, hasScored }) {


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
                hasScored={hasScored}
                />
            <RingLarge
                position={[0, -5, -3]}
                rotation={[(Math.PI * 0.06), 0, 0]}
                parentPosition={position}
                collisionFunction={collisionFunction}
                animated={true}
                hasScored={hasScored}
                />
            <RingMedium
                // position={[0, -2, -3]}
                position={[0, -1.24, -3]}
                rotation={[(Math.PI * 0.12), 0, 0]}
                parentPosition={position}
                collisionFunction={collisionFunction}
                animated={true}
                hasScored={hasScored}
                />
            <RingSmallest
                position={[0, 0.5, -1]}
                rotation={[(Math.PI * 0.18), 0, 0]}
                parentPosition={position}
                collisionFunction={collisionFunction}
                animated={true}
                hasScored={hasScored}
                />
        </group>
    )
}


function RingLargest({position, parentPosition, rotation, collisionFunction, animated, hasScored}) {
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

    const [materialColor, setMaterialColor] = useState(defaultColor)

    const handleCollision = () => {
        if (hasScored) { return }
        collisionFunction(10)

        setMaterialColor(succesColor)

        setTimeout(() => {
            setMaterialColor(defaultColor)
        }, 3000)
    }

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
                <mesh
                    geometry={ ringLargest.nodes.Ring_Largest.geometry }
                    >
                    <meshStandardMaterial
                        color={ materialColor }
                        attach="material"
                        />
                </mesh>
                <CylinderCollider
                    onIntersectionEnter={ () => { 
                        handleCollision()
                    } }
                    position={ [0, -1, 0] }
                    args={ [1, 13.2 ] }
                    sensor
                    />
            </RigidBody>
        </group>
    )
}

function RingLarge({position, parentPosition, rotation, collisionFunction, animated, hasScored}) {
    const ringLarge = useGLTF('./gltf/Skeeball_RingLarge.glb')

    const ringLargeRef = useRef()

    useEffect(() => {
        console.log(ringLarge)
    }, [])

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

    const [materialColor, setMaterialColor] = useState(defaultColor)

    const handleCollision = () => {
        if (hasScored) { return }
        collisionFunction(25)

        setMaterialColor(succesColor)

        setTimeout(() => {
            setMaterialColor(defaultColor)
        }, 3000)
    }

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
                <mesh
                    geometry={ ringLarge.nodes.Ring_Large.geometry }
                    >
                    <meshStandardMaterial
                        color={ materialColor }
                        attach="material"
                        />
                </mesh>
                <CylinderCollider
                    onIntersectionEnter={ () => {
                        handleCollision()
                    } }
                    position={ [0, -1, 0] }
                    args={ [0.5, 7.3, 5 ] }
                    sensor
                    />
            </RigidBody>
        </group>
    )
}

function RingMedium({position, parentPosition, rotation, collisionFunction, animated, hasScored}) {
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

    const [materialColor, setMaterialColor] = useState(defaultColor)

    const handleCollision = () => {
        if (hasScored) { return }
        collisionFunction(50)

        setMaterialColor(succesColor)

        setTimeout(() => {
            setMaterialColor(defaultColor)
        }, 3000)
    }

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
                <mesh
                    geometry={ ringMedium.nodes.Ring_Medium.geometry }
                    >
                    <meshStandardMaterial
                        color={ materialColor }
                        attach="material"
                        />
                </mesh>
                <CylinderCollider
                    onIntersectionEnter={ () => {
                        handleCollision()
                    } }
                    position={ [0, -1, 0] }
                    args={ [0.5, 3.7, 5 ] }
                    sensor
                    />
            </RigidBody>
        </group>
    )
}

function RingSmallest({position, parentPosition, rotation, collisionFunction, animated, hasScored}) {
    const ringSmall = useGLTF('./gltf/Skeeball_RingSmallest.glb')

    useEffect(() => {
        console.log(ringSmall)
    }, [])

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

    const [materialColor, setMaterialColor] = useState(defaultColor)

    const handleCollision = () => {
        if (hasScored) { return }
        collisionFunction(100)

        setMaterialColor(succesColor)

        setTimeout(() => {
            setMaterialColor(defaultColor)
        }, 3000)
    }

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
                <mesh
                    geometry={ ringSmall.nodes.Ring_Smallest.geometry }
                    >
                    <meshStandardMaterial
                        color={ materialColor }
                        attach="material"
                        />
                </mesh>
                <CylinderCollider
                    onIntersectionEnter={ () => {
                        handleCollision()
                    } }
                    position={ [0, -1, 0] }
                    args={ [0.5, 1.6, 5 ] }
                    sensor
                    />
            </RigidBody>
        </group>
    )
}

