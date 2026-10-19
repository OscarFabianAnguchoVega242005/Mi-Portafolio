import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x6366f1, 1.2);
    directionalLight.position.set(10, 15, 10);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00d4aa, 0.8, 50);
    pointLight1.position.set(-10, 10, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff2bd6, 0.5, 50);
    pointLight2.position.set(15, -5, 10);
    scene.add(pointLight2);

    // Floating geometric shapes
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.DodecahedronGeometry(1, 0),
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.6,
        roughness: 0.2,
        flatShading: true,
      }),
          new THREE.MeshStandardMaterial({
        color: 0x00d4aa,
            metalness: 0.7,
            roughness: 0.15,
            flatShading: true,
      }),
          new THREE.MeshStandardMaterial({
            color: 0xff2bd6,
            metalness: 0.5,
            roughness: 0.3,
            flatShading: true,
      }),
          new THREE.MeshStandardMaterial({
            color: 0xffc83d,
            metalness: 0.8,
            roughness: 0.1,
            flatShading: true,
          }),
        ];

    const meshes: THREE.Mesh[] = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.x = (Math.random() - 0.5) * 50;
      mesh.position.y = (Math.random() - 0.5) * 40;
      mesh.position.z = (Math.random() - 0.5) * 40;

      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.z = Math.random() * Math.PI * 2;

      const scale = Math.random() * 1.5 + 0.3;
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        originalY: mesh.position.y,
        speedX: (Math.random() - 0.5) * 0.008,
        speedY: (Math.random() - 0.5) * 0.008,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.5 + Math.random() * 1,
        floatAmplitude: 0.5 + Math.random() * 1.5,
      };

      scene.add(mesh);
      meshes.push(mesh);
    }
    meshesRef.current = meshes;

    // Wireframe rings
    const ringGeo = new THREE.TorusGeometry(15, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.15,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.z = -10;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(20, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x00d4aa,
      transparent: true,
      opacity: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.position.z = -20;
    scene.add(ring2);

    // Particle system
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x6366f1),
      new THREE.Color(0x00d4aa),
      new THREE.Color(0xff2bd6),
      new THREE.Color(0xffc83d),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 80;
      positions[i3 + 1] = (Math.random() - 0.5) * 60;
      positions[i3 + 2] = (Math.random() - 0.5) * 60;

      sizes[i] = Math.random() * 3 + 1;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      meshes.forEach((mesh) => {
        const data = mesh.userData;
        mesh.rotation.x += data.speedX;
        mesh.rotation.y += data.speedY;
        mesh.position.y =
          data.originalY +
          Math.sin(elapsed * data.floatSpeed + data.floatOffset) * data.floatAmplitude;
      });

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0002;
        particlesRef.current.rotation.x += 0.0001;
      }

      ring1.rotation.z += 0.001;
      ring2.rotation.z -= 0.0008;

      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = totalHeight > 0 ? scrollY / totalHeight : 0;

      camera.position.y = 2.3 - scrollRatio * 1.5;
      camera.position.z = 30 - scrollRatio * 5;
      camera.lookAt(scrollRatio * 8, 4.2 - scrollRatio * 3, -20);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}

export default ThreeScene;