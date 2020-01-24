import React, {useState} from "react"
import {CssBaseline, Grid, makeStyles, Typography,} from "@material-ui/core";
import ItemCard from "./ItemCard";

const useStyles = makeStyles(theme => ({

    root: {
        marginBottom: theme.spacing(4),
    },
    title:{
        marginBottom:theme.spacing(2)
    },
    itemgrid:{
        display:"flex",
        alignItems:"stretch",
        minHeight:"100%"
    },

}));
export default (props) => {

    const [categories, setCategories] = useState(props.categories);
    const classes = useStyles()

    return (
        <React.Fragment>
            <CssBaseline/>
            {
                categories.map(category => (
                    <section key={category.id} id={category.id} className={classes.root}>
                        <Grid item xs={12}>
                            <Typography variant={"h5"} className={classes.title} color={"primary"}>  {category.name} </Typography>
                            <Grid container spacing={2} className={classes.itemgrid}>
                                {category.items.map(item => (
                                    <Grid item key={item.id} xs={12} md={4} >
                                        {<ItemCard item={item}/>}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </section>
                ))
            }
        </React.Fragment>
    )
}

