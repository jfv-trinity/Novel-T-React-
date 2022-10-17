import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { UserContext } from "../../static/UserContext";
import "./AccountMenu.scss";
import { Margin } from "@mui/icons-material";
import UserProps from "../../common/User";

export function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = React.useContext(UserContext)!;
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    console.log(typeof event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography
            className="navbarLink"
            component={Link}
            to="/Contact"
            sx={{ minWidth: 100 }}
          >
            Contact
          </Typography>
          <Typography
            className="navbarLink"
            component={Link}
            to="/"
            sx={{ minWidth: 100 }}
          >
            Dashboard
          </Typography>
          {/* <Typography
            className="navbarLink"
            component={Link}
            to="/Profile"
            sx={{ minWidth: 100 }}
          >
            Profile
          </Typography> */}
        </div>
        <div>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{ mr: "17px", position: "relative" }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.username![0]}
              </Avatar>
            </IconButton>
          </Tooltip>
        </div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/Profile">
          <Avatar /> Profile
        </MenuItem>
        <MenuItem component={Link} to={`/MyLibrary/${user.id}`}>
          <Avatar /> Personal Library
        </MenuItem>
        <MenuItem component={Link} to={`/AuthorListings/${user.id}`}>
          <Avatar /> My Publishings
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/addbook">
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add Novel
        </MenuItem>
        <MenuItem component={Link} to="/Profile">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem component={Link} to="logout">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
