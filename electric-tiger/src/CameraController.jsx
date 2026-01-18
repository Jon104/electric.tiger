import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(10, 15, 10); // position iso
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}
