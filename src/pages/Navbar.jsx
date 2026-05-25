import { AppBar, Typography, Toolbar } from "@mui/material";


const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    E-shop
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;