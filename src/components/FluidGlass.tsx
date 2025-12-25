/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, memo } from 'react';
import type { ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import {
  useFBO,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text,
  Float
} from '@react-three/drei';
import { easing } from 'maath';

type Mode = 'lens' | 'bar' | 'cube';

interface NavItem {
  label: string;
  link: string;
}

type ModeProps = Record<string, unknown>;

interface FluidGlassProps {
  mode?: Mode;
  lensProps?: ModeProps;
  barProps?: ModeProps;
  cubeProps?: ModeProps;
}

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }: FluidGlassProps) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [],
    ...modeProps
  } = rawOverrides;

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
      <ScrollControls damping={0.2} pages={3} distance={0.4}>
        <Wrapper modeProps={modeProps}>
          <Scroll>
            <InternalContent />
          </Scroll>
          <Scroll html />
          <Preload />
        </Wrapper>
      </ScrollControls>
    </Canvas>
  );
}

// Internal Content to be refracted by the glass
// Replaces external images with code-generated geometry
function InternalContent() {
  const { width, height } = useThree((state) => state.viewport);
  return (
    <group>
      {/* Background Shapes */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-width * 0.2, 0, -2]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#ef4444" /> {/* Red */}
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[width * 0.2, height * 0.2, -4]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="#1e3a8a" /> {/* Blue */}
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
         <mesh position={[0, -height * 0.2, -3]}>
           <dodecahedronGeometry args={[1.2, 0]} />
           <meshBasicMaterial color="#0ea5e9" /> {/* Cyan */}
         </mesh>
      </Float>

      {/* Main Text */}
       <Text
        position={[0, 0, -1]}
        fontSize={1.5}
        color="#1e1b4b"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        ADVAITA
      </Text>
      
      <Text
        position={[0, -1.5, -1]}
        fontSize={0.6}
        color="#334155"
        anchorX="center"
        anchorY="middle"
      >
        2K25
      </Text>
    </group>
  );
}

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  geometryType: 'cylinder' | 'box'; 
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  geometryType,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if ((modeProps as { scale?: number }).scale == null) {
       ref.current.scale.setScalar(0.3);
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0xf8fafc, 1); // Slate-50 background for the glass content
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  return (
    <>
      {createPortal(children, scene)}
      {/* Invisible plane primarily for catching interaction if needed, kept transparency high */}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.3}
        rotation-x={Math.PI / 2}
        {...props}
      >
        {geometryType === 'cylinder' && <cylinderGeometry args={[1, 1, 0.4, 64]} />}
        {geometryType === 'box' && <boxGeometry args={[1, 1, 1]} />}
        
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.2}
          thickness={thickness ?? 3}
          anisotropy={anisotropy ?? 0.1}
          chromaticAberration={chromaticAberration ?? 0.04}
          roughness={0}
          {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return <ModeWrapper geometryType="cylinder" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }: { modeProps?: ModeProps } & MeshProps) {
  return <ModeWrapper geometryType="box" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }: { modeProps?: ModeProps } & MeshProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 2,
    ior: 1.1,
    color: '#ffffff',
  };

  return (
    <ModeWrapper
      geometryType="box"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}
