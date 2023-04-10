import {
  CineonToneMapping,
  PCFSoftShadowMap,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from "three/src/Three";
import { Camera } from "./Camera";
import { Engine } from "./Engine";
import { Sizes } from "./utils/Sizes";

export class Renderer {
  experience: Engine;
  canvas: HTMLCanvasElement;
  sizes: Sizes;
  scene: Scene;
  camera: Camera;
  instance!: WebGLRenderer;

  constructor() {
    this.experience = new Engine();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: this.canvas ? this.canvas : undefined,
      antialias: true,
    });
    if (!this.canvas) {
      this.canvas = this.instance.domElement;
      this.experience.canvas = this.instance.domElement;
    }
    // @ts-ignore
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = sRGBEncoding;
    this.instance.toneMapping = CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
