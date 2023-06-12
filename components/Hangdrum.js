import React from 'react';
import { useGLTF } from '@react-three/drei';
import A from './sounds/1.mp3';
import B from './sounds/2.mp3';
import C from './sounds/3.mp3';
import D from './sounds/4.mp3';
import E from './sounds/5.mp3';
import F from './sounds/6.mp3';
import G from './sounds/7.mp3';
import H from './sounds/8.mp3';
import I from './sounds/9.mp3';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/hangdrum.glb');

  async function createAudio(sound) {
    const buffer = Buffer.from(sound, 'base64').buffer;
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createBufferSource();
    source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res));
    source.loop = false;
    // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
    // which makes it too awkward for a little demo since you need to load the async data first
    // source.connect(context.destination);
    return { source, context, buffer };
  }

  async function playSound(track) {
    const { source, context } = await createAudio(track);
    source.connect(context.destination);

    source.start(0);
    source.onended = function () {
      source.disconnect(context.destination);
    };
  }

  return (
    <group {...props} dispose={null} scale={[5, 5, 5]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.defaultMaterial.geometry} material={materials.handpan} />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound(I)}
        geometry={nodes.Point_A.geometry}
        material={nodes.Point_A.material}
        position={[-0.07, 0.14, 0.62]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound(H)}
        geometry={nodes.Point_B.geometry}
        material={nodes.Point_B.material}
        position={[0.38, 0.12, 0.54]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound(G)}
        geometry={nodes.Point_C.geometry}
        material={nodes.Point_C.material}
        position={[0.66, 0.11, 0.2]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound(F)}
        geometry={nodes.Point_D.geometry}
        material={nodes.Point_D.material}
        position={[0.67, 0.09, -0.23]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound(E)}
        geometry={nodes.Point_E.geometry}
        material={nodes.Point_E.material}
        position={[0.4, 0.11, -0.55]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound(D)}
        geometry={nodes.Point_F.geometry}
        material={nodes.Point_F.material}
        position={[-0.04, 0.13, -0.63]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound(C)}
        geometry={nodes.Point_G.geometry}
        material={nodes.Point_G.material}
        position={[-0.47, 0.17, -0.32]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound(B)}
        geometry={nodes.Point_H.geometry}
        material={nodes.Point_H.material}
        position={[-0.51, 0.17, 0.25]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound(A)}
        geometry={nodes.Point_I.geometry}
        material={nodes.Point_I.material}
        position={[0.07, 0.35, 0]}
        scale={0.16}
      />
    </group>
  );
}

useGLTF.preload('/models/hangdrum.glb');
