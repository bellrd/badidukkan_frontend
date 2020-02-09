import React from "react"
import AppBar from "../components/AppBar"
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MerchandiseCardList from "../components/MerchandiseCardList";
import Footer from "../components/Footer"
import hero_background from "../assests/hero_background.jpg"

const useStyles = makeStyles(theme => ({

    root: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(8)
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        marginTop: theme.spacing(.1),
        background: `url(${hero_background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative"
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    vendor: {
        padding: theme.spacing(4, 1, 8, 1)
    },
    welcome: {
        fontWeight: "bolder",
        fontSize: "2rem",
        color: "white",
    },
    brand: {
        color: "white",
    },
    vendorTitle: {
        paddingBottom: theme.spacing(4),
        fontWeight: "bolder",
        textDecoration: "underline",
        color: theme.palette.secondary.main,
        fontFamily: "Alegreya Sans"
    },
}));

const HomePage = (props) => {
    const classes = useStyles();
    return (
        <>
            <AppBar/>
            <main className={classes.root}>

                {/* Hero content */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            <span className={classes.welcome}>Welcome to <br/> </span> <span
                            className={classes.brand}>BadiDukkan</span>
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
                            Badidukkan connects people with great local businesses and we help to find best services according to the customer experiences.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Order Now
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary" component={"a"} href={"tel: +917317214013"}>
                                        Contact
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                {/* end --hero content */}

                {/* Vendor List (our vendors) */}
                <div className={classes.vendor}>
                    <Container maxWidth={"lg"}>
                        <Typography variant={"h5"} className={classes.vendorTitle}>
                            Our vendors
                        </Typography>

                        <Grid container spacing={4}>
                            <MerchandiseCardList/>
                        </Grid>
                    </Container>
                </div>
                {/* --our vendors */}
            </main>

            {/* Footer Content*/}
            <div className={classes.footer}>
                <Footer/>
            </div>
        </>
    )
};

export default HomePage;
