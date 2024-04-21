//Imports
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.set(0, 90, 350);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x2596be, 1); // Set background color
document.body.appendChild(renderer.domElement);

//Controls and lighting
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
const ambientLight = new THREE.AmbientLight(0xffffff, 2.75);
scene.add(ambientLight);

//Loading 3D models
const loader = new GLTFLoader();
let boatModel;
let islandModel;

loader.load(
    'low_poly_island/scene.gltf',//Getting the island model
    (gltf) => {
        islandModel = gltf.scene;
        scene.add(islandModel);

        //Position the island
        islandModel.position.x -= 0;
        islandModel.position.y -= 0;
        islandModel.position.z -= 0;
        islandModel.scale.set(75, 75, 75); // Scale up the island

        render();
    },
);
loader.load(
    'Boat/scene.gltf',//Getting the boat model
    (gltf) => {
        boatModel = gltf.scene;
        scene.add(boatModel);

        //Position the boat
        boatModel.rotation.y = 1.6;//rotate the boat
        boatModel.position.x = 0;
        boatModel.position.y = 38;
        boatModel.position.z = 180;
        boatModel.scale.set(0.1, 0.1, 0.1); // Scale down the boat

        render();
    },
);


//Resize window
function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', windowResize);

function render() {
    requestAnimationFrame(render);
    controls.update();

    if (boatModel) { // Check if the boat model is loaded
        boatModel.rotation.x = 0.075 * Math.sin(Date.now() / 500); // Add a rocking motion to boat
    }

    if (islandModel) { // Check if the island model is loaded
        islandModel.rotation.y -= 0.0003; // Rotate the island model around its y axis
    }

    renderer.render(scene, camera);
}


render();
