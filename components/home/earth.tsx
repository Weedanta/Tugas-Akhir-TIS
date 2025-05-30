// components/Earth3D.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Earth3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!mountRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let earth: THREE.Mesh;
    let atmosphere: THREE.Mesh;
    let stars: THREE.Points;
    let earthGeometry: THREE.SphereGeometry;
    let earthMaterial: THREE.MeshPhongMaterial;
    let atmosphereGeometry: THREE.SphereGeometry;
    let atmosphereMaterial: THREE.ShaderMaterial;
    let starsGeometry: THREE.BufferGeometry;
    let starsMaterial: THREE.PointsMaterial;

    // Handle resize with better responsivity
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer || !earth || !atmosphere) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      
      // Responsive positioning based on screen size
      const isTablet = width >= 768 && width < 1024;
      const isSmallScreen = width < 768;
      
      if (isSmallScreen) {
        // Mobile: center the Earth
        earth.position.set(0, 0, 0);
        atmosphere.position.set(0, 0, 0);
        camera.position.set(0, 0, 4.5);
        camera.lookAt(0, 0, 0);
      } else if (isTablet) {
        // Tablet: slightly offset but not too much
        earth.position.set(0.1, 0, 0);
        atmosphere.position.set(0.1, 0, 0);
        camera.position.set(0, 0.1, 4.2);
        camera.lookAt(0.1, 0, 0);
      } else {
        // Desktop: more pronounced positioning
        earth.position.set(0.2, 0, 0);
        atmosphere.position.set(0.2, 0, 0);
        camera.position.set(0.1, 0.1, 4);
        camera.lookAt(0.2, 0, 0);
      }
    };

    try {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
      });

      // Set initial size based on container
      const containerWidth = mountRef.current.clientWidth || window.innerWidth;
      const containerHeight = mountRef.current.clientHeight || window.innerHeight;
      
      renderer.setSize(containerWidth, containerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      // Create Earth with balanced size
      earthGeometry = new THREE.SphereGeometry(1.2, 64, 64);
      
      // Load textures
      const textureLoader = new THREE.TextureLoader();
      
      // Earth material with day/night textures
      earthMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
        bumpMap: textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg'),
        bumpScale: 0.05,
        specularMap: textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'),
        specular: new THREE.Color('grey'),
        shininess: 100,
      });

      earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earth.position.set(0.2, 0, 0); // Balanced initial position
      scene.add(earth);

      // Add atmosphere glow with matching size
      atmosphereGeometry = new THREE.SphereGeometry(1.26, 64, 64);
      atmosphereMaterial = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
            gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
          }
        `
      });

      atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      atmosphere.position.set(0.2, 0, 0); // Match Earth position
      scene.add(atmosphere);

      // Lighting - positioned for balanced Earth
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight.position.set(3, 2, 5);
      directionalLight.target.position.set(0.2, 0, 0); // Point light at Earth position
      scene.add(directionalLight);
      scene.add(directionalLight.target);

      // Stars background - more spread out
      starsGeometry = new THREE.BufferGeometry();
      const starsCount = 15000;
      const positions = new Float32Array(starsCount * 3);

      for (let i = 0; i < starsCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 3000;
      }

      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsMaterial = new THREE.PointsMaterial({ 
        color: 0xffffff,
        size: 1.5,
        sizeAttenuation: false
      });
      stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);

      // Position camera for responsive design
      camera.position.set(0.1, 0.1, 4);
      camera.lookAt(0.2, 0, 0); // Look at Earth position

      // Initial resize to set proper aspect ratio
      handleResize();

      // Animation
      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);

        // Rotate Earth
        earth.rotation.y += 0.005;
        atmosphere.rotation.y += 0.005;

        // Slowly rotate stars
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;

        renderer.render(scene, camera);
      };

      animate();
      window.addEventListener('resize', handleResize);

    } catch (error) {
      console.error('Error initializing Earth3D:', error);
    }

    // Cleanup
    return () => {
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer?.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources safely
      renderer?.dispose();
      earthGeometry?.dispose();
      earthMaterial?.dispose();
      atmosphereGeometry?.dispose();
      atmosphereMaterial?.dispose();
      starsGeometry?.dispose();
      starsMaterial?.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default Earth3D;