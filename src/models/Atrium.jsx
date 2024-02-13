import { useGLTF } from "@react-three/drei"

export default function Atrium(props) {
    
    const atrium = useGLTF('./gltf/Atrium.gltf')

    return (
        <primitive
            object={atrium.scene}
            {...props}
            />
    )
}