import EventEmitter from "./EventEmitter";
import { Source } from "@packages/types";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CubeTexture, CubeTextureLoader, Texture, TextureLoader } from "three/src/Three";

export type Loaders = {
  gltfLoader: GLTFLoader;
  textureLoader: TextureLoader;
  cubeTextureLoader: CubeTextureLoader;
};

export class Resources extends EventEmitter {
  sources: Source[];
  items: Map<string, GLTF | CubeTexture | Texture>;
  toLoad: number;
  loaded: number;
  loaders!: Loaders;

  constructor(sources: Source[] = []) {
    super();

    this.sources = sources;
    this.items = new Map();
    this.toLoad = sources.length;
    this.loaded = 0;

    this.setLoaders();
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      cubeTextureLoader: new CubeTextureLoader(),
    };
  }

  startLoading(sources?: Source[]) {
    const { gltfLoader, textureLoader, cubeTextureLoader } = this.loaders;
    if (sources) {
      this.sources = sources;
      this.toLoad = sources.length;
    }
    for (const source of this.sources) {
      if (source.type == "gltfModel") {
        gltfLoader.load(source.path, (gltf) => {
          this.sourceLoaded(source, gltf);
        });
      } else if (source.type == "cubeTexture") {
        cubeTextureLoader.load(source.path, (texture) => {
          this.sourceLoaded(source, texture);
        });
      } else if (source.type == "texture") {
        textureLoader.load(source.path, (texture) => {
          this.sourceLoaded(source, texture);
        });
      }
    }
  }

  sourceLoaded(source: Source, file: GLTF | CubeTexture | Texture) {
    this.items.set(source.name, file);
    this.loaded++;
    if (this.loaded == this.toLoad) {
      this.trigger("ready");
    }
  }
}
