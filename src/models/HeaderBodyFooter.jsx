import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

const colors = {
    purple: 0x6a12e9, // hsl(265/360 0.74, 86%, 49%)
    red: 0xEC008C, // hsl(324/360 0.9, 100%, 46%)
    yellow: 0xffcc00, // hsl(48/360 0.134, 100%, 50%)
    blue: 0x21ffe1,
    white: 0xffffff,
    black: 0x000000,
    gray: 0x636363,
}

const textMaterial = new THREE.MeshStandardMaterial({ color: colors.white, emissive: colors.gray })

export default function HeaderBodyFooter(props) {

    return (
        <>
            <Header {...props} />
            <Body {...props} />
            <Footer {...props} />
        </>
    )
}

export function Header(props) {

    const header = useGLTF('./gltf/Text_header.gltf')

    return (
        <mesh
            geometry={header.scene.children[0].geometry}
            material={textMaterial}
            {...props}
            />
    )
}

export function Body(props) {
    
    const body = useGLTF('./gltf/Text_body.gltf')

    return (
        <mesh
            geometry={body.scene.children[0].geometry}
            material={textMaterial}
            {...props}
            />
    )
}

export function Footer(props) {
    
    const footer = useGLTF('./gltf/Text_footer.gltf')

    return (
        <mesh
            geometry={footer.scene.children[0].geometry}
            material={textMaterial}
            {...props}
            />
    )
}
