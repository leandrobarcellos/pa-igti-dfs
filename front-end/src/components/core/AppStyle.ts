import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


export class AppStyle {
    static readonly useStyles = makeStyles((theme: Theme) =>
        createStyles({
            loginCard: {
                maxWidth: '100%',
                ['@media (min-width: 500px)']: { maxWidth: '25%'},
                // [theme.breakpoints.up("lg")]: {
                //     maxWidth: '25%'
                // }
            },
            root: {
                width: '100%',
            },
            button: {
                marginRight: theme.spacing(1),
                marginTop: 15
            },
            instructions: {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1),
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: "100%",
                width: "100%",
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
            selectClass: {
                minWidth: "100%",
                width: "100%",
            },
        }),
    );

    static readonly classes = () => AppStyle.useStyles();
}