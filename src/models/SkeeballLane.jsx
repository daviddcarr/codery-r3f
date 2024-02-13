import * as THREE from 'three'

import { useGLTF } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 )

const boxMaterial = new THREE.MeshStandardMaterial( { color: "red" } )

export default function SkeeballLane(props) {

    const length = props.length || 10
    const width = props.width || 4

    const lane = useGLTF('./gltf/Skeeball_Slide.glb')

    return <>
        <RigidBody
            {...props}
            colliders="trimesh"
            type="fixed"
            castshadow
            >
            <primitive 
                object={ lane.scene }
                />
        </RigidBody>
    </>
}