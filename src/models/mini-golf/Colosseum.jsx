import { useEffect } from 'react'

import { useGLTF } from '@react-three/drei'

export default function Colosseum(props) {
    const colosseum = useGLTF('./gltf/mini-golf/Colosseum.glb')

    return (
        <group
            {...props} 
            >
            <mesh
                geometry={colosseum.nodes.MiddleTier001.geometry}
                material={colosseum.nodes.MiddleTier001.material}
                />
            <mesh
                geometry={colosseum.nodes.TopTier001.geometry}
                material={colosseum.nodes.TopTier001.material}
                />
            <mesh
                geometry={colosseum.nodes.OuterWall001.geometry}
                material={colosseum.nodes.OuterWall001.material}
                />
        </group>
    )
}