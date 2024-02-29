import { useGLTF } from '@react-three/drei'

export default function StatueHand(props) {
    const statueHand = useGLTF('./gltf/mini-golf/Statue_hand_lo.glb')

    return (
        <group
            {...props} 
            >
            <mesh
                geometry={statueHand.nodes.statue_hand_lo.geometry}
                material={statueHand.nodes.statue_hand_lo.material}
                />
        </group>
    )
}