import * as THREE from "three"
import { useThree } from "@react-three/fiber"

const colors = {
    purple: 0x6a12e9, // hsl(265/360 0.74, 86%, 49%)
    red: 0xEC008C, // hsl(324/360 0.9, 100%, 46%)
    yellow: 0xffcc00, // hsl(48/360 0.134, 100%, 50%)
    blue: 0x21ffe1,
    white: 0xffffff,
    black: 0x000000,
    gray: 0x636363,
}


export default function IntroLights() {

    const scene = useThree().scene

    const spotlightTarget = new THREE.Object3D()
    spotlightTarget.position.set(0, 40, 0)
    scene.add(spotlightTarget)

    return (
        <>
            <spotLight
                args={ [ colors.white, 3, 150, 2.5, 1, 1 ] }
                position={ [ 0, 10, 0 ] }
                target={ spotlightTarget }
                />

            <rectAreaLight
                color={colors.red}
                position={ [ 10, 5, 0 ] }
                intensity={ 10 }
                rotation={ [ 0,  Math.PI / 2, 0 ] }
                visible={ true }
                height={10}
                width={10}
                />
            <rectAreaLight
                color={colors.yellow}
                position={ [ - 10, 5, 0 ] }
                intensity={ 10 }
                rotation={ [ 0, - Math.PI / 2, 0 ] }
                visible={ true }
                height={10}
                width={10}
                />
        </>
    )
}