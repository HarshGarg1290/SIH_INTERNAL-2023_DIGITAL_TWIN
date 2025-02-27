import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let scene, camera, renderer;
let car;
let controls;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.rotation.x = (20 / 180) * Math.PI;
  camera.rotation.z = (40 / 180) * Math.PI;
  camera.rotation.y = (60 / 180) * Math.PI;
  camera.position.x = 1000;
  camera.position.y = 100;
  camera.position.z = 500;

  const hlight = new THREE.AmbientLight(0x3, 300);
  scene.add(hlight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(1, 1, 1);

  scene.add(directionalLight);

  const light = new THREE.PointLight(0xddddd, 10);
  light.position.set(300, 300, 500);
  scene.add(light);
  const light2 = new THREE.PointLight(0xddddd, 10);
  light2.position.set(500, 400, 400);
  scene.add(light2);
  const light3 = new THREE.PointLight(0xddddd, 10);
  light3.position.set(300, 500, 500);
  scene.add(light3);
  const light4 = new THREE.PointLight(0xddddd, 10);
  light4.position.set(500, 300, 500);
  scene.add(light4);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(550, 350);
  renderer.setClearColor(0x000000, 0);
  const modelContainer = document.getElementById("model-container");
  modelContainer.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", () => renderer.render(scene, camera));

  let loader = new GLTFLoader();
  loader.load("model/gas_turbine1.gltf", function (gltf) {
    car = gltf.scene.children[0];
    car.scale.set(250, 250, 250);
    car.traverse((child) => {
      if (child.isMesh) {
        const material = new THREE.MeshPhongMaterial({
          color: 0x333333,
          specular: 0x888888,
          shininess: 60,
        });
        child.material = material;
      }
    });

    scene.add(gltf.scene);
    animate();
  });
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
