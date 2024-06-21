import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setCategory, setSearchQuery }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const menuItems = [
        { text: 'Home', category: 'general' },
        { text: 'Health', category: 'health' },
        { text: 'Business', category: 'business' },
        { text: 'Entertainment', category: 'entertainment' },
        { text: 'Sports', category: 'sports' },
        { text: 'Favorites', category: 'favorites' },
    ];

    const handleCategory = (category) => {
        setCategory(category)
        navigate(`/category/${category}`)
    }

    const handleSearchBar = (e) => {
        setSearch(e.target.value)
        setSearchQuery(e.target.value)
    }

    return (
        <>
            <AppBar position="fixed" sx={{ width: '100vw', top: 0, left: 0, backgroundColor: "black" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex', }, flexGrow: 1 }}  >
                        {menuItems.map((item, index) => (
                            <Button key={index} color="inherit" onClick={() => handleCategory(item.category)}>
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                    <TextField
                        variant="outlined"
                        size="small"
                        name='search'
                        type='search'
                        placeholder="Search"
                        onChange={handleSearchBar}
                        sx={{ backgroundColor: 'white', borderRadius: 1, ml: 2 }}
                    />
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} onClick={() => { handleCategory(item.category); handleDrawerToggle(); }}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;




