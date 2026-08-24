import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            const skinMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#e0a890"),
              roughness: 0.55,
              metalness: 0.05,
            });
            const shirtMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#181424"),
              roughness: 0.65,
              metalness: 0.1,
            });
            const pantMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#1c1c24"),
              roughness: 0.75,
              metalness: 0.05,
            });
            const shoeMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#f0f0f5"),
              roughness: 0.4,
              metalness: 0.1,
            });
            const soleMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#c2a4ff"),
              roughness: 0.5,
              metalness: 0.1,
            });
            const hairMaterial = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#121118"),
              roughness: 0.35,
              metalness: 0.15,
            });

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const name = child.name || "";
                if (
                  name === "Plane.007" ||
                  name === "Plane007" ||
                  name.includes("Ear") ||
                  name.includes("Neck") ||
                  name.includes("Hand")
                ) {
                  mesh.material = skinMaterial.clone();
                } else if (name.includes("BODY") || name.includes("SHIRT")) {
                  mesh.material = shirtMaterial.clone();
                } else if (name.includes("Pant")) {
                  mesh.material = pantMaterial.clone();
                } else if (name.includes("Shoe")) {
                  mesh.material = shoeMaterial.clone();
                } else if (name.includes("Sole")) {
                  mesh.material = soleMaterial.clone();
                } else if (name.includes("hair")) {
                  mesh.material = hairMaterial.clone();
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
