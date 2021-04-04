import { Box, makeStyles } from "@material-ui/core";
import CoinIcon, { CoinIconProps } from "../CoinIcon/CoinIcon";
import React, { Fragment } from "react";

import clsx from "clsx";
import { useAssetSymbol } from "@demex-info/hooks";

interface Props extends CoinIconProps {
  denomA?: string;
  denomB?: string;
  svgClass?: string;
  rightSvgClass?: string;
  leftSvgClass?: string;
}

const AssetIcon: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const {
    className, denom, svgClass,
    denomA: inputDenomA, denomB: inputDenomB,
    rightSvgClass, leftSvgClass, ...rest } = props;
  const assetSymbol = useAssetSymbol();
  const classes = useStyles();

  let denomA = inputDenomA;
  let denomB = inputDenomB;
  const poolNameMatch = denom?.match(/^([a-z\d]+)-\d+-([a-z\d]+)-\d+-lp\d+$/i);
  if (poolNameMatch) {
    denomA = assetSymbol(poolNameMatch[1]); // eslint-disable-line prefer-destructuring
    denomB = assetSymbol(poolNameMatch[2]); // eslint-disable-line prefer-destructuring
  }

  return (
    <Box className={clsx(classes.root, className)}>
      {(denomA && denomB) && (
        <Fragment>
          <CoinIcon denom={denomB} {...rest} className={clsx(classes.icon, classes.rightIcon, svgClass, rightSvgClass)} />
          <CoinIcon denom={denomA} {...rest} className={clsx(classes.icon, classes.leftIcon, svgClass, leftSvgClass)} />
        </Fragment>
      )}
      {(!denomA || !denomB) && (
        <CoinIcon denom={denom} {...rest} className={clsx(classes.icon, svgClass)} />
      )}
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    paddingTop: "2em",
    width: "2em",
    height: "2em",
    flexShrink: 0,
  },
  icon: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  leftIcon: {
    width: "1.75em",
    height: "1.75em",
    transform: "translate(-.25em, 0)",
  },
  rightIcon: {
    width: "1.75em",
    height: "1.75em",
    transform: "translate(.5em, 0)",
  },
}));

export default AssetIcon;