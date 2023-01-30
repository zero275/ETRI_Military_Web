import {
  Route,
  Routes,
  useLocation,
  useParams,
  NavLink,
  Navigate,
} from "react-router-dom";
import { Layout, Menu, Spin } from "antd";
import React, { Suspense } from "react";
import MyLayout from "./components/MyLayout";
import Home from "./pages/home";
import NavBar from "./components/NavBar";

import Login from "./pages/Login/login";
import IsUserLoggedIn from "./util/IsUserLoggedIn";
import { useStoreAuth } from "./store/authStore";
import { useStoreName } from "./store/namesStore";
import ErrorPage from "./components/ErrorPage";
import RequireAuth from "./util/RequireAuth";

const Total = React.lazy(() => import("./pages/Total/total"));
const Daily_Activity = React.lazy(() =>
  import("./pages/Daily_Activity/daily_Activity")
);
const Stamina_Management = React.lazy(() =>
  import("./pages/Stamina_Management/stamina_Management")
);
const Behavioral_Management = React.lazy(() =>
  import("./pages/Behavioral_Management/behavioral_Management")
);
const Injury_Safety = React.lazy(() =>
  import("./pages/Injury_Safety/injury_Safety.")
);
const Military_Forces_Adaptability = React.lazy(() =>
  import("./pages/Military_Forces_Adaptability/military_Forces_Adaptability")
);

const { Content, Sider } = Layout;
const { Item, SubMenu } = Menu;

function App() {
  const auth = useStoreAuth((state) => state.auth);
  const setAuth = useStoreAuth((state) => state.setAuth);
  const nameList = useStoreName((state) => state.nameList);
  return (
    <>
      <Layout>
        {auth && <NavBar />}
        <Layout>
          <Content
            style={{
              margin: "2em 2em",
              minHeight: 280,
            }}
          >
            <Suspense
              fallback={
                <div className="spin_wr">
                  <Spin size="large" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<MyLayout />}>
                  {/* 로그인 페이지 접속 시*/}
                  <Route element={<IsUserLoggedIn auth={auth} />}>
                    <Route path="/login" element={<Login />} />
                  </Route>
                  {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}

                  {/* 종합지수 */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={auth?.employee_number} />
                    }
                  >
                    <Route path="/Total" element={<Total />} />
                  </Route>

                  {/* 데일리 활동량 */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={auth?.employee_number} />
                    }
                  >
                    <Route
                      path="/Daily_Activity"
                      element={<Daily_Activity />}
                    />
                  </Route>

                  {/* 체력관리 */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={auth?.employee_number} />
                    }
                  >
                    <Route
                      path="/Stamina_Management"
                      element={<Stamina_Management />}
                    />
                  </Route>

                  {/* 행동심리 */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={auth?.employee_number} />
                    }
                  >
                    <Route
                      path="/Behavioral_Management"
                      element={<Behavioral_Management />}
                    />
                  </Route>

                  {/* 부상안전도 */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={auth?.employee_number} />
                    }
                  >
                    <Route path="/Injury_Safety" element={<Injury_Safety />} />
                  </Route>

                  {/* 복무적응도 */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={auth?.employee_number} />
                    }
                  >
                    <Route
                      path="/Military_Forces_Adaptability"
                      element={<Military_Forces_Adaptability />}
                    />
                  </Route>

                  {/* 우회 */}
                  <Route
                    element={
                      <RequireAuth allowedRoles={auth?.employee_number} />
                    }
                  >
                    <Route
                      path="/"
                      element={<Navigate to="/Total" replace />}
                    />
                  </Route>
                </Route>
                <Route path="/*" element={<ErrorPage auth={auth} />} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
