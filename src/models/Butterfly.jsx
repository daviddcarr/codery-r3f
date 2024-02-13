import { useEffect } from 'react'
import { 
    useGLTF,
    useAnimations,
} from '@react-three/drei'

export default function Butterfly(props) {

    const butterfly = useGLTF('./gltf/Butterfly.gltf')
    const animations = useAnimations( butterfly.animations, butterfly.scene )

    useEffect( () => {
        const action = animations.actions[ "KeyAction" ]
        action.reset().fadeIn(0.5).play()

        return () => {
            action.fadeOut(0.5)
        }
    }, [animations.actions] )

    return (
        <primitive object={butterfly.scene} {...props} />
    )
}