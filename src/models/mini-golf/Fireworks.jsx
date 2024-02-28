import * as THREE from 'three'
import gsap from 'gsap'

import { useMemo, useEffect, forwardRef, useImperativeHandle, useRef } from "react"

import { useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

import fireworkVertexShader from '../../shaders/firework/vertex.glsl'
import fireworkFragmentShader from '../../shaders/firework/fragment.glsl'

import fireworkTrailVertexShader from '../../shaders/firework-trail/vertex.glsl'
import fireworkTrailFragmentShader from '../../shaders/firework-trail/fragment.glsl'


const Fireworks = forwardRef(({ position }, ref) => {

    const { scene } = useThree()

    const sizes = useMemo(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)
    }), [])

    // Detect if window is resized
    useEffect(() => {
        const handleResize = () => {
            const pixelRatio = Math.min(window.devicePixelRatio, 2)

            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            sizes.pixelRatio = pixelRatio

            sizes.resolution.x = window.innerWidth * pixelRatio
            sizes.resolution.y = window.innerHeight * pixelRatio
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const textures = useMemo(() => {
        return [
            new THREE.TextureLoader().load('./particles/1.png'),
            new THREE.TextureLoader().load('./particles/2.png'),
            new THREE.TextureLoader().load('./particles/3.png'),
            new THREE.TextureLoader().load('./particles/4.png'),
            new THREE.TextureLoader().load('./particles/5.png'),
            new THREE.TextureLoader().load('./particles/6.png'),
            new THREE.TextureLoader().load('./particles/7.png'),
            new THREE.TextureLoader().load('./particles/8.png'),
        ]
    }, [])

    const createFirework = (count, position, size, texture, radius, color) => {
        const positionsArray = new Float32Array(count * 3)
        const sizesArray = new Float32Array(count)
        const timeMultipliersArray = new Float32Array(count)

        // Check Bruno's code. For some reason I multiplied the count by 3
        for ( let i = 0; i < count; i++ )
        {
            const i3 = i * 3

            // Mathematical Way To Distribute Points On A Sphere
            const randomDirection = new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize()

            const adjustedRadius = (0.75 + Math.random() * 0.25) * radius

            positionsArray[i3 + 0] = randomDirection.x * adjustedRadius
            positionsArray[i3 + 1] = randomDirection.y * adjustedRadius
            positionsArray[i3 + 2] = randomDirection.z * adjustedRadius

            // Three.js Way To Distribute Points On A Sphere
            // const spherical = new THREE.Spherical(
            //     radius,
            //     Math.random() * Math.PI,
            //     Math.random() * Math.PI * 2
            // )
            // const position = new THREE.Vector3()
            // position.setFromSpherical(spherical)

            // positionsArray[i3    ] = position.x
            // positionsArray[i3 + 1] = position.y
            // positionsArray[i3 + 2] = position.z

            sizesArray[i] = Math.random()

            timeMultipliersArray[i] = 1 + Math.random()
        }

        // Geometry
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
        geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))
        geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1))

        // Material
        texture.flipY = false
        const material = new THREE.ShaderMaterial({
            vertexShader: fireworkVertexShader,
            fragmentShader: fireworkFragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms:
            {
                uProgress: new THREE.Uniform(0),
                uSize: new THREE.Uniform(size),
                uResolution: new THREE.Uniform(sizes.resolution),
                uTexture: new THREE.Uniform(texture),
                uColor: new THREE.Uniform(color),
                uCenterPosition: new THREE.Uniform(position),
            },
        })

        // Points
        const firework = new THREE.Points(geometry, material)

        const offsetPosition = new THREE.Vector3(
            position.x - (radius * 0.5),
            position.y,
            position.z
        )

        firework.position.copy(position)
        scene.add(firework)

        // Destroy
        const destroy = () =>
        {
            scene.remove(firework)
            geometry.dispose()
            material.dispose()
        }


        // Animate
        gsap.to(
            material.uniforms.uProgress,
            { value: 1, duration: 1.5, ease: 'linear', onComplete: destroy },
        )
    }

    const createRandomFireWork = (position, texture, color) =>
    {
        const count = Math.round(400 + Math.random() * 1000)
        const size = 0.05 + Math.random() * 0.05
        const radius = 0.05 + Math.random()

        createFirework(count, position, size, texture, radius, color)

    }

    const createTrail = (origin, texture, color) => {
        console.log(origin)

        const position = new THREE.Vector3((Math.random() - 0.5 * 0.25) + origin.x, 1, (Math.random() - 0.5 * 0.25) + origin.z)
   

        // Get a random point on the line between origin and position
        // Get direction vector from origin to position
        const direction = new THREE.Vector3()
        direction.subVectors(position, origin)
        // Get a random point on the line
        const apexPosition = 0.5 + (Math.random() * 0.5)
        direction.multiplyScalar(apexPosition)

        // Add a random Y value to the direction to get an apex
        const apex = new THREE.Vector3()
        apex.addVectors(origin, direction)
        apex.y += 1 + Math.random() * 2

        const positionArray = new Float32Array(3)

        // set target position
        positionArray[0] = position.x
        positionArray[1] = position.y
        positionArray[2] = position.z

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3))
        geometry.setAttribute('aSize', new THREE.Float32BufferAttribute([Math.random()], 1))
        geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute([1 + Math.random()], 1))


        texture.flipY = false
        const material = new THREE.ShaderMaterial({
            vertexShader: fireworkTrailVertexShader,
            fragmentShader: fireworkTrailFragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms:
            {
                uProgress: new THREE.Uniform(0),
                uSize: new THREE.Uniform(0.15),
                uResolution: new THREE.Uniform(sizes.resolution),
                uTexture: new THREE.Uniform(texture),
                uColor: new THREE.Uniform(color),
                uOrigin: new THREE.Uniform(origin),
                uApex: new THREE.Uniform(apex),
                uApexPosition: new THREE.Uniform(apexPosition),
            },
        })

        const trail = new THREE.Points(geometry, material)
        trail.position.copy(position)
        scene.add(trail)

        // Destroy
        const destroy = () =>
        {
            scene.remove(trail)
            geometry.dispose()
            material.dispose()
            createRandomFireWork(
                position,
                texture,
                color
            )
        }

        // Animate
        gsap.to(
            material.uniforms.uProgress,
            { value: 1, duration: 1.5, ease: 'linear', onComplete: destroy },
        )
    }

    const launchFirework = (origin) => {
        const texture = textures[Math.floor(Math.random() * textures.length)]
        const color = new THREE.Color()
        color.setHSL(Math.random(), 1, 0.7)
        createTrail(origin, texture, color)
    }

    useImperativeHandle(ref, () => ({
        launchFirework
    }))

    return null

})

Fireworks.displayName = 'Fireworks'
export default Fireworks
