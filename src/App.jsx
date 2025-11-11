import React, { useState } from "react";

import Form from "./Form"; 
import "./App.css";
 import NewApp from "./NewApp";
 import  Exe from "./Exc";
  import Word from "./Word";
  import Excel from "./Excel";
 import Img from "./img";
 import Pdf from "./Pdf";
export default function App() {
  const [tool, setTool] = useState(null);

  return (
    <>
<Form/>
{/*    
    <Img/>
    <Word/>
    <Pdf/>
    <Excel/> */}
    
    
   

      
    </>
  );
}

