import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import CreatePage from "../pages/Createpage"
import Homepage from "../pages/Homepage"
import Navbar from "../components/Navbar"


function App() {

  return (
    <>
      <Box minH={"100vh"} bg={{_dark: "cyan.950", base: "white"}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/create" element={<CreatePage/>} />
        </Routes>
      </Box>
    </>
  )
}

export default App
