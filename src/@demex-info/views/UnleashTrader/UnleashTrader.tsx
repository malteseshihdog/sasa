import { TypographyLabel } from "@demex-info/components";
import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { MarketsMarquee, TokensMarquee } from "./components";

interface Props {

}
const UnleashTrader: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <TypographyLabel className={classes.mainHeader}>
        Unleash the Trader in You
      </TypographyLabel>
      <TypographyLabel boxClass={classes.subtextBox} className={classes.subtext}>
        Reimagine open markets with the first cross-chain decentralized exchange to support unlimited financial markets.
        Enjoy a plethora of trading products at your fingertips without ever losing ownership of your funds.
      </TypographyLabel>
      <MarketsMarquee />
      <TokensMarquee />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.base,
    marginTop: "0.5rem",
    alignItems: "center",
    marginBottom: "10rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: 0,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
		},
  },
  mainHeader: {
    ...theme.typography.h1,
    color: theme.palette.text.primary,
    marginBottom: "1.5rem",
    [theme.breakpoints.down("sm")]: {
			...theme.typography.h2,
      padding: "4.5rem 1rem 0",
		},
		[theme.breakpoints.only("xs")]: {
			fontSize: "28px",
      lineHeight: "38px",
      maxWidth: "calc(100% - 2rem)",
			margin: "0 auto",
      textAlign: "center",
		},
  },
  subtextBox: {
    maxWidth: "67rem",
    marginBottom: "1.75rem",
  },
  subtext: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
			...theme.typography.body2,
      padding: "0 1rem",
			marginTop: "0.75rem",
		},
		[theme.breakpoints.only("xs")]: {
			...theme.typography.body3,
		},
  },
}));

export default UnleashTrader;
