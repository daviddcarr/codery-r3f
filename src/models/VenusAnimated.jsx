import { useEffect } from 'react'
import { 
    useGLTF,
    useAnimations,
} from '@react-three/drei'

export default function VenusAnimated(props) {
    const venus = useGLTF('./gltf/Venus_Marble.gltf')
    const animations = useAnimations( venus.animations, venus.scene )

    useEffect( () => {
        const action = animations.actions[ "AnimationFloat" ]
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [animations.actions] )

    return (
        <primitive 
            object={venus.scene} 
            {...props}
            />
    )

}