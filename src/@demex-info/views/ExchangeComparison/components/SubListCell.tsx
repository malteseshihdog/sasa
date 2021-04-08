import { Box, Theme, makeStyles } from "@material-ui/core";
import { ListItemHead } from "../compareConfig";

import React from "react";
import { TypographyLabel } from "@demex-info/components";

interface Props {
  valueItem: any;
  newKey: string;
}

const SubListCell: React.FC<Props> = (props: Props) => {
  const { newKey, valueItem } = props;
  const classes = useStyles();

  if (Array.isArray(valueItem) && valueItem.length > 0 && typeof valueItem[0] !== "string" && Boolean(valueItem[0]?.header)) {
    return (
      <Box>
        {valueItem.map((item: ListItemHead) => (
          <Box className={classes.list} key={`${item.header}-${newKey}`}>
            <TypographyLabel variant="subtitle1">
              {item.header}
            </TypographyLabel>
            <ul className={classes.subList}>
              {item.values.map((newItem: string) => (
                <li className={classes.listItem} key={`${newItem}-${newKey}`}>{newItem}</li>
              ))}
            </ul>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    marginTop: theme.spacing(0.75),
    "& h6": {
      color: theme.palette.text.secondary,
      fontSize: "0.8rem",
      fontWeight: 500,
    },
    "&:first-child": {
      marginTop: 0,
    },
  },
  listItem: {
    color: theme.palette.text.secondary,
  },
  subList: {
    lineHeight: "1.25rem",
    paddingLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    maxWidth: "9rem",
  },
}));

export default SubListCell;
