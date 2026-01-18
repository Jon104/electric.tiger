import { RigidBody } from "@react-three/rapier";
import { Edges } from "@react-three/drei";

export default function HouseWithDoor({ position = [0, 0, 10] }) {
  const wallThickness = 0.2;
  const width = 5;
  const height = 5;
  const depth = 5;
  const doorWidth = 1.2;
  const doorHeight = 2;

  return (
    <group position={position}>
      {/* LEFT WALL */}
      <RigidBody type="fixed">
        <mesh position={[-width / 2, height / 2, 0]}>
          <boxGeometry args={[wallThickness, height, depth]} />
          <meshStandardMaterial color="black" />
          <Edges color="white" />
        </mesh>
      </RigidBody>

      {/* RIGHT WALL */}
      <RigidBody type="fixed">
        <mesh position={[width / 2, height / 2, 0]}>
          <boxGeometry args={[wallThickness, height, depth]} />
          <meshStandardMaterial color="black" />
          <Edges color="white" />
        </mesh>
      </RigidBody>

      {/* BACK WALL */}
      <RigidBody type="fixed">
        <mesh position={[0, height / 2, -depth / 2]}>
          <boxGeometry args={[width, height, wallThickness]} />
          <meshStandardMaterial color="black" />
          <Edges color="white" />
        </mesh>
      </RigidBody>

      {/* FRONT WALL - TWO PIECES (door gap) */}
      {/* LEFT SIDE OF DOOR */}
      <RigidBody type="fixed">
        <mesh position={[-(width / 2 - doorWidth / 2), height / 2, depth / 2]}>
          <boxGeometry args={[width / 2 - doorWidth / 2, height, wallThickness]} />
          <meshStandardMaterial color="black" />
          <Edges color="white" />
        </mesh>
      </RigidBody>

      {/* RIGHT SIDE OF DOOR */}
      <RigidBody type="fixed">
        <mesh position={[(width / 2 - doorWidth / 2), height / 2, depth / 2]}>
          <boxGeometry args={[width / 2 - doorWidth / 2, height, wallThickness]} />
          <meshStandardMaterial color="black" />
          <Edges color="white" />
        </mesh>
      </RigidBody>

      {/* ROOF */}
      <RigidBody type="fixed">
        <mesh position={[0, height + 0.1, 0]}>
          <boxGeometry args={[width, wallThickness, depth]} />
          <meshStandardMaterial color="black" />
          <Edges color="white" />
        </mesh>
      </RigidBody>

      {/* DOOR TRIGGER (not a wall, detects entering) */}
      <RigidBody type="fixed" sensor name="door">
        <mesh position={[0, 1, depth / 2 + 0.1]}>
          <boxGeometry args={[doorWidth, doorHeight, 0.2]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </RigidBody>
    </group>
  );
}
