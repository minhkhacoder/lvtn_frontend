/** @format */
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { DarkModeContext } from "contexts/darkModeContext";
import { useContext } from "react";
import ErrorComponent from "components/common/ErrorComponent";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getUser } from "utils/cookies";

const NavbarStyled = styled.div`
  height: 50px;
  border-bottom: 0.5px solid ${(props) => props.theme.text3};
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${(props) => props.theme.text};

  .wrapper {
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search {
      display: flex;
      align-items: center;
      border: 0.5px solid lightgray;
      padding: 3px;

      input {
        border: none;
        outline: none;
        background: transparent;

        &::placeholder {
          font-size: 12px;
        }
      }
    }

    .items {
      display: flex;
      align-items: center;

      .item {
        display: flex;
        align-items: center;
        margin-right: 20px;
        position: relative;
        cursor: pointer;
        .icon {
          font-size: 20px;
        }

        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .counter {
          width: 15px;
          height: 15px;
          background-color: red;
          border-radius: 50%;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          position: absolute;
          top: -5px;
          right: -5px;
        }
      }
    }
  }
`;
const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const user = getUser() === undefined ? undefined : JSON.parse(getUser());
  return (
    <NavbarStyled>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          <div className="item">
            <img src={user?.seller_avatar} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </NavbarStyled>
  );
};

export default withErrorBoundary(Navbar, {
  FallbackComponent: ErrorComponent,
});
