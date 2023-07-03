import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  WebGLCubeRenderTarget,
  TextureLoader,
  Mesh,
  TorusKnotGeometry,
  MeshStandardMaterial,
  SRGBColorSpace,
  // SphericalHarmonics3,
  // LightProbe
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { LightProbeGenerator } from 'three/addons/lights/LightProbeGenerator.js'

const baseURL = import.meta.env.BASE_URL

async function buildThree() {
  const renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  document.body.appendChild(renderer.domElement)
  
  const scene = new Scene()
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, -50.0)
  const controls = new OrbitControls(camera, renderer.domElement)
  
  const texture = await new TextureLoader().loadAsync(`${baseURL}/environment.jpg`)
  texture.colorSpace = SRGBColorSpace
  const cube = new WebGLCubeRenderTarget(256).fromEquirectangularTexture(renderer, texture)
  const lightProbe = LightProbeGenerator.fromCubeRenderTarget(renderer, cube)
  scene.add(lightProbe)
  scene.background = cube.texture
  
  // creates LightProbe from coefficients
  // coefficients can be exported by lightProbe.sh.toArray()
  // const lightProbe = new LightProbe(new SphericalHarmonics3().fromArray([
  //   0.8857463624727963, 0.6460947316933959, 0.8268657476568466,
  //   0.5000553108013367, 0.43985045331862344, 0.6697677115761871,
  //   0.17194722076301386, 0.09725037572206181, 0.05170562861659538,
  //   0.21205270575027294, 0.11351972474516765, 0.09256375186254658,
  //   0.1016903424893733, 0.05939494804577784, 0.05679357609573472,
  //   -0.0003706245288963744, 0.005427758980942701, -0.004223602972906469,
  //   0.06463127493903933, -0.012807677309871306, -0.10838431074628804,
  //   0.08729629956287059, -0.003909478141537807, -0.07202748516874864,
  //   0.15054100688032032, 0.03475026485176827, -0.05928848411398983
  // ]))
  // scene.add(lightProbe)
  
  const mesh = new Mesh(
    new TorusKnotGeometry(10, 3, 100, 16),
    new MeshStandardMaterial()
  )
  scene.add(mesh)
  
  function handleResize() {
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', handleResize)
  
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }
  
  animate()
}

buildThree()