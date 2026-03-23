import { useEffect, useRef, useState } from "react";
import { init,detect } from "../utils/utils";
export default function FaceExpression({onClick= ()=>{ }}) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
   const streamRef = useRef(null)
  const [expression, setExpression] = useState("Detecting...");

  

  useEffect(() => {
  
    init({landmarkerRef,videoRef, streamRef});

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  },[]);

   async function handleClick() {
        const expression = detect({ landmarkerRef, videoRef, setExpression })
        console.log(expression)
        onClick(expression)
    }

  return (
    <div style={{ textAlign: "center",display:"flex", flexDirection:"column",  justifyContent: "center",alignItems: "center", height: "100vh"}}>
      <video
        ref={videoRef}
        style={{ width: "700px", borderRadius: "12px" }}
        playsInline
      />
      <h2>{expression}</h2>
      <button style={{padding:"10px 5px",color:"white",background:"black", border:"none",outline:"none",cursor:"pointer",fontSize:"1rem"}}onClick={handleClick}>Detect Expression</button>
    </div>
  );
}