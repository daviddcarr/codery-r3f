import { useEffect } from 'react'

import { useGLTF } from '@react-three/drei'
import { Group } from 'three'

export default function Colosseum(props) {
    const colosseum = useGLTF('./gltf/mini-golf/Colosseum.glb')

    useEffect(() => {
        console.log(colosseum.nodes)
    }, [colosseum])

    return (
        // <primitive
        //     object={colosseum.scene}
        //     {...props}
        //     />

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