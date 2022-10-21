import { React } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContexts";
import CategoryAddNew from "./module/category/CategoryAddNew";
import CategoryHistory from "./module/category/CategoryHistory";
import Addpost from "./module/post/Addpost";
import DashBoardPage from "./pages/DashBoardPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CategoryUpdate from "./module/category/CategoryUpdate";
import ListUser from "./module/user/ListUser";
import UserAddNew from "./module/user/UserAddNew";
import UserUpdate from "./module/user/UserUpdate";
import HistoryPost from "./module/post/HistoryPost";
import UpdatePost from "./module/post/UpdatePost";
import DetailsPagePost from "./module/post/DetailsPagePost";
function App() {
  return (
    <div className="w-full overflow-hidden">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          <Route
            path="post/:slug"
            element={<DetailsPagePost></DetailsPagePost>}
          ></Route>
          <Route element={<DashBoardPage></DashBoardPage>}>
            <Route path="/post" element={<Addpost></Addpost>}></Route>
            <Route
              path="/post/history"
              element={<HistoryPost></HistoryPost>}
            ></Route>
            <Route
              path="/post/update"
              element={<UpdatePost></UpdatePost>}
            ></Route>
            <Route
              path="/category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/history/category"
              element={<CategoryHistory></CategoryHistory>}
            ></Route>
            <Route
              path="/update/category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route path="/user" element={<ListUser></ListUser>}></Route>
            <Route
              path="/user/create"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/user/update"
              element={<UserUpdate></UserUpdate>}
            ></Route>
          </Route>
          {/* <Route
            path="/category/:slug"
            element={<CategoryPage></CategoryPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
             */}

          {/* <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route> */}
          {/* <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route> */}
          {/* <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route> */}
          {/* <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route> */}
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
