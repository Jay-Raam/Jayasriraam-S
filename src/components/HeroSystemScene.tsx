import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';
import { usePrefersReducedMotion } from '../lib/prefersReducedMotion';

type HeroSystemSceneProps = {
    heroProgress: MotionValue<number>;
    className?: string;
};

/** Abstract Frontend→API→Backend→Database→Cloud node graph rendered behind the hero content. */
export function HeroSystemScene({ heroProgress, className = '' }: HeroSystemSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const reducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const styles = getComputedStyle(document.documentElement);
        const accentColor = new THREE.Color(styles.getPropertyValue('--accent2').trim() || '#e84855');
        const inkColor = new THREE.Color(styles.getPropertyValue('--black').trim() || '#0a0a0a');
        const fogColor = new THREE.Color(styles.getPropertyValue('--white').trim() || '#f5f0e8');

        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(fogColor.getHex(), 6, 16);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 9);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
        renderer.setSize(width, height);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.inset = '0';
        container.appendChild(renderer.domElement);

        /* ── Background dust (very subtle, low opacity ink specks) ── */
        const dustCount = isMobile ? 60 : 160;
        const dustGeometry = new THREE.BufferGeometry();
        const dustPositions = new Float32Array(dustCount * 3);
        for (let i = 0; i < dustCount; i++) {
            dustPositions[i * 3] = (Math.random() - 0.5) * 20;
            dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
            dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
        }
        dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
        const dustMaterial = new THREE.PointsMaterial({
            color: inkColor,
            size: 0.035,
            transparent: true,
            opacity: 0.18,
            sizeAttenuation: true,
        });
        const dust = new THREE.Points(dustGeometry, dustMaterial);
        scene.add(dust);

        /* ── System node graph: Frontend → API → Backend → Database → Cloud ── */
        const layerCount = 5;
        const nodesPerLayer = isMobile ? 3 : 5;
        const layerSpacingX = 3.2;
        const startX = -(layerCount - 1) * layerSpacingX * 0.5;

        const nodePositions: THREE.Vector3[] = [];
        const layerIndexRanges: [number, number][] = [];

        for (let layer = 0; layer < layerCount; layer++) {
            const from = nodePositions.length;
            for (let n = 0; n < nodesPerLayer; n++) {
                const x = startX + layer * layerSpacingX + (Math.random() - 0.5) * 0.4;
                const y = (n - (nodesPerLayer - 1) / 2) * 1.1 + (Math.random() - 0.5) * 0.3;
                const z = (Math.random() - 0.5) * 2.5 - 2;
                nodePositions.push(new THREE.Vector3(x, y, z));
            }
            layerIndexRanges.push([from, nodePositions.length]);
        }

        // Node points (small connective network)
        const networkGeometry = new THREE.BufferGeometry().setFromPoints(nodePositions);
        const networkMaterial = new THREE.PointsMaterial({
            color: inkColor,
            size: 0.08,
            transparent: true,
            opacity: 0.45,
            sizeAttenuation: true,
        });
        const networkPoints = new THREE.Points(networkGeometry, networkMaterial);
        scene.add(networkPoints);

        // Thin lines connecting nodes across adjacent layers
        const linePositions: number[] = [];
        for (let layer = 0; layer < layerCount - 1; layer++) {
            const [aFrom, aTo] = layerIndexRanges[layer];
            const [bFrom, bTo] = layerIndexRanges[layer + 1];
            for (let a = aFrom; a < aTo; a++) {
                const links = Math.random() > 0.5 ? 2 : 1;
                for (let l = 0; l < links; l++) {
                    const b = bFrom + Math.floor(Math.random() * (bTo - bFrom));
                    linePositions.push(
                        nodePositions[a].x, nodePositions[a].y, nodePositions[a].z,
                        nodePositions[b].x, nodePositions[b].y, nodePositions[b].z,
                    );
                }
            }
        }
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
        const lineMaterial = new THREE.LineBasicMaterial({ color: inkColor, transparent: true, opacity: 0.12 });
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        // A few larger foreground "system" nodes in accent red
        const foregroundGroup = new THREE.Group();
        const foregroundCount = isMobile ? 2 : 4;
        for (let i = 0; i < foregroundCount; i++) {
            const layer = Math.floor((i / foregroundCount) * layerCount);
            const geometry = new THREE.IcosahedronGeometry(0.16, 0);
            const material = new THREE.MeshBasicMaterial({ color: accentColor, wireframe: true, transparent: true, opacity: 0.85 });
            const mesh = new THREE.Mesh(geometry, material);
            const base = nodePositions[layerIndexRanges[layer][0]];
            mesh.position.set(base.x, base.y + 0.6, base.z + 1.2);
            foregroundGroup.add(mesh);
        }
        scene.add(foregroundGroup);

        /* ── Interaction state ── */
        const pointer = { x: 0, y: 0 };
        const targetRotation = { x: 0, y: 0 };
        let scrollValue = 0;

        const onPointerMove = (event: PointerEvent) => {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
        };
        if (!reducedMotion) {
            window.addEventListener('pointermove', onPointerMove, { passive: true });
        }

        const unsubscribeScroll = heroProgress.on('change', (v) => {
            scrollValue = v;
        });

        /* ── Resize ── */
        const resizeObserver = new ResizeObserver(() => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            if (w === 0 || h === 0) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
        resizeObserver.observe(container);

        /* ── Visibility pause ── */
        let paused = false;
        const onVisibilityChange = () => {
            paused = document.hidden;
        };
        document.addEventListener('visibilitychange', onVisibilityChange);

        /* ── Render loop ── */
        let rafId = 0;
        const startTime = performance.now();

        const renderFrame = () => {
            const elapsed = (performance.now() - startTime) / 1000;

            targetRotation.x += (-pointer.y * 0.25 - targetRotation.x) * 0.04;
            targetRotation.y += (pointer.x * 0.3 - targetRotation.y) * 0.04;

            networkPoints.rotation.y = targetRotation.y + scrollValue * 0.6;
            networkPoints.rotation.x = targetRotation.x;
            lines.rotation.y = networkPoints.rotation.y;
            lines.rotation.x = networkPoints.rotation.x;
            dust.rotation.y = targetRotation.y * 0.4;

            foregroundGroup.rotation.y = targetRotation.y + scrollValue * 0.6;
            foregroundGroup.rotation.x = targetRotation.x;
            foregroundGroup.children.forEach((child, i) => {
                child.rotation.x = elapsed * 0.15 + i;
                child.rotation.y = elapsed * 0.2 + i;
            });

            camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.03;
            camera.position.y += (-pointer.y * 0.3 - camera.position.y) * 0.03;
            camera.position.z = 9 + scrollValue * 2;
            camera.lookAt(0, 0, -2);

            renderer.render(scene, camera);
        };

        if (reducedMotion) {
            renderFrame();
        } else {
            const loop = () => {
                if (!paused) renderFrame();
                rafId = requestAnimationFrame(loop);
            };
            rafId = requestAnimationFrame(loop);
        }

        return () => {
            cancelAnimationFrame(rafId);
            unsubscribeScroll();
            resizeObserver.disconnect();
            document.removeEventListener('visibilitychange', onVisibilityChange);
            window.removeEventListener('pointermove', onPointerMove);

            dustGeometry.dispose();
            dustMaterial.dispose();
            networkGeometry.dispose();
            networkMaterial.dispose();
            lineGeometry.dispose();
            lineMaterial.dispose();
            foregroundGroup.children.forEach((child) => {
                const mesh = child as THREE.Mesh;
                mesh.geometry.dispose();
                (mesh.material as THREE.Material).dispose();
            });
            renderer.dispose();
            if (renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [heroProgress, reducedMotion]);

    return <div ref={containerRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true" />;
}
