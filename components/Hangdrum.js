import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
// import { AudioLoader } from 'three';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/models/hangdrum.glb');
  const [tracks, setTracks] = useState({});

  async function createAudio(url) {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createBufferSource();
    source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res));
    source.loop = false;
    // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
    // which makes it too awkward for a little demo since you need to load the async data first
    // source.connect(context.destination);
    return { source, context, buffer };
  }

  useEffect(() => {
    (async () => {
      const sounds = [
        './sounds/1.mp3',
        './sounds/2.mp3',
        './sounds/3.mp3',
        './sounds/4.mp3',
        './sounds/5.mp3',
        './sounds/6.mp3',
        './sounds/7.mp3',
        './sounds/8.mp3'
      ];
      for await (const sound of sounds) {
        const audio = await createAudio(sound);
        tracks[sound] = audio;
      }
    })();
  }, []);

  async function playSound(track) {
    // const audio = new Audio();
    // audio.src = `./sounds/${track}`;
    // audio.play();

    const { source, context } = await createAudio(track)
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
        onClick={() => playSound('./sounds/9.mp3')}
        
        geometry={nodes.Point_A.geometry}
        material={nodes.Point_A.material}
        position={[-0.07, 0.14, 0.62]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound('./sounds/8.mp3')}
        geometry={nodes.Point_B.geometry}
        material={nodes.Point_B.material}
        position={[0.38, 0.12, 0.54]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound('./sounds/7.mp3')}
        geometry={nodes.Point_C.geometry}
        material={nodes.Point_C.material}
        position={[0.66, 0.11, 0.2]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound('./sounds/6.mp3')}
        geometry={nodes.Point_D.geometry}
        material={nodes.Point_D.material}
        position={[0.67, 0.09, -0.23]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound('./sounds/5.mp3')}
        geometry={nodes.Point_E.geometry}
        material={nodes.Point_E.material}
        position={[0.4, 0.11, -0.55]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound('./sounds/4.mp3')}
        geometry={nodes.Point_F.geometry}
        material={nodes.Point_F.material}
        position={[-0.04, 0.13, -0.63]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound('./sounds/3.mp3')}
        geometry={nodes.Point_G.geometry}
        material={nodes.Point_G.material}
        position={[-0.47, 0.17, -0.32]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound('./sounds/2.mp3')}
        geometry={nodes.Point_H.geometry}
        material={nodes.Point_H.material}
        position={[-0.51, 0.17, 0.25]}
        scale={0.12}
      />
      <mesh
        castShadow
        receiveShadow
        visible={false}
        onClick={() => playSound('./sounds/1.mp3')}
        geometry={nodes.Point_I.geometry}
        material={nodes.Point_I.material}
        position={[0.07, 0.35, 0]}
        scale={0.16}
      />
    </group>
  );
}

useGLTF.preload('/models/hangdrum.glb');
