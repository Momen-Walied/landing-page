import { Points } from "three"
import { Object3DNode } from "@react-three/fiber"

declare global {
  namespace ReactThreeFiber {
    interface IntrinsicElements {
      points: Object3DNode<Points, typeof Points>
    }
  }
}

export {}
