/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useGLTF, useAnimations, PerspectiveCamera, useHelper, OrbitControls } from '@react-three/drei';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing';

export default function Model({ scroll, ...props }) {
  const group = useRef();
  const target = useRef();
  const lightRef = useRef();
  

  useHelper(lightRef, THREE.DirectionalLightHelper, 'red');

  const { nodes, materials, animations } = useGLTF('/spiral_scroll_e.glb');
  const { actions } = useAnimations(animations, group);
  const [hovered, set] = useState();

  const extras = { receiveShadow: true, castShadow: true, 'material-envMapIntensity': 0.2 };

  useEffect(() => void (actions['CameraAction.005'].play().paused = true), []);
  useEffect(() => {
    if (hovered) {
      group.current.getObjectByName(hovered).material.color.set('white');
      target.current = nodes[hovered];
    }
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame((state) => {
    actions['CameraAction.005'].time = THREE.MathUtils.lerp(
      actions['CameraAction.005'].time,
      actions['CameraAction.005'].getClip().duration * scroll.current,
      0.05
    );

    group.current.children[0].children.forEach((child, index) => {
      if (child instanceof THREE.Mesh) {
        // child.material.color.lerp(
        //   color.set(hovered === child.name ? 'pink' : '#202020').convertSRGBToLinear()
        //   hovered ? 0.1 : 0.05
        // );
        child.layers.enable(3);
        child.material.color.set('#202020');
        // child.geometry.computeVertexNormals(true)
        // child.geometry.shading = THREE.SmoothShading;

        const et = state.clock.elapsedTime;


        if (child.name == 'Icosphere') {
          child.rotateY(et / 10000);
          return;
        }


        child.position.y = Math.sin((et + index * 2000) / 2) * 0.5;

        if (child.name == 'Cone') {
          child.position.y = Math.sin((et + index * 2000) / 2) * 0.5 - 15;
        }

        if (child.name == 'Suzanne') {
          child.position.y = Math.sin((et + index * 2000) / 2) * 0.5 - 10;
        }

        if (child.name == 'Diamond') {
          child.position.y = Math.sin((et + index * 2000) / 2) * 0.5 - 10;
        }        

        child.rotation.x = Math.sin((et + index * 2000) / 3) / 100;
        child.rotation.y = Math.cos((et + index * 2000) / 2) / 100;
        child.rotation.z = Math.sin((et + index * 2000) / 3) / 100;

        
      }
    });
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        onPointerOver={(e) => (e.stopPropagation(), set(e.object.name))}
        onPointerOut={(e) => (e.stopPropagation(), set(null))}
        // {...useHover()}
        position={[0.06, 4.04, 0.35]}
        scale={[0.25, 0.25, 0.25]}>
        <mesh name="Diamond" scale={[3.5, 3.5, 3.5]} geometry={nodes.Diamond.geometry} material={materials.Diamond} {...extras} />
        <mesh name="Notebook" geometry={nodes.Notebook.geometry} material={materials.M_Notebook} {...extras} />
        <mesh name="Rocket003" geometry={nodes.Rocket003.geometry} material={materials.M_Rocket} {...extras} />
        <mesh
          name="Cone"
          scale={[4, 4, 4]}
          geometry={nodes.Cone.geometry}
          material={materials.Cone}
          // position={[0, -15, 0]}
          rotateX={120}
          {...extras}
        />
        <mesh
          name="Suzanne"
          scale={[3.5, 3.5, 3.5]}
          geometry={nodes.Suzanne.geometry}
          material={materials.Suzanne}
          // position={[0, -10, 0]}
          {...extras}
        />
        <mesh name="VR_Headset" geometry={nodes.VR_Headset.geometry} material={materials.M_Headset} {...extras} />
        <mesh name="Icosphere" position={[-10, 80, 0]} scale={[5, 5, 5]} geometry={nodes.Icosphere.geometry} material={materials.Icosphere} v  />

        {/* <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor="white" edgeStrength={10} width={1000} selection={target} selectionLayer={3} />
        </EffectComposer> */}
      </group>
      <group name="Camera" position={[-1.78, 2.04, 15.58]} rotation={[1.62, 0.01, 0.11]}>
        {/* <OrbitControls
          camera={camera}
          maxDistance={500}
          minDistance={0.01}
          minZoom={1}
          rotation={[0, 180, 0]}
          maxPolarAngle={Math.PI / 2}
        /> */}
        <PerspectiveCamera makeDefault far={100} near={0.1} fov={28} rotation={[-Math.PI / 2, 0, 0]}>
          <pointLight position={[35, -20, -20]} color={0xffffff} intensity={1} />
          <pointLight position={[10, 10, 0]} color={0xff00ff} intensity={2} />
          <pointLight position={[-10, 10, 0]} color={0x00ffff} intensity={2} />
          <directionalLight
            castShadow
            position={[10, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={2}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
      </group>
    </group>
  );
}

useGLTF.preload('/model.glb');
