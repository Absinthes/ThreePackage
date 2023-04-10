import { Pane } from "tweakpane";

export class Debug {
  public active: boolean;
  public ui: Pane;
  constructor() {
    this.active = window.location.hash == "#debug";
    this.ui = new Pane();
  }
}
