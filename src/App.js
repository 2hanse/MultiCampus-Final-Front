import './App.css';
import LoginPage from './component/pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinPage from './component/pages/JoinPage';
import BoardMainPage from './component/pages/BoardMainPage';
import FindEmailPage from './component/pages/find/email/FindEmailPage';
import FindResultEmailPage from './component/pages/find/email/FindResultEmailPage';
import FindPasswordPage from './component/pages/find/password/FindPasswordPage';
import PhoneIdentificationPage from './component/pages/find/password/PhoneIdentificationPage';
import ResetPasswordPage from './component/pages/find/password/ResetPasswordPage';
import ResetPasswordResultPage from './component/pages/find/password/ResetPasswordResultPage';
import ChatListPage from './component/pages/chat/ChatListPage';
import MyLocationPage from './component/pages/MyLocationPage';
import ChatInvitePage from './component/pages/chat/ChatInvitePage';
import MapPage from './component/pages/MapPage';
import EditBookmarkPage from './component/pages/EditBookmarkPage';
import ChangePasswordPage from './component/pages/reset/ChangePasswordPage';
import ChangePasswordResultPage from './component/pages/reset/ChangePasswordResultPage';
import ChatRoomPage from './component/pages/chat/ChatRoomPage';
import RestorantBoardPostingPage from './component/pages/RestorantBoardPostingPage';
import FreeBoardPostingPage from './component/pages/FreeBoardPostingPage';
import TourBoardPostingPage from './component/pages/TourBoardPostingPage';
import Editor from './component/post-board/Editor';
import MyProfilePage from './component/pages/MyProfilePage';
import ReviewHistory from './component/pages/reviewpage';
import LikedPosts from './component/pages/likedPost';
import ReceiptsCollection from './component/pages/receiptsCollection';
import UserProfile from './component/pages/userProfile';
import MemberInfo from './component/pages/memberinfo';
import Profile from './component/pages/Profile'; 
import CommentHistory from './component/pages/commentHistory';
import SubscriptionFeed from './component/pages/subscribe';
import AlertPage from './component/pages/AlertPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/review-history" element={<ReviewHistory />} />
        <Route path="/comment-history" element={<CommentHistory />} />
        <Route path="/liked-posts" element={<LikedPosts />} />
        <Route path="/receipt-collection" element={<ReceiptsCollection />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/memberinfo" element={<MemberInfo />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/subscribe" element={<SubscriptionFeed />} />
        <Route path="/myprofilepage" element={<MyProfilePage />} />
        <Route path="/" element={<MapPage />} />
        <Route path="/editbookmark" element={<EditBookmarkPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/join" element={<JoinPage />} />
        <Route path="/user/find-email" element={<FindEmailPage />} />
        <Route
          path="/user/findResultEmailPage"
          element={<FindResultEmailPage />}
        />
        <Route path="/user/find-password" element={<FindPasswordPage />} />
        <Route path="/user/chat/list" element={<ChatListPage />} />
        <Route path="/user/chat/invite" element={<ChatInvitePage />} />
        <Route path="/user/chat/room" element={<ChatRoomPage />} />
        <Route path="/user/alert" element={<AlertPage />} />
        <Route path="/boardmain" element={<BoardMainPage />} />
        <Route
          path="/boardpost/restaurant"
          element={<RestorantBoardPostingPage />}
        />
        <Route path="/boardpost/free" element={<FreeBoardPostingPage />} />
        <Route path="/boardpost/tour" element={<TourBoardPostingPage />} />
        <Route
          path="/user/phone-identification"
          element={<PhoneIdentificationPage />}
        />
        <Route path="/user/resetPassword" element={<ResetPasswordPage />} />
        <Route
          path="/user/resetPasswordResult"
          element={<ResetPasswordResultPage />}
        />
        <Route path="/mylocation" element={<MyLocationPage />} />

        <Route
          path="/user/me/changePassword"
          element={<ChangePasswordPage />}
        />
        <Route
          path="/user/me/changePasswordResult"
          element={<ChangePasswordResultPage />}
        />
        <Route path="drafttest" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
