import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"

const state = proxy({
  current: null,
  items: {
    Seat_Main: "#171717",
    Seat_Side: "#ff5b00",
    Seat_Mid_Design: "#0552b5",
    Stritch_front: "#e78704",
    Stritch_Back: "#e78000",
    Stritch_Mid_Main: "#e3e7d0",
    Stritch_mid_design: "#3f8fe7",
  },
})

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Shoe />
        <Environment preset="city" />
        <ContactShadows position={[0, -0.8, 0]} opacity={0.5} scale={10} blur={1.5} far={0.8} />
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
    </>
  )
}

function Shoe() {
  const ref = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("Vendetta.glb")

  const [hovered, set] = useState(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // ref.current.rotation.set(Math.cos(t / 4) / 8 + 0.8, Math.sin(t / 4) / 8 + 0.3, -0.2 - (1 + Math.sin(t / 1.5)) / 20 - 0.2)
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])

  return (
    <group
      ref={ref}
      scale={0.5}
      rotation={[0.9, 0.8, -0.2]}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.mesh002.geometry}
        material={materials.Seat_Main}
        material-color={snap.items.Seat_Main}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.mesh002_1.geometry}
        material={materials.Seat_Side}
        material-color={snap.items.Seat_Side}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.mesh002_2.geometry}
        material={materials.Seat_Mid_Design}
        material-color={snap.items.Seat_Mid_Design}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.mesh002_3.geometry}
        material={materials.Stritch_front}
        material-color={snap.items.Stritch_front}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.mesh002_4.geometry}
        material={materials.Stritch_Back}
        material-color={snap.items.Stritch_Back}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.mesh002_5.geometry}
        material={materials.Stritch_Mid_Main}
        material-color={snap.items.Stritch_Mid_Main}
      />
      <mesh
        receiveShadow
        castShadow
        geometry={nodes.mesh002_6.geometry}
        material={materials.Stritch_mid_design}
        material-color={snap.items.Stritch_mid_design}
      />
      {/* <mesh receiveShadow castShadow geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={snap.items.patch} /> */}
    </group>
  )
}

function Picker() {
  const snap = useSnapshot(state)
  return (
    <>
      <h1>{snap.current ? snap.current.split('_').join(' ') :'Seat'}</h1>
      <div style={{ display: snap.current ? "block" : "none" }}>
        <HexColorPicker
          className="picker"
          color={snap.items[snap.current]}
          onChange={(color) => (state.items[snap.current] = color)}
        />

        <div className="side-elements" style={{ top: "8rem" }}>
          Seat Main
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
              boxShadow: "1px 2px 3px #000000",
              backgroundColor: snap.items.Seat_Main,
            }}
            onClick={(e) => (
              e.stopPropagation(), (state.current = "Seat_Main")
            )}
          ></div>
        </div>
        <div className="side-elements" style={{ top: "12rem" }}>
          Seat Mid Design
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
              boxShadow: "1px 2px 3px #000000",
              backgroundColor: snap.items.Seat_Mid_Design,
            }}
            onClick={(e) => (
              e.stopPropagation(), (state.current = "Seat_Mid_Design")
            )}
          ></div>
        </div>
        <div className="side-elements" style={{ top: "16rem" }}>
          Seat Side
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
              boxShadow: "1px 2px 3px #000000",
              backgroundColor: snap.items.Seat_Side,
            }}
            onClick={(e) => (
              e.stopPropagation(), (state.current = "Seat_Side")
            )}
          ></div>
        </div>
        <div className="side-elements" style={{ top: "20rem" }}>
          Stritch Back
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
              boxShadow: "1px 2px 3px #000000",
              backgroundColor: snap.items.Stritch_Back,
            }}
            onClick={(e) => (
              e.stopPropagation(), (state.current = "Stritch_Back")
            )}
          ></div>
        </div>
        <div className="side-elements" style={{ top: "24rem" }}>
          Stritch Mid Main
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
              boxShadow: "1px 2px 3px #000000",
              backgroundColor: snap.items.Stritch_Mid_Main,
            }}
            onClick={(e) => (
              e.stopPropagation(), (state.current = "Stritch_Mid_Main")
            )}
          ></div>
        </div>
        <div className="side-elements" style={{ top: "28rem" }}>
          Stritch front
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
              boxShadow: "1px 2px 3px #000000",
              backgroundColor: snap.items.Stritch_front,
            }}
            onClick={(e) => (
              e.stopPropagation(), (state.current = "Stritch_front")
            )}
          ></div>
        </div>
        <div className="side-elements" style={{ top: "32rem" }}>
          Stritch mid design
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "0.6rem",
              cursor: "pointer",
              boxShadow: "1px 2px 3px #000000",
              backgroundColor: snap.items.Stritch_mid_design,
            }}
            onClick={(e) => (
              e.stopPropagation(), (state.current = "Stritch_mid_design")
            )}
          ></div>
        </div>
      </div>
    </>
  );
}
