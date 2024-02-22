import {
    useRef,
    useState
} from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import {
    useGLTF
} from "@react-three/drei"
import { 
    RigidBody,
} from "@react-three/rapier"

export default function SkeeballPlayer(props) {

    const player = useRef()
    const playerObject = useRef()
    const [ isStatic, setIsStatic ] = useState(true)

    // Camera smoothing states
    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10) )
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3() )
    
    const playerModel = useGLTF('./gltf/Skeeball_VenusHead.glb')

    useFrame(({ camera, pointer }, delta) => {
        
        if ( ! props.debug ) {
            if ( isStatic ) {
                if (player.current) {
                    const range = 2
                    const mouseRange = 1.38
                    const x = (pointer.x * mouseRange) * range
                    const xClamped = Math.min(Math.max(x, - range), range)
                    
                    player.current.setTranslation({
                        x: xClamped,
                        y: 0.1,
                        z: 0
                    })
                }
            }

            /**
             * Camera
             */
            const playerPosition = player.current.translation()
    
            const cameraPosition = new THREE.Vector3()
            cameraPosition.copy( playerPosition )
            cameraPosition.z += 2
            cameraPosition.y += 2
            cameraPosition.x = isStatic ? 0 : cameraPosition.x
    
            const cameraTarget = new THREE.Vector3()
            cameraTarget.copy( playerPosition )
            cameraTarget.y += 0.25
            cameraTarget.x = isStatic ? 0 : cameraTarget.x
    
            smoothedCameraPosition.lerp( cameraPosition, 5 * delta )
            smoothedCameraTarget.lerp( cameraTarget, 5 * delta )
    
            camera.position.copy( smoothedCameraPosition )
            camera.lookAt( smoothedCameraTarget )
        }

        // if player position goes below -15, reset the player to static and move it back to the start
        if (player.current.translation().y < -50) {
            setIsStatic(true)
            props.resetFunction()
            player.current.setTranslation({
                x: 0,
                y: 0.1,
                z: 0
            })
        }
        
    })

    const Launch = () => {
        setIsStatic(false)
    }


    return (
        <>
            <RigidBody
                ref={player}
                {...props}
                type={isStatic ? "fixed" : ""}
                colliders="ball"
                >
                {/* <primitive
                    object={ playerModel.scene }
                    castShadow={true}
                    /> */}
                <mesh
                    onPointerUp={ Launch }
                    geometry={playerModel.nodes.VenusHead.geometry}
                    material={playerModel.nodes.VenusHead.material}
                    receiveShadow
                    castShadow
                    scale={ 1.3 }
                    ref={playerObject}
                    />
            </RigidBody>
        </>
    )
}