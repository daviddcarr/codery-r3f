import { useGLTF } from "@react-three/drei"

export default function Flower(props) {
    const flower = useGLTF('./gltf/Flower.gltf')

    return (
        <primitive
            object={flower.scene}
            {...props}
            />
    )
}
