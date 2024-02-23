import { useGLTF } from '@react-three/drei'

export default function SoldierHead(props) {
    const colosseum = useGLTF('./gltf/mini-golf/Soldier_Head.glb')

    return (
        <group
            {...props} 
            >
            <mesh
                geometry={colosseum.nodes.SoldierHead.geometry}
                material={colosseum.nodes.SoldierHead.material}
                />
        </group>
    )
}