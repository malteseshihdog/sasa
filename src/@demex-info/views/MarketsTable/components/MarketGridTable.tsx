import { EmptyState, RenderGuard, withLightTheme } from "@demex-info/components";
import { useTaskSubscriber } from "@demex-info/hooks";
import {
  MarketStatItem, MarketTasks, MarketType, MarkType,
} from "@demex-info/store/markets/types";
import { RootState } from "@demex-info/store/types";
import { HeaderCell } from "@demex-info/utils";
import {
  Box, CircularProgress, Hidden, makeStyles, Table, TableBody,
  TableCell, TableHead, TableRow, Theme, useMediaQuery, useTheme,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import MarketGridRow from "./MarketGridRow";
import MarketPaper from "./MarketPaper";

interface Props {
  marketsList: MarketStatItem[];
  marketOption: MarketType;
}

const MarketGridTable: React.FC<Props> = (props: Props) => {
  const { marketsList, marketOption } = props;
  const classes = useStyles();
  const theme = useTheme();
  const widthSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading] = useTaskSubscriber(MarketTasks.List, MarketTasks.Stats);

  const { list, candlesticks } = useSelector((state: RootState) => state.markets);

  const marketHeaders: HeaderCell[] = [{
    title: widthSmDown ? "Market / 24H Vol" : "Market",
    key: "market",
  }, {
    className: classes.alignRight,
    title: "Last Price",
    key: "lastPrice",
  }, {
    className: classes.alignRight,
    title: "24H Change",
    key: "24hChange",
  }, {
    className: classes.alignRight,
    title: "24H Volume",
    key: "24hVolume",
    showCol: widthSmDown ? false : true,
  }, {
    className: classes.alignRight,
    title: "Chart",
    key: "chart",
    showCol: widthSmDown ? false : true,
  }, {
    className: classes.alignRight,
    title: "Trade",
    key: "trade",
    showCol: widthSmDown ? false : true,
  }];

  let marketPaperHeight: string | number = 0;
  let tableHeight: string | number = 0;
  if (marketsList.length > 4) {
    //   if (marketsList.length > 4 && expand) {
    tableHeight = "100%";
    marketPaperHeight = "100%";
  } else {
    tableHeight = 38 + (4 * 98);
    // marketPaperHeight = tableHeight + 56;
    marketPaperHeight = tableHeight;
  }

  return (
    <Box className={classes.root}>
      <MarketPaper className={classes.marketPaper} height={marketPaperHeight}>
        <Box className={classes.tableContainer} height={tableHeight}>
          <Table>
            <TableHead>
              <TableRow>
                <Hidden smDown>
                  <TableCell className={classes.fillerCell}></TableCell>
                </Hidden>
                {
                  marketHeaders.map((header: HeaderCell) => {
                    const { showCol = true } = header;
                    if (!showCol) return null;
                    return (
                      <TableCell className={clsx(classes.headerCell, header.className)} key={header?.key ?? header.title}>
                        {header.title}
                      </TableCell>
                    );
                  })
                }
                <Hidden smDown>
                  <TableCell className={classes.fillerCell}></TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <RenderGuard renderIf={!loading && marketsList?.length > 0}>
              <TableBody>
                {
                  marketsList.map((stat: MarketStatItem, index: number) => {
                    const listItem = list?.[stat.market] ?? {};
                    const candleSticksArr = candlesticks?.[stat.market] ?? undefined;
                    if (index <= 3) {
                      return (
                        <MarketGridRow
                          key={stat.market}
                          stat={stat}
                          listItem={listItem}
                          candlesticks={candleSticksArr}
                          marketOption={marketOption}
                        />
                      );
                    }
                    return null;
                  })
                }
              </TableBody>
            </RenderGuard>
          </Table>
          <RenderGuard renderIf={!loading && marketsList.length === 0}>
            <EmptyState
              helperText={`No ${marketOption === MarkType.Spot ? "Spot" : "Futures"} found at the moment`}
              theme="light"
            />
          </RenderGuard>
          <RenderGuard renderIf={loading}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
            >
              <CircularProgress color="secondary" size="3rem" />
            </Box>
          </RenderGuard>
        </Box>
        {/* {
          !loading && marketsList?.length > 4 && (
            <Box className={clsx(classes.viewBtn, { expand })} onClick={() => setExpand(!expand)}>
              {
                expand ? (
                  <Remove className={classes.addIcon} />
                ) : (
                  <Add className={classes.addIcon} />
                )
              }
              View { expand ? "Less" : "More" }
            </Box>
          )
        } */}
      </MarketPaper>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  addIcon: {
    marginRight: theme.spacing(1.5),
    width: "0.75rem",
    height: "0.75rem",
  },
  alignRight: {
    textAlign: "right",
  },
  fillerCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: 0,
    width: "1.75rem",
  },
  root: {
    marginTop: theme.spacing(2),
  },
  headerCell: {
    ...theme.typography.subtitle2,
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    fontSize: "0.785rem",
    padding: theme.spacing(1, 2),
    maxHeight: "2.375rem",
    height: "100%",
    [theme.breakpoints.only("sm")]: {
      "&:first-child": {
        padding: theme.spacing(1, 2, 1, 3.5),
      },
      "&:last-child": {
        padding: theme.spacing(1, 3.5, 1, 2),
      },
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.7rem",
      padding: theme.spacing(1, 0.5),
      "&:first-child": {
        padding: theme.spacing(1, 0.5, 1, 2),
      },
      "&:last-child": {
        padding: theme.spacing(1, 2, 1, 0.5),
      },
    },
  },
  marketPaper: {
    position: "relative",
    transition: "height 0.6s ease",
  },
  tableContainer: {
    transition: "height 0.8s ease",
    overflowX: "auto",
    overflowY: "hidden",
  },
  viewBtn: {
    ...theme.typography.button,
    alignItems: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    display: "flex",
    fontSize: "0.9rem",
    justifyContent: "center",
    height: "3.75rem",
    width: "100%",
    position: "absolute",
    bottom: 0,
    "&.expand": {
      position: "initial",
    },
    "& path": {
      fill: theme.palette.text.secondary,
    },
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.main, 0.04),
      color: theme.palette.secondary.main,
      "& path": {
        fill: theme.palette.secondary.main,
      },
    },
  },
}));

export default withLightTheme()(MarketGridTable);
