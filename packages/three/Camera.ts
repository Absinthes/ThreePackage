import { PerspectiveCamera, Scene } from "three/src/Three";
import { Engine } from "./Engine";
import { Sizes } from "./utils/Sizes";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Camera {
  public engine: Engine;
  public sizes: Sizes;
  public scene: Scene;
  public canvas: HTMLCanvasElement;
  public instance!: PerspectiveCamera;
  public controls!: OrbitControls;

  constructor(fov = 45, near = 0.1, far = 100) {
    this.engine = new Engine();
    this.sizes = this.engine.sizes;
    this.scene = this.engine.scene;
    this.canvas = this.engine.canvas;

    this.setInstance(fov, this.sizes.width / this.sizes.height, near, far);
    this.setControls();
  }

  setInstance(fov: number, aspect: number, near: number, far: number) {
    this.instance = new PerspectiveCamera(fov, aspect, near, far);
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
