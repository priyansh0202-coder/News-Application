import { Favorite } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from "../assets/newsapp.jpeg"


const NewsItem = ({ category, searchQuery }) => {
    const [article, setArticles] = useState([])
    const [fav, setFav] = useState(JSON.parse(localStorage.getItem('fav')) || [])
    const [currentPage, setCurrentPage] = useState(1);
    const recordPerPage = 12;

    // useEffect(() => {
    //     // let key = import.meta.env.VITE_NEWS_API_KEY;
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&pageSize=100&apiKey=e9a947a395174904ae5d9e8662d757ae`;

    //     const fetchArticles = async () => {
    //         try {
    //             const response = await axios.get(url);
    //             setArticles(response.data.articles)

    //         } catch (error) {
    //             console.log("error fetching the news articles:", error)
    //         }
    //     }
    //     fetchArticles();
    // }, [category]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
                    params: {
                        country: 'in',
                        category: category,
                        pageSize: 100,
                        apiKey: e9a947a395174904ae5d9e8662d757ae
                    },
                    headers: {
                        'Upgrade-Insecure-Requests': 1
                    }
                });
                setArticles(response.data.articles);
            } catch (error) {
                console.error("Error fetching the news articles:", error);
            }
        };
        fetchArticles();
    }, [category]);


    useEffect(() => {
        localStorage.setItem("fav", JSON.stringify(fav));
    }, [fav]);

    const handleChangePage = (event, value) => {
        setCurrentPage(value)
    }

    const filteredArticles = article.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentArticles = filteredArticles.slice((currentPage - 1) * recordPerPage, currentPage * recordPerPage)

    const handleChange = async (item) => {
        setFav((prev) => ([...prev, item]));
        localStorage.setItem("fav", JSON.stringify(fav))
    }


    const isFavorite = (item) => {
        return fav.find(favItem => favItem.title === item.title);
    };



    return (
        <>
            <Grid container spacing={2} padding={2} marginTop={5}>
                {currentArticles.map((item, index) => (
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
                                <IconButton style={{ color: isFavorite(item) ? "red" : "inherit" }}
                                    onClick={() => handleChange(item)} aria-label="add to favorites" >
                                    <Favorite />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: "center", mt: 4 }}>
                <Pagination
                    count={Math.ceil(article.length / recordPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color='primary'
                />
            </Box>
        </>
    )
}

export default NewsItem
