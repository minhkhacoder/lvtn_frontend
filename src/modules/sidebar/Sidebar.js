/** @format */
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ErrorComponent from "components/common/ErrorComponent";
import { DarkModeContext } from "contexts/darkModeContext";
import React, { useContext, useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Dropdown } from "components/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/actions/auth/authAction";
import { getUser } from "utils/cookies";

const SidebarStyled = styled.div`
  flex: 1;
  border-right: 0.5px solid ${(props) => props.theme.text3};
  min-height: 100vh;
  background-color: white;
  .top {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
      font-size: 20px;
      font-weight: bold;
      color: ${(props) => props.theme.primary};
    }
  }

  hr {
    height: 0;
    border: 0.5px solid ${(props) => props.theme.text3};
  }

  .center {
    padding-left: 10px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      .title {
        font-size: 10px;
        font-weight: bold;
        color: ${(props) => props.theme.text};
        margin-top: 15px;
        margin-bottom: 5px;
        text-transform: uppercase;
      }

      .link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 12px;
        text-transform: capitalize;
        &:hover {
          background-color: ${(props) => props.theme.six};
        }
      }

      li {
        display: flex;
        align-items: center;
        padding: 5px;
        cursor: pointer;
        &:hover {
          background-color: ${(props) => props.theme.six};
        }
        span {
          font-size: 13px;
          font-weight: 600;
          color: ${(props) => props.theme.text};
          margin-left: 10px;
        }
      }
      .icon {
        font-size: 18px;
        color: ${(props) => props.theme.primary};
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    margin: 10px;

    .color-option {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid ${(props) => props.theme.primary};
      cursor: pointer;
      margin: 5px;

      &:nth-child(1) {
        background-color: whitesmoke;
      }
      &:nth-child(2) {
        background-color: #333;
      }
      &:nth-child(3) {
        background-color: darkblue;
      }
    }
  }
`;

const Sidebar = () => {
  const { dis } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const handleLogOut = () => {
    dispatch(logout());
  };
  const user = getUser();

  useEffect(() => {
    if (auth === null || user === undefined) navigate("/login");
  }, [navigate, user, auth]);
  return (
    <SidebarStyled>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }} className="link">
          <span className="logo">mesports</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }} className="link">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LIST</p>
          <Dropdown>
            <Dropdown.Select placeholder="Products">
              <StoreIcon className="icon" />
            </Dropdown.Select>
            <Dropdown.List>
              <Dropdown.Option
                to="/all-products"
                className="pl-[28px] link py-[5px]"
              >
                All products
              </Dropdown.Option>
              <Dropdown.Option
                to="/add-product"
                className="pl-[28px] link py-[5px]"
              >
                Add products
              </Dropdown.Option>
              <Dropdown.Option
                to="/infringing-products"
                className="pl-[28px] link py-[5px]"
              >
                Infringing products
              </Dropdown.Option>
            </Dropdown.List>
          </Dropdown>
          <Dropdown>
            <Dropdown.Select placeholder="Orders">
              <CreditCardIcon className="icon" />
            </Dropdown.Select>
            <Dropdown.List>
              <Dropdown.Option
                to="/all-orders"
                className="pl-[28px] link py-[5px]"
              >
                All
              </Dropdown.Option>
              <Dropdown.Option
                to="/cancel-orders"
                className="pl-[28px] link py-[5px]"
              >
                Cancelled
              </Dropdown.Option>
              <Dropdown.Option
                to="/return-refund-orders"
                className="pl-[28px] link py-[5px]"
              >
                Return / Refund
              </Dropdown.Option>
            </Dropdown.List>
          </Dropdown>
          <Link
            to="/delivery"
            style={{ textDecoration: "none" }}
            className="link"
          >
            <li>
              <LocalShippingIcon className="icon" />
              <span>Delivery</span>
            </li>
          </Link>

          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SETTING</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogOut}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="color-option"
          onClick={() => dis({ type: "LIGHT" })}
        ></div>
        <div
          className="color-option"
          onClick={() => dis({ type: "DARK" })}
        ></div>
      </div>
    </SidebarStyled>
  );
};

export default withErrorBoundary(Sidebar, {
  FallbackComponent: ErrorComponent,
});
