export interface SourceTypeInterface {
  texture: "texture";
  cubeTexture: "cubeTexture";
  gltfModel: "gltfModel";
}

export type SourceType = keyof SourceTypeInterface;

export type TextureSource = {
  name: string;
  type: SourceTypeInterface["texture"];
  path: string;
};

export type CubeTextureSource = {
  name: string;
  type: SourceTypeInterface["cubeTexture"];
  path: string[];
};

export type GltfModelSource = {
  name: string;
  type: SourceTypeInterface["gltfModel"];
  path: string;
};

export type Source = TextureSource | CubeTextureSource | GltfModelSource;
