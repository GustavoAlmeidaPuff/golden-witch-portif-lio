import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Viewer3D() {
  const holderRef = useRef(null);

  useEffect(() => {
    const holder = holderRef.current;
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    cam.position.set(0, 1.5, 5.4);
    cam.lookAt(0, 1.1, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    holder.appendChild(renderer.domElement);

    const key = new THREE.DirectionalLight(0xfff2d0, 1.1);
    key.position.set(3, 5, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xb9a7e6, 0.5);
    fill.position.set(-4, 2, -3);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const gold = new THREE.MeshStandardMaterial({ color: 0xf2c14e, roughness: 0.45, metalness: 0.15 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x3a3153, roughness: 0.6 });
    const skin = new THREE.MeshStandardMaterial({ color: 0xf3ddc9, roughness: 0.7 });
    const dress = new THREE.MeshStandardMaterial({ color: 0x4a3f6e, roughness: 0.65 });

    const doll = new THREE.Group();

    // vestido (corpo)
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.78, 1.15, 24), dress);
    body.position.y = 0.62;
    doll.add(body);
    // cabeça grande (chibi)
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 32), skin);
    head.position.y = 1.72;
    doll.add(head);
    // cabelo
    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.66, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.62),
      dark
    );
    hair.position.y = 1.78;
    doll.add(hair);
    // bracinhos
    [-1, 1].forEach((s) => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.6, 12), dress);
      arm.position.set(0.42 * s, 0.95, 0);
      arm.rotation.z = s * -0.5;
      doll.add(arm);
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), skin);
      hand.position.set(0.58 * s, 0.72, 0);
      doll.add(hand);
    });
    // chapéu de bruxa
    const hat = new THREE.Group();
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.06, 32), dark);
    hat.add(brim);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.44, 1.0, 28), dark);
    cone.position.y = 0.52;
    hat.add(cone);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.14, 28), gold);
    band.position.y = 0.1;
    hat.add(band);
    hat.position.y = 2.28;
    hat.rotation.z = -0.1;
    doll.add(hat);
    // estrela orbitando
    const starShape = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 0.16 : 0.07;
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      i === 0 ? starShape.moveTo(Math.cos(a) * r, Math.sin(a) * r) : starShape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    const star = new THREE.Mesh(new THREE.ExtrudeGeometry(starShape, { depth: 0.05, bevelEnabled: false }), gold);
    doll.add(star);

    const centerY = new THREE.Box3().setFromObject(doll).getCenter(new THREE.Vector3()).y;
    const pivot = new THREE.Group();
    pivot.position.y = centerY;
    doll.position.y = -centerY;
    pivot.add(doll);
    scene.add(pivot);

    let rotY = 0.4, targetY = 0.4, rotX = 0, targetX = 0, dragging = false, lastX = 0, lastY = 0;

    function onPointerDown(e) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      holder.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
      if (dragging) {
        targetY += (e.clientX - lastX) * 0.012;
        targetX += (e.clientY - lastY) * 0.012;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    }
    function onPointerUp() {
      dragging = false;
    }

    holder.addEventListener("pointerdown", onPointerDown);
    holder.addEventListener("pointermove", onPointerMove);
    holder.addEventListener("pointerup", onPointerUp);
    holder.addEventListener("pointercancel", onPointerUp);

    function resize() {
      const w = holder.clientWidth, h = holder.clientHeight;
      renderer.setSize(w, h);
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    let raf;
    function loop(t) {
      rotY += (targetY - rotY) * 0.08;
      rotX += (targetX - rotX) * 0.08;
      pivot.rotation.y = rotY;
      pivot.rotation.x = rotX;
      pivot.position.y = centerY + Math.sin(t / 900) * 0.05;
      const a = t / 1400;
      star.position.set(Math.cos(a) * 1.15, 1.5 + Math.sin(a * 1.7) * 0.3, Math.sin(a) * 1.15);
      star.rotation.z = a;
      star.lookAt(cam.position);
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      holder.removeEventListener("pointerdown", onPointerDown);
      holder.removeEventListener("pointermove", onPointerMove);
      holder.removeEventListener("pointerup", onPointerUp);
      holder.removeEventListener("pointercancel", onPointerUp);
      holder.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div id="viewer" ref={holderRef} aria-label="Visualizador 3D" />;
}
