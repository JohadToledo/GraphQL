import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "./App.css";
import MenuBar from "./components/MenuBar";
import { AuthProvider } from "./context/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import AuthRoute from "./util/AuthRoute";
<link
  async
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
/>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            ></Route>
            <Route
              exact
              path="/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
              ></Route>
              <Route exact path="/posts/:id" element={<SinglePost />}></Route>
            </Routes>
            </Container>
            </BrowserRouter>
            </AuthProvider>
  );
}

export default App;
