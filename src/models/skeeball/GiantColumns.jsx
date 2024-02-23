import { useGLTF } from '@react-three/drei'

export default function GiantColumns(props) {
    const columns = useGLTF('./gltf/Skeeball_Columns.glb')

    return (
        <primitive
            object={columns.scene}
            {...props}
            />
    )
}