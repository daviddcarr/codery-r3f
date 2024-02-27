import {
    useRef,
    useState,
    useMemo
} from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import {
    useGLTF
} from "@react-three/drei"
import { 
    RigidBody,
} from "@react-three/rapier"

import useSkeeballGame from '../../stores/useSkeeballGame'

export default function SkeeballPlayer(props) {

    const player = useRef()
    const playerObject = useRef()
    const [ isStatic, setIsStatic ] = useState(true)

    // Reset Bezier Points
    const endPoint = useMemo(() => new THREE.Vector3(0, 2.01, 2), []) 
    
    const [
        addPlayerAttempt,
        gameEnded
    ] = useSkeeballGame((state) => [
        state.addPlayerAttempt,
        state.gameEnded
    ])
    
    // Camera smoothing states
    const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(10, 10, 10) )
    const [ smoothedCameraTarget ] = useState(() => new THREE.Vector3() )
    const [resetAnimation, setResetAnimation] = useState({
        active: false, 
        progress: 0
    })
    const [lastCameraPosition, setLastCameraPosition] = useState(new THREE.Vector3())
    
    const playerModel = useGLTF('./gltf/Skeeball_VenusHead.glb')

    const quadraticBezier = (p0, p1, p2, t) => {
        const p3 = p0.lerp(p1, t)
        const p4 = p1.lerp(p2, t)
        const p5 = p3.lerp(p4, t)
        return p5
    }

    useFrame(({ camera, pointer }, delta) => {
        if (! props.debug) {
            
            /**
             * Player Choosing Start Position
             */
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
    
            /**
             * Reset Camera to Start
             */
            if (resetAnimation.active) {
                const progress = resetAnimation.progress + delta * 0.5
                if (progress < 1) {
                    // Find the point halfway between lastCameraPosition and endPoint
                    const controlPoint = lastCameraPosition.clone().lerp(endPoint, 0.5)
                    controlPoint.y = 5
                    
                    camera.position.copy(quadraticBezier(lastCameraPosition.clone(), controlPoint.clone(), endPoint.clone(), progress))
                    setResetAnimation({active: true, progress})
                } else {
                    console.log("Reset Animation Complete")
                    setResetAnimation({active: false, progress: 0})
                    setLastCameraPosition(new THREE.Vector3())
                
                    smoothedCameraPosition.copy(camera.position);
                    smoothedCameraTarget.copy(cameraTarget);
                }

            } 
            /**
             * Follow Camera
             */
            else {
                smoothedCameraPosition.lerp( cameraPosition, 5 * delta )
                smoothedCameraTarget.lerp( cameraTarget, 5 * delta )
        
                camera.position.copy( smoothedCameraPosition )
                camera.lookAt( smoothedCameraTarget )
            }
    
            /**
             * Detect Player Reset
             */
            // if player position goes below -15, reset the player to static and move it back to the start
            if (player.current.translation().y < -50) {
                setIsStatic(true)
                addPlayerAttempt()
                props.resetFunction()
                setLastCameraPosition(cameraPosition)
                setResetAnimation({active: true, progress: 0})
                console.log("Player Reset, Start Animation")
            }
            
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
                <mesh
                    onPointerUp={ !gameEnded && Launch }
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