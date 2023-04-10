import { Mesh, Scene } from "three/src/Three";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { Debug } from "./utils/Debug";
import { Resources } from "./utils/Resources";
import { Sizes } from "./utils/Sizes";
import { Time } from "./utils/Time";

export class Engine {
  public canvas!: HTMLCanvasElement;
  public debug!: Debug;
  public sizes!: Sizes;
  public time!: Time;
  public resources!: Resources;
  public scene!: Scene;
  public camera!: Camera;
  public renderer!: Renderer;

  protected static instance: Engine;

  constructor(canvas?: HTMLCanvasElement) {
    // @ts-ignore
    if (Engine.instance) {
      // @ts-ignore
      return Engine.instance;
    }

    canvas && (this.canvas = canvas);

    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.resources = new Resources();
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    this.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
