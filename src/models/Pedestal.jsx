import { useGLTF } from '@react-three/drei'

export default function Pedestal(props) {

    const pedestal = useGLTF('./gltf/Pedestal.gltf')

    return (
        <primitive
            object={pedestal.scene}
            {...props}
            />
    )
}