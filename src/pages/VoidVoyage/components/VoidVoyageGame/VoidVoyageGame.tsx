import { useEffect, useRef } from "react";
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  SphereGeometry,
  Mesh,
  MeshBasicMaterial,
  Vector2,
  Vector3,
  Raycaster,
  PlaneGeometry,
  TextureLoader,
  Texture
} from 'three';

const VoidVoyageGame = () => {
  const threeContainer = useRef<HTMLDivElement>(null);
  const gameInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (gameInitialized.current) return;
    gameInitialized.current = true;
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new PlaneGeometry(2, 2);
    const textures:Texture[] = [];
    for(let i = 0; i < 10; i++) {
      textures.push(new TextureLoader().load(`/voidVoyage/frame-${i}.png`))
    }
    let currIndex = 0;
    const material = new MeshBasicMaterial({ map: textures[0] });
    const blackHole = new Mesh(geometry, material);
    blackHole.scale.set(0.25, 0.25, 0.25);

    scene.add(blackHole);
    threeContainer.current?.appendChild(renderer.domElement);
    const starGeometry = new SphereGeometry(0.01, 10, 10);
    const starMaterial = new MeshBasicMaterial({ color: 0xFFFFFF }); // White color

    setInterval(() => {
      currIndex += 1;
      if (currIndex === 8) currIndex = 0;
      blackHole.material.map = textures[currIndex];
      const star = new Mesh(starGeometry, starMaterial);
      star.position.x = Math.random() * 20 - 10;
      star.position.y = Math.random() * 20 - 10;
      star.position.z = Math.random() * 20 - 10;
      scene.add(star);
    }, 180)

    function animate() {
      requestAnimationFrame(animate);
     
      scene.children.forEach(child => {
        if (child !== blackHole) {
          // Move towards the black hole as before
          const direction = blackHole.position.clone().sub(child.position).normalize();
          child.position.add(direction.multiplyScalar(0.05));
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    function onMouseMove(event: MouseEvent) {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      const raycaster = new Raycaster();
      raycaster.setFromCamera(new Vector2(mouseX, mouseY), camera);

      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        // If the mouse is over an object
        blackHole.position.copy(intersects[0].point);
        blackHole.position.z = 0;
      } else {
        
        // Otherwise, project mouse position onto the scene's ground plane
        const projectedPoint = new Vector3(mouseX, mouseY, 0);
        blackHole.position.copy(projectedPoint);
      }
    }

    window.addEventListener('mousemove', onMouseMove);
  }, [])

  return (
    <>
      {/* {loading && <Loading />} */}
      <div ref={threeContainer} />
    </>
  )
}

export default VoidVoyageGame;