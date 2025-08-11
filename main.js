const scene = new THREE.Scene();
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const cameraGroup = new THREE.Group();
const camera = new THREE.PerspectiveCamera(
	45, // field of view
	window.innerWidth / window.innerHeight, // aspect ratio
	1, // near clipping plane
	1000 // far clipping plane
);

const GEO_TYPES = [
	'box', 
	'cone', 
	'cylinder', 
	'octahedron', 
	'sphere',
	'tetrahedron',
	'torus',
	'torusKnot'
];

// Event handler for clicks
function onClick(event) {
  // Normalize mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // Find all objects the ray intersects
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
	const clickedObject = intersects[0].object;
    // Check if the clicked object is our named cube
    if (GEO_TYPES.includes(clickedObject.name)) {
        // Hide the object that was clicked on
        clickedObject.visible = false; 

        // Make sure the cauliflower object exists
        if (cauliflower) {
            // Set the cauliflower's position to the clicked object's position
            cauliflower.position.copy(clickedObject.position);
            // Make the cauliflower visible
            cauliflower.visible = true; 
        }
    }
  }
}

function init() {
	// const gui = new dat.GUI();


	// initialize objects
	const objMaterial = getMaterial('standard', 'rgb(255, 255, 255)');

	const geoTypes = GEO_TYPES;

	geoTypes.forEach(function(type) {
		const geo = getGeometry(type, 5, objMaterial);
		scene.add(geo);
		scene.background
	});

	const lightLeft = getSpotLight(1, 'rgb(255, 220, 180)');
	const lightRight = getSpotLight(1, 'rgb(255, 220, 180)');
	const lightBottom = getPointLight(0.33, 'rgb(255, 220, 150)');

	lightLeft.position.x = -5;
	lightLeft.position.y = 2;
	lightLeft.position.z = -4;

	lightRight.position.x = 5;
	lightRight.position.y = 2;
	lightRight.position.z = -4;

	lightBottom.position.x = 0;
	lightBottom.position.y = 10;
	lightBottom.position.z = 0;

	// load the environment map
	const path = '/assets/cubemap/';
	const format = '.png';
	const fileNames = ['nx', 'ny', 'nz', 'px', 'py', 'pz'];

	const reflectionCube = new THREE.CubeTextureLoader().load(fileNames.map(function(fileName) {
		return path + fileName + format;
	}));
	scene.background = reflectionCube;

	// manipulate materials
	// OLD const loader = new THREE.TextureLoader();
	const loader = new THREE.OBJLoader();
	const textureLoader = new THREE.TextureLoader();

	objMaterial.roughnessMap = textureLoader.load('/assets/textures/scratch.jpg');
	objMaterial.bumpMap = textureLoader.load('/assets/textures/scratch.jpg');
	objMaterial.bumpScale = 0.01;
	objMaterial.envMap = reflectionCube;

	objMaterial.roughness = 0.5;
	objMaterial.metalness = 0.7;

	const maps = ['bumpMap', 'roughnessMap'];
	maps.forEach(function(map) {
		const texture = objMaterial[map];
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1, 1);
	});

	// // dat.gui
	// const folder1 = gui.addFolder('light_1');
	// folder1.add(lightLeft, 'intensity', 0, 10);
	// folder1.add(lightLeft.position, 'x', -5, 15);
	// folder1.add(lightLeft.position, 'y', -5, 15);
	// folder1.add(lightLeft.position, 'z', -5, 15);

	// const folder2 = gui.addFolder('light_2');
	// folder2.add(lightRight, 'intensity', 0, 10);
	// folder2.add(lightRight.position, 'x', -5, 15);
	// folder2.add(lightRight.position, 'y', -5, 15);
	// folder2.add(lightRight.position, 'z', -5, 15);

	// const folder3 = gui.addFolder('materials');
	// folder3.add(sphereMaterial, 'roughness', 0, 1);
	// folder3.add(planeMaterial, 'roughness', 0, 1);
	// folder3.add(sphereMaterial, 'metalness', 0, 1);
	// folder3.add(planeMaterial, 'metalness', 0, 1);
	// folder3.open();

	// add other objects to the scene
	scene.add(lightLeft);
	scene.add(lightRight);
	scene.add(lightBottom);

	// camera
	camera.position.z = 20;
	camera.position.x = 0;
	camera.position.y = 5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	cameraGroup.add(camera);
	cameraGroup.name = 'sceneCameraGroup';
	scene.add(cameraGroup);

	// renderer
	const renderer = new THREE.WebGLRenderer();
	const canvas = document.querySelector('#scene-container');
	renderer.setSize(window.innerWidth, window.innerHeight - 50);
	// Add the event listener to the renderer's canvas
	renderer.domElement.addEventListener('click', onClick, false);
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.shadowMap.enabled = true;
	canvas.appendChild(renderer.domElement);

	const controls = new THREE.OrbitControls( camera, renderer.domElement );


	update(renderer, scene, camera, clock);

	return scene;
}

function getGeometry(type, size, material) {
	let geometry;
	const segmentMultiplier = 1;

	switch (type) {
		case 'box':
			geometry = new THREE.BoxGeometry(size, size, size);
			break;
		case 'cone':
			geometry = new THREE.ConeGeometry(size, size, 256*segmentMultiplier);
			break;
		case 'cylinder':
			geometry = new THREE.CylinderGeometry(size, size, size, 32*segmentMultiplier);
			break;
		case 'octahedron':
			geometry = new THREE.OctahedronGeometry(size);
			break;
		case 'sphere':
			geometry = new THREE.SphereGeometry(size, 32*segmentMultiplier, 32*segmentMultiplier);
			break;
		case 'tetrahedron':
			geometry = new THREE.TetrahedronGeometry(size);
			break;
		case 'torus':
			geometry = new THREE.TorusGeometry(size/2, size/4, 16*segmentMultiplier, 100*segmentMultiplier);
			break;
		case 'torusKnot':
			geometry = new THREE.TorusKnotGeometry(size/2, size/6, 256*segmentMultiplier, 100*segmentMultiplier);
			break;
		default:
			break;
	}

	const obj = new THREE.Mesh(geometry, material);
	obj.castShadow = true;
	obj.name = type;
	console.log('type', type)

	return obj;
}

function getMaterial(type, color) {
	let selectedMaterial;
	const materialOptions = {
		color: color === undefined ? 'rgb(255, 255, 255)' : color,
	};

	switch (type) {
		case 'basic':
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
		case 'lambert':
			selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
			break;
		case 'phong':
			selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
			break;
		case 'standard':
			selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
			break;
		default: 
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
	}

	return selectedMaterial;
}

function getPointLight(intensity, color) {
	const light = new THREE.PointLight(color, intensity);
	light.castShadow = true;

	return light;
}

function getSpotLight(intensity, color) {
	color = color === undefined ? 'rgb(255, 255, 255)' : color;
	const light = new THREE.SpotLight(color, intensity);
	light.castShadow = true;
	light.penumbra = 0.5;

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 1024;  // default: 512
	light.shadow.mapSize.height = 1024; // default: 512
	light.shadow.camera.near = 0.1;       // default
	light.shadow.camera.far = 500      // default
	light.shadow.camera.fov = 30      // default
	light.shadow.bias = 0.001;

	return light;
}

function update(renderer, scene, camera, clock) {
	// rotate camera around the origin
	const sceneCameraGroup = scene.getObjectByName('sceneCameraGroup');
	if (sceneCameraGroup) {
		sceneCameraGroup.rotation.y += 0.005;
	}
	

	// switch between objects
	const geoTypes = GEO_TYPES;

	const currentIndex = Math.floor((clock.getElapsedTime() / 2) % geoTypes.length);
	geoTypes.forEach(function(geo, index) {
		const currentObj = scene.getObjectByName(geo);
		if (index === currentIndex) {
			currentObj.visible = true;
		} else {
			currentObj.visible = false;
		}
	})

	renderer.render(scene, camera);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, clock);
	});
}

scene = init();
