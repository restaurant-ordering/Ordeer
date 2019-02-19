import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function CartItem(props) {
  const { classes } = props;
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography component="p">
          {props.description || ''}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.handleClick}>Remove from cart</Button>
      </CardActions>
    </Card>
  );
}

CartItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartItem);