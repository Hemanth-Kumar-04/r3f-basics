import { useRef, useState, useSyncExternalStore } from "react";
import "./App.css";
import { Canvas, events, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Cube = ({ position, size, color }) => {
  const ref = useRef()
  const [isHovered,setIsHovered] = useState(false)

 useFrame((state,delta)=>{
    ref.current.rotation.x +=delta; {/*delta is the difference of time between the initial state and the final state */}
    ref.current.rotation.y +=delta * 2.0;
    ref.current.position.z +=delta;
    ref.current.position.z = Math.sin(state.clock.elapsedTime)*2
    console.log(delta)
    const speed = isHovered ? 1:0.4
    ref.current.rotation.y += delta*speed
  }) 

  return (
    <mesh position={position} ref={ref} onPointerEnter={(event)=>{event.stopPropagation(),setIsHovered(true)}}  onPointerLeave={()=>setIsHovered(false)}>
      <boxGeometry args={size} />{" "}
      {/* args= {[2,2,4]} is to change the size // a 3d cube been imported changing the size */}
      <meshStandardMaterial color={isHovered ? "orange" : "lightblue"} />{" "}
      {/*//the object will be black coz we have to give lighting*/}
      {/* <meshBasicMaterial/> this shows a white object */}
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} />
      <ambientLight /> {/* this light illumniates all the sides*/}
      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]} />
        <Cube position={[-1, 0, 0]} color={"hotpink"} size={[1, 1, 1]} />
        <Cube position={[1, 2, 0]} color={"blue"} size={[1, 1, 1]} />
        <Cube position={[-1, 2, 0]} color={"yellow"} size={[1, 1, 1]} />
      </group>
*/}
      <Cube position={[0,0,0]} size={[1,1,1]} color={"orange"} / >
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default App;
