import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CameraController from "./CameraController";
import ControlledCube from "./ControlledCube";
import FollowerCube from "./FollowerCube";
import HouseWithDoor from "./HouseWithDoor";   // <-- NEW IMPORT
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function Scene() {
  const playerRef = useRef();

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas style={{ width: "100%", height: "100vh" }} camera={{ fov: 35 }}>
        <CameraController />
        <OrbitControls enableRotate={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        {/* Physics world */}
        <Physics
          onCollisionEnter={(ev) => {
            const collider = ev.colliderObject?.name;
            const body = ev.rigidBodyObject?.name;

            if (collider === "door" && body === "player") {
              console.log("Player entered the house!");
              // TODO: teleport, fade animation, interior scene, etc.
            }
          }}
        >
          {/* Ground */}
          <RigidBody type="fixed">
            <mesh position={[0, -0.5, 0]}>
              <boxGeometry args={[100, 1, 100]} />
              <meshStandardMaterial color="#444" />
            </mesh>
          </RigidBody>

          {/* House with a real door opening */}
          <HouseWithDoor position={[0, 0, 10]} />

          {/* Player cube */}
          <ControlledCube ref={playerRef} name="player" />

          {/* Follower cube */}
          <FollowerCube targetRef={playerRef} />
        </Physics>
      </Canvas>
    </div>
  );
}
