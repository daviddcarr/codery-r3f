import { useGLTF } from '@react-three/drei'

export default function Colosseum(props) {
    const colosseum = useGLTF('./gltf/mini-golf/Colosseum.glb')

    return (
        <primitive
            object={colosseum.scene}
            {...props}
            />
    )
}