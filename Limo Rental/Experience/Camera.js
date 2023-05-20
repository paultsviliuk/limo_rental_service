import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from "./Experience";

export default class Camera{
    constructor(){
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;

    // Debug
    if(this.debug.active) {
        this.debugFolder = this.debug.ui.addFolder('camera');
      }
    
      // Setup
      this.createPerspectiveCamera();
      this.createOrthographicCamera();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
          35,
          this.sizes.aspect,
          0.1,
          1000
        )
        this.scene.add(this.perspectiveCamera)
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustum) / 2,
            (this.sizes.aspect * this.sizes.frustum) / 2,
            this.sizes.frustum  / 2,
            -this.sizes.frustum  / 2,
            -10,
            10
        )
        this.scene.add(this.perspectiveCamera)
    }

    resize() {
        // Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()
    
        // Updating Orthographic Camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustum) / 2
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustum) / 2
        this.orthographicCamera.top = this.sizes.frustum / 2
        this.orthographicCamera.bottom = -this.sizes.frustum / 2
        this.orthographicCamera.updateProjectionMatrix()
      }
}