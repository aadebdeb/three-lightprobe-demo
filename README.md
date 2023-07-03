# Three.js LightProbe Demo

## LightProbe from equirectangular environment image

```javascript
const texture = await new TextureLoader().loadAsync('/environment.jpg')
texture.colorSpace = SRGBColorSpace
const cube = new WebGLCubeRenderTarget(256).fromEquirectangularTexture(renderer, texture)
const lightProbe = LightProbeGenerator.fromCubeRenderTarget(renderer, cube)
scene.add(lightProbe)
```

## LightProbe from coefficients of spherical harmonics

```javascript
const lightProbe = new LightProbe(new SphericalHarmonics3().fromArray([
  ... // coefficients from originalLightProbe.sh.toArray()
]))
```

---

Enviroment image from https://polyhaven.com/