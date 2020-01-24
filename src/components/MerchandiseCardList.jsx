import React, {useEffect, useState} from "react"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
    withStyles
} from "@material-ui/core";
import {BASE_URL} from "../constant";
import Axios from "axios"
import {useSnackbar} from "notistack";
import {Rating as ORating} from "@material-ui/lab"
import {useHistory} from "react-router-dom"
import theme from "../theme";


const Rating = withStyles({
    iconFilled: {
        color: theme.palette.primary.main
    }
})(ORating);
const useStyles = makeStyles(theme => ({

    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        display: "inline-block",

    },
    cardContent: {
        flexGrow: 1,
    },
    cardAction: {
        justifyContent: "space-between",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    tag: {
        positon: "absolute",
        top: "5px",
        left: "5px",
        zIndex: 10,
    }
}));

const merchandiseDemoList = [
    {
        id: "1",
        name: "Step In Cafe",
        rating: 4,
        additionalDetail: "A good cafe for dating, known for hygiene"
    },
    {
        id: "2",
        name: "BBC",
        rating: 5,
        additionalDetail: "A good cafe for dating, known for hygiene"
    },
    {
        id: "3",
        name: "Famous Dum Biryani",
        rating: 3,
        additionalDetail: "A good cafe for dating, known for hygiene"
    },
    {
        id: "4",
        name: "Goli Vada Pav",
        rating: 2.5,
        additionalDetail: "A good cafe for dating, known for hygiene"
    },
    {
        id: "5",
        name: "Ad Brothers",
        rating: 5,
        additionalDetail: "A good cafe for dating, known for hygiene"
    },
    {
        id: "6",
        name: "Awadh Junction",
        rating: 4.5,
        additionalDetail: "A good cafe for dating, known for hygiene",
        tag: "New"
    },
];

export default (props) => {
    const history = useHistory();
    const [merchandises, setMerchandises] = useState(merchandiseDemoList);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    useEffect(() => {
        Axios.get(`${BASE_URL}/public/merchandises/`).then(response =>
            setMerchandises(response.data)
        ).catch(error => {
            enqueueSnackbar("Loading Failed", {variant: "error", key: "hello"})
        })
    }, []);
    const classes = useStyles();

    return (
        <React.Fragment>
            {
                merchandises.map(merchandise => (
                    <Grid item key={merchandise.id} xs={12} sm={6} md={3} onClick={() => {
                        history.push(`/menu/${merchandise.id}`)
                    }}>
                        <Card className={classes.card}>

                            <CardMedia
                                className={classes.cardMedia}
                                image={merchandise.photoUrl || "https://source.unsplash.com/random"}
                                title={merchandise.name}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {merchandise.name}
                                </Typography>
                                <Typography variant={"subtitle1"}>
                                    {merchandise.additionalDetail}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.cardAction}>
                                <Button size="small" color="primary">
                                    Menu
                                </Button>
                                <Rating value={merchandise.rating} precision={0.5} defaultValue={1} color={"secondary"}
                                        readOnly={true}/>

                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </React.Fragment>
    )
};

