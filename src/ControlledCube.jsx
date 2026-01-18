import { forwardRef, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { Edges } from "@react-three/drei";

const ControlledCube = forwardRef((props, ref) => {
  const cubeRef = useRef();
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => (keys.current[e.key.toLowerCase()] = true);
    const up = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(() => {
    if (!cubeRef.current) return;
    let x = 0, z = 0;
    const speed = 2;
    if (keys.current["w"] || keys.current["arrowup"]) z -= speed;
    if (keys.current["s"] || keys.current["arrowdown"]) z += speed;
    if (keys.current["a"] || keys.current["arrowleft"]) x -= speed;
    if (keys.current["d"] || keys.current["arrowright"]) x += speed;

    cubeRef.current.setLinvel({ x, y: 0, z });
  });

  // Expose the RigidBody ref to parent
  return (
    <RigidBody
      ref={(r) => {
        cubeRef.current = r;
        if (ref) ref.current = r;
      }}
      mass={1}
      friction={1}
      linearDamping={2}
      position={[0, 0.25, 0]}
    >
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="hotpink" />
        <Edges color="black" threshold={1} />
      </mesh>
    </RigidBody>
  );
});

export default ControlledCube;
