const colors = {
    purple: 0x6a12e9, // hsl(265/360 0.74, 86%, 49%)
    red: 0xEC008C, // hsl(324/360 0.9, 100%, 46%)
    yellow: 0xffcc00, // hsl(48/360 0.134, 100%, 50%)
    blue: 0x21ffe1,
    white: 0xffffff,
    black: 0x000000,
    gray: 0x636363,
}


export default function MiniGolfLights() {
    return (
        <>
            {/* Arm Lights */}
            <rectAreaLight
                color={colors.red}
                position={ [14, 5, -10] }
                intensity={ 10 }
                rotation={ [1, Math.PI * 0.6, 0] }
                visible={ true }
                height={10}
                width={10}
                />
            <rectAreaLight
                color={colors.purple}
                position={ [6, 5, -5] }
                intensity={ 10 }
                rotation={ [-1, -1, 0] }
                visible={ true }
                height={10}
                width={10}
                />


            {/* Soldier Head Lights */}
            <rectAreaLight
                color={colors.yellow}
                position={ [-15, 5, 10] }
                intensity={ 10 }
                rotation={ [-1, 0, 0] }
                visible={ true }
                height={10}
                width={10}
                />
            <rectAreaLight
                color={colors.purple}
                position={ [-10, 5, 0] }
                intensity={ 10 }
                rotation={ [1, Math.PI * 0.75, 0] }
                visible={ true }
                height={10}
                width={10}
                />
            <directionalLight 
                position={[2, 2, 2]} 
                intensity={1} 
                shadow-mapSize={[1024, 1024]}
                castShadow 
                />
        </>
    )
}