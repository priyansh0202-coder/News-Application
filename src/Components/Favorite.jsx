import React, { useState, useEffect } from 'react';
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import Image from "../assets/newsapp.jpeg";
import ClearIcon from '@mui/icons-material/Clear';

const Favorite = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('fav');
        setItems(JSON.parse(data));
    }, []);

    const handleRemove = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        localStorage.setItem('fav', JSON.stringify(updatedItems));
    }

    return (
        <Grid container spacing={2} padding={2} marginTop={5}>
            {items && items.length > 0 ?
                (items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ width: '100%', height: '100%', border: 2 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="160"
                                    image={item.urlToImage ? item.urlToImage : Image}
                                    border={2}
                                />
                                <CardContent>
                                    <Typography variant="h6" fontStyle="italic">{item.title.slice(0, 50)}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description === null ? item.title : item.description.slice(0, 90)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant='contained' size="small" color="primary" href={item.url} target="_blank">
                                    Read More
                                </Button>
                                <Button onClick={() => handleRemove(index)}>
                                    <ClearIcon />
                                </Button>

                            </CardActions>
                        </Card>
                    </Grid>
                )))
                : (
                    <Typography variant="h6">No favorite items found.</Typography>
                )}
        </Grid>
    );
};

export default Favorite;

