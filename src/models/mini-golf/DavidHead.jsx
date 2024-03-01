import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function DavidHead(props) {
    const davidHead = useGLTF('./gltf/mini-golf/David_head.glb')

    useEffect(() => {
        console.log(davidHead)
    }, [davidHead])

    return (
        <group
            {...props} 
            >
            <mesh
                geometry={davidHead.nodes.Medium001.geometry}
                material={davidHead.nodes.Medium001.material}
                />
        </group>
    )
}