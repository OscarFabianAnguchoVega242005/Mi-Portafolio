'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07010F);
    scene.fog = new THREE.Fog(0x12041f, 10, 70);

    const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 160);
    camera.position.set(0, 2.3, 0);

    // Buildings
    for (const s of [-1, 1]) for (let i = 0; i < 20; i++) {
      const w = Math.random() * 3 + 4;
      const h = Math.random() * 26 + 12;
      const d = Math.random() * 1.5 + 3;
      const m = new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.8 });
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      b.position.set(s * (6 + w / 2 + Math.random() * 1.2), h / 2, -i * 3.1 - Math.random() * 1);
      scene.add(b);
    }

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 220).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0x07010f, transparent: true, opacity: 0.8, depthWrite: false })
    );
    floor.position.set(0, 0.01, -90);
    scene.add(floor);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(5, 10, 7);
    scene.add(ambientLight, dirLight);

    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="three-canvas" className="fixed inset-0 -z-10" />;
}

export default ThreeScene;