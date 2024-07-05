import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls;
let objToRender = 'nave';

const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    object.scale.set(30, 30, 30); 
    console.log("SCALE", object.scale);
    scene.add(object);
    object.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set('#6f00ff'); 
      }
    });

    const boundingBox = new THREE.Box3().setFromObject(object);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());

    controls.target.copy(center);
    controls.update();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = objToRender === "nave" ? -157.80427357302023 : 500;
camera.position.y = objToRender === "nave" ? 30.46264913377967 : 500;
camera.position.x = objToRender === "nave" ? -2.514170870937614 : 500;

console.log(camera.position.z)

const topLight = new THREE.DirectionalLight('#333', 10); 
topLight.position.set(0, 100, 30); 
topLight.intensity = 10; 
topLight.castShadow = true;
topLight.visible = false;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

let isLightOn = false;

document.getElementById("toggleButton").addEventListener("click", function() {
    toggleButton();
});

function toggleButton() {
    isLightOn = !isLightOn;
    topLight.visible = isLightOn;

    const button = document.getElementById("toggleButton");
    button.classList.toggle("active", isLightOn);

    const buttonOn = document.getElementById("button-on");
    const buttonOff = document.getElementById("button-off");

    if (isLightOn) {
        buttonOn.style.display = "block";
        buttonOff.style.display = "none";
    } else {
        buttonOn.style.display = "none";
        buttonOff.style.display = "block";
    }
}

if (objToRender === "nave") {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false
  controls.addEventListener('change', function () {
    console.log("Posição Z da câmera:", camera.position.z);
    console.log("Posição y da câmera:", camera.position.y);
    console.log("Posição x da câmera:", camera.position.x);
  });
  }

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();