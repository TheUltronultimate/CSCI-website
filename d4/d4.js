import '../style.css'
import * as THREE from 'three';
import { getRandomFloat } from '../random';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
//Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.render( scene, camera );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.setZ(30);

//Light
const light = new THREE.PointLight( 0x404040 );
light.position.set(50, 50, 50);
scene.add(light);

//background 

const spaceTexture = new THREE.TextureLoader().load('/../artFiles/space.jpg');
scene.background = spaceTexture;
//texture
const fire_texture = new THREE.TextureLoader().load('fire_texture.JPG')
//d6 3D object
const d4 = new THREE.Mesh(
    new THREE.TetrahedronGeometry(10),
    new THREE.MeshNormalMaterial()
);


scene.add(d4);

// Create Stars
function addStar() {
    const geometry  = new THREE.SphereGeometry(0.2, 24, 24);
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y , z);
    scene.add(star)
}

//Set up star array
let stars = Array(150).fill().forEach(addStar)

//Speed Setups
let spinSpeedX = 0.006
let spinSpeedY = 0.006
let spinSpeedZ = 0.006


//cooldown
let count = 0

//to move around 3D space
const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame( animate );
    //stars.forEach(animateStar()
    d4.rotation.x += spinSpeedX
    d4.rotation.y += spinSpeedY
    d4.rotation.z += spinSpeedZ

    
   

 
    window.onmousedown = (e) => {
        // check for mouse click and randomly modify spin speeds
        console.log("click")
if (spinSpeedX > 0.007 && spinSpeedY > 0.007 && spinSpeedZ > 0.007){ 
        console.log('wait for cooldown')
} else {
        //assigns random spin value to each dimension
        count = 0 // timer to keep track of cooldown
        spinSpeedX = getRandomFloat(0.1, 0.2, 4);
        spinSpeedY = getRandomFloat(0.1, 0.2, 4);
        spinSpeedZ = getRandomFloat(0.1, 0.2, 4);
        

}


}

if (count >= 120) {
    /*verifies whether the cooldown is over, stopping the die entirely*/
        spinSpeedX = 0.006
        spinSpeedY = 0.006
        spinSpeedZ = 0.006
}
count++

if (spinSpeedX > 0 && spinSpeedY > 0 && spinSpeedZ > 0  && count < 120){
         console.log(count)
         // Decreases speed gradually
         spinSpeedX -= 0.005
         spinSpeedY -= 0.005
         spinSpeedZ -= 0.005
         console.log([spinSpeedX, spinSpeedY, spinSpeedZ])
}
renderer.render( scene, camera );
}

animate();