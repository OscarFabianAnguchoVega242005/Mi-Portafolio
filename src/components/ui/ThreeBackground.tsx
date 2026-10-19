'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Fondo 3D fijo: callejón neón con lluvia y el duelo dragón de agua vs. rayo.
 * La cámara avanza según el scroll de la página. Requiere: npm i three @types/three
 */
export function ThreeBackground() {
  const hostRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const fl = flashRef.current;
    if (!host || !fl) return;

    let disposed = false;
    let raf = 0;
    let cleanup: () => void = () => {};

    const start = () => {
      if (disposed) return;

      // Mantiene los colores tal como se veían en el prototipo (three r128)
      THREE.ColorManagement.enabled = false;

      const still = matchMedia('(prefers-reduced-motion:reduce)').matches;

      const glCanvas = document.createElement('canvas');
      const bloomCanvas = document.createElement('canvas');
      glCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
      bloomCanvas.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;filter:blur(7px) brightness(1.7) saturate(1.5);mix-blend-mode:screen';
      host.append(glCanvas, bloomCanvas);

      const bx = bloomCanvas.getContext('2d');

      let R: THREE.WebGLRenderer;
      try {
        R = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: true, preserveDrawingBuffer: true });
      } catch {
        // Sin WebGL: degradado de respaldo
        glCanvas.remove();
        bloomCanvas.remove();
        host.style.background = 'linear-gradient(#1A0630,#07010F)';
        return;
      }
      R.outputColorSpace = THREE.LinearSRGBColorSpace;
      R.setPixelRatio(Math.min(devicePixelRatio, 1.5));

      const S = new THREE.Scene();
      const C = new THREE.PerspectiveCamera(62, 1, 0.1, 160);
      const bgColor = new THREE.Color();
      const fog = new THREE.Fog(0x12041f, 10, 70);
      S.background = bgColor;
      S.fog = fog;

      // Etapas de color: la escena cambia de tono mientras avanzas
      const BG = [0x12041f, 0x031a2a, 0x1a1203].map((h) => new THREE.Color(h));
      const col = new THREE.Color();
      const rnd = (a: number, b: number) => a + Math.random() * (b - a);

      /* Texturas generadas por código */
      const glow = (() => {
        const c = document.createElement('canvas');
        c.width = c.height = 64;
        const x = c.getContext('2d')!;
        const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.3, 'rgba(255,255,255,.5)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        x.fillStyle = g;
        x.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
      })();

      const winT = (() => {
        const c = document.createElement('canvas');
        c.width = 128;
        c.height = 256;
        const x = c.getContext('2d')!;
        const k = ['#FF2BD6', '#19E3FF', '#FFC83D', '#6A4BFF'];
        x.fillStyle = '#0a0512';
        x.fillRect(0, 0, 128, 256);
        for (let i = 0; i < 8; i++)
          for (let j = 0; j < 16; j++)
            if (Math.random() < 0.3) {
              x.fillStyle = k[(Math.random() * 4) | 0];
              x.globalAlpha = 0.35 + Math.random() * 0.6;
              x.fillRect(i * 16 + 3, j * 16 + 3, 10, 10);
            }
        const t = new THREE.CanvasTexture(c);
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        return t;
      })();

      const sign = (txt: string, fill: string, glowC: string) => {
        const c = document.createElement('canvas');
        c.width = 512;
        c.height = 160;
        const x = c.getContext('2d')!;
        x.font = '800 92px "Bricolage Grotesque",sans-serif';
        x.textAlign = 'center';
        x.textBaseline = 'middle';
        x.shadowColor = glowC;
        x.shadowBlur = 28;
        x.fillStyle = fill;
        x.fillText(txt, 256, 82);
        x.fillText(txt, 256, 82);
        return new THREE.Mesh(
          new THREE.PlaneGeometry(7, 2.2),
          new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })
        );
      };

      /* Callejón: edificios con ventanas, letreros y tubos de neón */
      const G = new THREE.Group();
      const SG: THREE.Mesh[] = [];
      for (const s of [-1, 1])
        for (let i = 0; i < 46; i++) {
          const w = rnd(4, 7), h = rnd(12, 38), d = rnd(3, 4.5);
          const m = winT.clone();
          m.needsUpdate = true;
          m.repeat.set(w / 3, h / 4);
          m.offset.set(Math.random(), Math.random());
          const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ map: m }));
          b.position.set(s * (6 + w / 2 + rnd(0, 1.2)), h / 2, -i * 3.1 - rnd(0, 1));
          G.add(b);
        }
      const signs: [number, string, string, string, number, number][] = [
        [-1, 'DEV PRO', '#FFD3F7', '#FF2BD6', -12, 8],
        [-1, 'FULL STACK', '#FFEFB0', '#FFC83D', -40, 9],
        [-1, 'OSCAR', '#FFD3F7', '#FF2BD6', -68, 8],
        [1, 'SOLUTIONS', '#C9F8FF', '#19E3FF', -24, 8],
        [1, 'GITHUB', '#C9F8FF', '#19E3FF', -52, 9],
        [1, 'VILLAVICENCIO', '#FFEFB0', '#FFC83D', -78, 8],
      ];
      signs.forEach(([s, t, f, g, z, y]) => {
        const m = sign(t, f, g);
        m.position.set(s * 5.9, y, z);
        m.rotation.y = (-s * Math.PI) / 2;
        G.add(m);
        SG.push(m);
      });
      const neonColors = [0xff2bd6, 0x19e3ff, 0xffc83d];
      for (let i = 0; i < 26; i++) {
        const s = i % 2 ? 1 : -1, h = rnd(3, 9);
        const t = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, h, 0.16),
          new THREE.MeshBasicMaterial({ color: neonColors[i % 3] })
        );
        t.position.set(s * 5.7, rnd(2, 12), -i * 3.4 - 4);
        G.add(t);
      }
      /* Haces de luz que bajan desde lo alto */
      for (let i = 0; i < 7; i++) {
        const c = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 2.8, 20, 16, 1, true),
          new THREE.MeshBasicMaterial({
            color: neonColors[i % 3],
            transparent: true,
            opacity: 0.07,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
          })
        );
        c.position.set((i % 2 ? 1 : -1) * 3.2, 12, -8 - i * 12);
        c.rotation.z = (i % 2 ? 1 : -1) * 0.12;
        G.add(c);
      }
      const Rf = G.clone(); // reflejo en el suelo mojado
      Rf.scale.y = -1;
      S.add(G, Rf);
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(60, 220).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: 0x07010f, transparent: true, opacity: 0.8, depthWrite: false })
      );
      floor.position.set(0, 0.01, -90);
      S.add(floor);

      /* Lluvia */
      const RN = 2200;
      const rp = new Float32Array(RN * 6);
      const rv = new Float32Array(RN);
      for (let i = 0; i < RN; i++) {
        const x = rnd(-14, 14), y = rnd(0, 26), z = rnd(-48, 3);
        rp.set([x, y, z, x - 0.05, y + 0.7, z], i * 6);
        rv[i] = rnd(0.35, 0.65);
      }
      const rg = new THREE.BufferGeometry();
      rg.setAttribute('position', new THREE.BufferAttribute(rp, 3));
      const rain = new THREE.LineSegments(
        rg,
        new THREE.LineBasicMaterial({ color: 0x9fb4ff, transparent: true, opacity: 0.5 })
      );
      rain.frustumCulled = false;
      S.add(rain);

      /* El duelo: dragón de agua (cian) contra rayo (dorado) */
      const D = new THREE.Group();
      const D2 = new THREE.Group();
      D2.scale.y = -1;
      S.add(D, D2);
      const N = 300;
      const dpos = new Float32Array(N * 3);
      const dcol = new Float32Array(N * 3);
      const cy = new THREE.Color(0x19e3ff);
      for (let k = 0; k < N; k++) {
        const f = 1 - k / N;
        dcol.set([cy.r * f, cy.g * f, cy.b * f], k * 3);
      }
      const dg = new THREE.BufferGeometry();
      dg.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
      dg.setAttribute('color', new THREE.BufferAttribute(dcol, 3));
      const dragon = new THREE.Points(
        dg,
        new THREE.PointsMaterial({
          size: 0.8,
          map: glow,
          vertexColors: true,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      const BN = 22;
      const mkB = () => {
        const p = new Float32Array((BN + 1) * 3);
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(p, 3));
        const l = new THREE.Line(
          g,
          new THREE.LineBasicMaterial({ color: 0xffc83d, transparent: true, blending: THREE.AdditiveBlending })
        );
        l.frustumCulled = false;
        return { p, g, l };
      };
      const bolts = [mkB(), mkB(), mkB()];
      const halo = new THREE.Points(
        dg,
        new THREE.PointsMaterial({
          size: 2.6,
          map: glow,
          color: 0x19e3ff,
          opacity: 0.25,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      dragon.frustumCulled = halo.frustumCulled = false;
      [dragon, halo, ...bolts.map((b) => b.l)].forEach((o) => {
        D.add(o);
        D2.add(o.clone()); // los clones comparten geometría
      });
      const spr = (c: number): THREE.Sprite[] => {
        const s = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glow,
            color: c,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
          })
        );
        D.add(s);
        const t = s.clone();
        D2.add(t);
        return [s, t];
      };
      const head = spr(0x19e3ff);
      const orb = spr(0xffc83d);
      const clash = spr(0xffe08a);

      /* Onda de choque y chispas en cada choque del duelo */
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffd166,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 48), ringMat);
      ring.frustumCulled = false;
      D.add(ring);
      const SPN = 260;
      const spp = new Float32Array(SPN * 3);
      const spv = new Float32Array(SPN * 3);
      const spc = new Float32Array(SPN * 3);
      const spl = new Float32Array(SPN);
      const spg = new THREE.BufferGeometry();
      spg.setAttribute('position', new THREE.BufferAttribute(spp, 3));
      spg.setAttribute('color', new THREE.BufferAttribute(spc, 3));
      const sparks = new THREE.Points(
        spg,
        new THREE.PointsMaterial({
          size: 0.45,
          map: glow,
          vertexColors: true,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      sparks.frustumCulled = false;
      D.add(sparks);
      D2.add(sparks.clone());

      let ringT = 0, nextPulse = 2, shake = 0;
      const pulse = (v: THREE.Vector3) => {
        ringT = 1;
        shake = 1;
        for (let i = 0; i < SPN; i++) {
          spp.set([v.x, v.y, v.z], i * 3);
          spv.set([rnd(-0.5, 0.5), rnd(-0.2, 0.6), rnd(-0.5, 0.5)], i * 3);
          spl[i] = 1;
        }
      };
      const zap = (o: { p: Float32Array; g: THREE.BufferGeometry }, a: THREE.Vector3, b: THREE.Vector3, j: number) => {
        const bp = o.p;
        for (let i = 0; i <= BN; i++) {
          const t = i / BN, m = Math.sin(Math.PI * t) * j;
          bp[i * 3] = a.x + (b.x - a.x) * t + (Math.random() - 0.5) * m;
          bp[i * 3 + 1] = a.y + (b.y - a.y) * t + (Math.random() - 0.5) * m;
          bp[i * 3 + 2] = a.z + (b.z - a.z) * t + (Math.random() - 0.5) * m;
        }
        o.g.attributes.position.needsUpdate = true;
      };
      const place = (pair: THREE.Object3D[], v: THREE.Vector3, sc: number) =>
        pair.forEach((o) => {
          o.position.copy(v);
          o.scale.setScalar(sc);
        });

      /* Entrada del usuario y tamaño */
      let p = 0, tp = 0, mx = 0, my = 0, T = 0, flash = 0, lastZap = 0;
      const A = new THREE.Vector3();
      const B = new THREE.Vector3();
      const M = new THREE.Vector3();

      function frame() {
        T += 0.016;
        p += (tp - p) * (still ? 1 : 0.06);
        const cz = -p * 88;
        const k = p * 2, i = Math.min(1, Math.floor(k));
        col.copy(BG[i]).lerp(BG[i + 1], k - i);
        bgColor.copy(col);
        fog.color.copy(col);
        C.fov = 62 + 18 * Math.max(0, (p - 0.8) / 0.2);
        C.updateProjectionMatrix();
        C.position.set(
          mx * 0.9 + rnd(-1, 1) * shake * 0.15,
          2.3 + Math.sin(T * 0.8) * 0.08 - my * 0.3 + rnd(-1, 1) * shake * 0.15,
          cz
        );
        C.lookAt(mx * 4, 4.2 - my * 1.8, cz - 20);

        /* dragón: ondula; el rayo sale del orbe dorado hacia su cabeza */
        const zo = 40 - 14 * p;
        for (let n = 0; n < N; n++) {
          const s = n / N;
          dpos[n * 3] = -1.8 + Math.sin(T * 1.2 + s * 11) * (1.2 + s * 3);
          dpos[n * 3 + 1] = 5.5 + Math.cos(T * 1.6 + s * 8) * (0.8 + s * 1.6) + s * 1.5;
          dpos[n * 3 + 2] = cz - zo + s * 24;
        }
        dg.attributes.position.needsUpdate = true;
        A.set(3.6 + Math.sin(T * 0.9) * 0.6, 6 + Math.cos(T * 1.1) * 0.6, cz - zo);
        B.set(dpos[0], dpos[1], dpos[2]);
        if (Math.random() < 0.004) flash = 1;
        if (T - lastZap > 0.07) {
          lastZap = T;
          if (flash > 0.6) zap(bolts[0], A.set(B.x + rnd(-2, 2), 24, B.z), B, 3);
          else zap(bolts[0], A, B, 1.6);
          zap(bolts[1], A, M.set(B.x + rnd(-7, 7), rnd(2, 12), B.z + rnd(-8, 8)), 2.4);
          zap(bolts[2], A, M.set(B.x + rnd(-7, 7), rnd(2, 12), B.z + rnd(-8, 8)), 2.4);
        }
        M.addVectors(A, B).multiplyScalar(0.5);
        place(head, B, 3);
        place(orb, A, 3 + Math.sin(T * 6) * 0.4);
        place(clash, M, 2.5 + Math.random() * 3.5);
        if (T > nextPulse || flash > 0.95) {
          nextPulse = T + rnd(2, 3.5);
          pulse(M);
        }
        ring.position.copy(M);
        ring.lookAt(C.position);
        ringT *= 0.94;
        ring.scale.setScalar(1 + (1 - ringT) * 16);
        ringMat.opacity = ringT;
        shake *= 0.9;
        for (let n = 0; n < SPN; n++) {
          spv[n * 3 + 1] -= 0.012;
          spp[n * 3] += spv[n * 3];
          spp[n * 3 + 1] += spv[n * 3 + 1];
          spp[n * 3 + 2] += spv[n * 3 + 2];
          spl[n] = Math.max(0, spl[n] - 0.016);
          spc.set([spl[n], 0.78 * spl[n], 0.24 * spl[n]], n * 3);
        }
        spg.attributes.position.needsUpdate = true;
        spg.attributes.color.needsUpdate = true;

        /* lluvia */
        for (let n = 0; n < RN; n++) {
          let y = rp[n * 6 + 1] - rv[n];
          if (y < 0) y += 26;
          rp[n * 6 + 1] = y;
          rp[n * 6 + 4] = y + 0.7;
        }
        rg.attributes.position.needsUpdate = true;
        rain.position.z = cz;

        flash *= 0.92;
        fl!.style.opacity = String(flash * 0.3);
        SG.forEach((m, n) => {
          (m.material as THREE.MeshBasicMaterial).opacity = Math.sin(T * 2.7 + n * 5.3) > 0.93 ? 0.3 : 1;
        }); // letreros que parpadean
        R.render(S, C);
        bx?.drawImage(glCanvas, 0, 0, bloomCanvas.width, bloomCanvas.height);
      }

      const onScroll = () => {
        tp = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
        if (still) frame();
      };
      const onMove = (e: PointerEvent) => {
        mx = (e.clientX / innerWidth) * 2 - 1;
        my = (e.clientY / innerHeight) * 2 - 1;
      };
      const onDown = () => {
        flash = 1;
      };
      const fit = () => {
        const w = innerWidth, h = innerHeight;
        R.setSize(w, h, false);
        C.aspect = w / h;
        C.updateProjectionMatrix();
        bloomCanvas.width = w >> 2;
        bloomCanvas.height = h >> 2;
        if (still) frame();
      };

      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('pointermove', onMove);
      addEventListener('pointerdown', onDown);
      addEventListener('resize', fit);
      fit();
      onScroll();

      if (!still) {
        const loop = () => {
          frame();
          raf = requestAnimationFrame(loop);
        };
        loop();
      } else {
        frame();
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        removeEventListener('scroll', onScroll);
        removeEventListener('pointermove', onMove);
        removeEventListener('pointerdown', onDown);
        removeEventListener('resize', fit);
        R.dispose();
        glCanvas.remove();
        bloomCanvas.remove();
      };
    };

    document.fonts.ready.then(start);

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#07010F]">
      {/* Los canvas de la escena se añaden aquí dentro */}
      <div ref={hostRef} className="absolute inset-0" />
      {/* Destello de rayo */}
      <div ref={flashRef} className="absolute inset-0 bg-[#FFC83D] opacity-0 mix-blend-screen" />
      {/* Velo: en escritorio oscurece la izquierda (donde va el texto); en móvil, parejo */}
      <div className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(7,1,15,.8),rgba(7,1,15,.45)_38%,rgba(7,1,15,.12)_68%,transparent),radial-gradient(transparent_55%,rgba(7,1,15,.8))]" />
      <div className="absolute inset-0 md:hidden bg-[linear-gradient(rgba(7,1,15,.65),rgba(7,1,15,.45)_50%,rgba(7,1,15,.65)),radial-gradient(transparent_40%,rgba(7,1,15,.8))]" />
    </div>
  );
}

export default ThreeBackground;