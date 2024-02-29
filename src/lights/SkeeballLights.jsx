
const colors = {
    purple: 0x6a12e9, // hsl(265/360 0.74, 86%, 49%)
    red: 0xEC008C, // hsl(324/360 0.9, 100%, 46%)
    yellow: 0xffcc00, // hsl(48/360 0.134, 100%, 50%)
    blue: 0x21ffe1,
    white: 0xffffff,
    black: 0x000000,
    gray: 0x636363,
}


export default function SkeeballLights() {

    return (
        <>
            {/* Arm Lights */}
            <rectAreaLight
                color={colors.yellow}
                position={ [20, 0, -50] }
                intensity={ 30 }
                rotation={ [0, -Math.PI / 4, 0] }
                visible={ true }
                height={50}
                width={50}
                />

            <rectAreaLight
                color={colors.yellow}
                position={ [-20, 0, -50] }
                intensity={ 30 }
                rotation={ [0, Math.PI / 4, 0] }
                visible={ true }
                height={50}
                width={50}
                />

            <ambientLight intensity={0.5} />
            <directionalLight
                args={ [ colors.white, 1 ] }
                position={ [ 0, 10, 0 ] }
                intensity={ 0.5 }
                castShadow
                />
        </>
    )
}