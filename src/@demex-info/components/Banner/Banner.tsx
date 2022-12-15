import { BannerBlueLeft, BannerBlueMiddle, BannerBlueRight, BannerOrange } from "@demex-info/assets";
import { StyleUtils } from "@demex-info/utils";
import {
  Box, BoxProps, Link, makeStyles, Theme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { SvgIcon } from "../SvgIcon";

interface Props extends BoxProps {
  bannerIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  headerText: string
  subHeader: string
  ctaLink?: string
  ctaText?: string
  gradientText?: string
}

const Banner: React.FC<Props> = (props: Props) => {
  const { bannerIcon, headerText, subHeader, ctaLink, ctaText, gradientText, className, ...rest } = props;
  const classes = useStyles();

  return (
    <Box {...rest} className={clsx(className, classes.root)}>
      <Box className={classes.banner}>
        <SvgIcon className={classes.bannerIcon} component={bannerIcon} />
        <Box className={classes.content}>
          <Box className={classes.header}>
            {headerText}
          </Box>
          <span className={classes.subHeader}>
            {subHeader}
            &nbsp;
            <span className={classes.gradientText}>
              {ctaLink && ctaText && (
                <Link
                  className={classes.link}
                  href={ctaLink}
                  target="_blank"
                >
                  {ctaText}
                </Link>
              )}
              &nbsp;
              {gradientText}
            </span>
          </span>
        </Box>
        {/* background vectors */}
        <SvgIcon className={classes.bannerBlueLeft} component={BannerBlueLeft} />
        <SvgIcon className={classes.bannerBlueMiddle} component={BannerBlueMiddle} />
        <SvgIcon className={classes.bannerBlueRight} component={BannerBlueRight} />
        <SvgIcon className={classes.bannerOrange} component={BannerOrange} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxSizing: "border-box",
    backgroundColor: "transparent",
    padding: "5.5rem 3rem 1.5rem",
    zIndex: 10,
    [theme.breakpoints.down("sm")]: {
			paddingLeft: "0.75rem",
			paddingRight: "0.75rem",
		},
  },
  banner: {
    display: "flex",
    backgroundColor: theme.palette.snow,
    background: StyleUtils.bannerGradient,
    borderRadius: "4px",
    boxShadow: StyleUtils.boxShadow(theme),
    position: "relative",
    minHeight: "4.75rem",
    overflow: "hidden",
    zIndex: 5,
    [theme.breakpoints.down("sm")]: {
      minHeight: "unset",
		},
  },
	bannerIcon: {
    zIndex: 3,
    padding: "0.75rem 1.5rem",
    minWidth: "2.5rem",
    minHeight: "2.5rem",
    margin: "auto 0",
    [theme.breakpoints.down("sm")]: {
			padding: "0.5rem",
		},
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0.875rem 1.5rem 0.875rem 0",
    zIndex: 5,
    [theme.breakpoints.down("sm")]: {
			padding: "0.5rem 0.5rem 0.5rem 0",
		},
  },
  header: {
    ...theme.typography.title2,
    color: theme.palette.text.primary,
    marginBottom: "0.25rem",
    [theme.breakpoints.down("sm")]: {
			...theme.typography.title4,
		},
  },
  subHeader: {
    ...theme.typography.body3,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
			...theme.typography.body4,
		},
  },
  link: {
    ...theme.typography.title3,
    borderBottom: `1px solid ${theme.palette.warning.main}`,
    "&:hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("sm")]: {
			...theme.typography.title4,
		},
  },
  gradientText: {
    background: StyleUtils.warningGradient,
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
  },
  bannerOrange: {
    position: "absolute",
    opacity: "60%",
    zIndex: 0,
    height: "100%",
  },
  bannerBlueLeft: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
  },
  bannerBlueMiddle: {
    position: "absolute",
    right: "20%",
    zIndex: 1,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
			display: "none",
		},
  },
  bannerBlueRight: {
    position: "absolute",
    right: 0,
    zIndex: 2,
    height: "100%",
  },
}));

export default Banner;