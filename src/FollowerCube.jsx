import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Edges } from "@react-three/drei";

export default function FollowerCube({ targetRef }) {
  const followerRef = useRef();
  const wanderTarget = useRef({ x: 0, z: 0 });
  const nextUpdate = useRef(Date.now());

  useFrame(() => {
    if (!followerRef.current || !targetRef?.current) return;

    const playerPos = targetRef.current.translation();
    const now = Date.now();

    // Update random wander target every 2 seconds
    if (now > nextUpdate.current) {
      const offsetX = (Math.random() - 0.5) * 2; // random -1 to 1
      const offsetZ = (Math.random() - 0.5) * 2;
      wanderTarget.current = {
        x: playerPos.x + offsetX,
        z: playerPos.z + offsetZ,
      };
      nextUpdate.current = now + 2000;
    }

    // Current follower position
    const followerPos = followerRef.current.translation();

    // Direction to target
    const dx = wanderTarget.current.x - followerPos.x;
    const dz = wanderTarget.current.z - followerPos.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    if (distance < 0.05) return; // close enough, stop

    // Move kinematically
    const speed = 1.5;
    const step = {
      x: followerPos.x + (dx / distance) * speed * 0.016, // scale by approx frame delta
      y: 0.25,
      z: followerPos.z + (dz / distance) * speed * 0.016,
    };
    followerRef.current.setNextKinematicTranslation(step);
  });

  return (
    <RigidBody
      ref={followerRef}
      type="kinematicPosition"
      colliders="cuboid"
    >
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="green" />
        <Edges color="black" threshold={1} />
      </mesh>
    </RigidBody>
  );
}
