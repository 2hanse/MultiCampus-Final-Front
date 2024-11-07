import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProfilePage from "./components/ProfilePage/MyProfilePage";
import ReviewHistory from "./components/ProfilePage/reviewpage";
import CommentHistory from "./components/ProfilePage/commentHistory";
import LikedPosts from "./components/ProfilePage/likedPost";
import ReceiptsCollection from "./components/ProfilePage/receiptsCollection";
import UserProfile from "./components/ProfilePage/userProfile";
import MemberInfo from "./components/ProfilePage/memberinfo";
import Profile from "./components/ProfilePage/Profile";
import ImageComponent from "./components/ProfilePage/ImageComponent";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Routes>
          <Route path="/" element={<MyProfilePage />} />
          <Route path="/review-history" element={<ReviewHistory />} />
          <Route path="/comment-history" element={<CommentHistory />} />
          <Route path="/liked-posts" element={<LikedPosts />} />
          <Route path="/receipt-collection" element={<ReceiptsCollection />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/memberinfo" element={<MemberInfo />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/" element={<ImageComponent/>} />
          {/* 404 페이지를 추가하여 잘못된 경로를 처리 */}
          <Route path="*" element={<h2>페이지를 찾을 수 없습니다.</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
