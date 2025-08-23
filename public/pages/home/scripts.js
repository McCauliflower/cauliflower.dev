const homepageScripts = [
    { src: '/components/head/inject-head.js', type: 'text/javascript' },
    { src: '/components/nav-menu/nav-menu.js', type: 'module' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js' },
    { src: '/lib/perlin.js' },
    { src: '/lib/three.js' },
    { src: '/lib/OrbitControls.js' },
    { src: '/pages/home/main.js' }
];

export default homepageScripts;