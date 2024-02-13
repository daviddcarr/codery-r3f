import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';

function FloatingImagePlane({ onClick, position, rotation, scale, imageTexture }) {
  // Load the texture
  const texture = useLoader(TextureLoader, imageTexture);

  // Ensure the texture has transparent background support
  texture.anisotropy = 16; // Optional for better quality
  texture.encoding = THREE.sRGBEncoding;

  return (
    <Plane
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
    >
      {/* Apply the texture */}
      <meshBasicMaterial attach="material" map={texture} transparent={true} />
    </Plane>
  );
}

export default FloatingImagePlane