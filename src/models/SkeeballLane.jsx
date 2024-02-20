import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

import { useEffect } from 'react'


export default function SkeeballLane(props) {

    const lane = useGLTF('./gltf/Skeeball_Slide.glb')

    useEffect(() => {
        console.log(lane)
    }, [])

    return <>
        <RigidBody
            {...props}
            colliders="trimesh"
            type="fixed"
            >
            <mesh
                    geometry={lane.nodes.Slide.geometry}
                    material={lane.nodes.Slide.material}
                    receiveShadow
                    castShadow
                    />
        </RigidBody>
    </>
}