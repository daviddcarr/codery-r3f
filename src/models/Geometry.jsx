import { useGLTF } from "@react-three/drei"

export default function Geometry(props) {
    const geometry = useGLTF('./gltf/Geometry.gltf')

    return (
        <primitive
            object={geometry.scene}
            {...props}
            />
    )
}