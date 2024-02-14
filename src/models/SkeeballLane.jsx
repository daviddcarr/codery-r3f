import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'


export default function SkeeballLane(props) {

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