import {SnackbarProvider} from "notistack";
import React, {createRef, Fragment} from "react";
import Button from "@material-ui/core/Button";

export default (props) => {
    const snackRef = createRef();
    const action = key => (
        <Fragment>
            <Button style={{color: "#e8c204"}} onClick={() => {
                document.location.reload()
            }}>
                Reload
            </Button>
            <Button style={{color: "#e8c204"}} onClick={() => {
                snackRef.current.closeSnackbar()
            }}>
                Dismiss
            </Button>
        </Fragment>
    );
    return (
        <SnackbarProvider
            ref={snackRef}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            maxSnack={1}
            preventDuplicate={true}
            action={action}
        >
            {props.children}
        </SnackbarProvider>
    )
}
