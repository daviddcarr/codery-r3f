import * as THREE from "three"
import { useGLTF } from "@react-three/drei"

const logoMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff })

export default function CoderyLogo(props) {

    const coderyLogo = useGLTF('./gltf/Codery_logo_2023.gltf')

    return (
        <mesh
            geometry={coderyLogo.nodes.Curve007.geometry}
            material={logoMaterial}
            {...props}
            />
    )
}