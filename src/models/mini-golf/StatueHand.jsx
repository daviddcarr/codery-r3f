import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function StatueHand(props) {
    const statueHand = useGLTF('./gltf/mini-golf/Statue_hand_lo.glb')

    useEffect(() => {
        console.log(statueHand)
    }, [statueHand])

    return (
        <group
            {...props} 
            >
            <mesh
                geometry={statueHand.nodes.Discobolus_Medium001.geometry}
                material={statueHand.nodes.Discobolus_Medium001.material}
                />
        </group>
    )
}