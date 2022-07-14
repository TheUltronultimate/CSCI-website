import './style.css'
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Set up Scene, Camera and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


//Light
const light = new THREE.PointLight( 0x404040 )
scene.add(light)

//background 

const spaceTexture = new THREE.TextureLoader().load('artFiles/space.jpg');
scene.background = spaceTexture;


camera.position.setZ(30)

renderer.render(scene, camera)

// Create Stars
function addStar() {
    const geometry  = new THREE.SphereGeometry(0.2, 24, 24);
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300))
    star.position.set(x, y , z);
    scene.add(star)
}

//Set up star array
let stars = Array(2000).fill().forEach(addStar)

//to move around 3D space
const controls = new OrbitControls(camera, renderer.domElement);



//scrolling
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t* -0.2;
    camera.position.x = t * -0.002;
    camera.position.y = t * -0.002;
}

document.body.onscroll = moveCamera
function animate() {
	requestAnimationFrame( animate );0
    //stars.forEach(animateStar()
	renderer.render( scene, camera );
}
animate();







