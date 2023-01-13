import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ChevronDoubleDown from 'mdi-material-ui/ChevronDoubleDown';
import VoteOutline from 'mdi-material-ui/VoteOutline';
import * as React from 'react';

// ** Icons Imports
import { VsBattleEntity } from '../../../cabServer/global/__generated__/types';
import { useVoteVsBattleMutation } from '../../../cabServer/mutations/__generated__/battles';
import DenseTable from './BattleTable';

type BattleCardProps = {
  vsBattle: VsBattleEntity;
  handleVote: (vsBattleId: string, option: number) => void;
};
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const BattleCard = (props: BattleCardProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log('battleId', props.vsBattle.id);

  return (
    <Card style={{ marginBottom: '2em' }}>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: (theme) => `${theme.spacing(9.75, 5, 9.25)} !important`,
        }}
      >
        <Avatar
          sx={{
            width: 50,
            height: 50,
            marginBottom: 2.25,
            color: 'common.white',
            backgroundColor: 'primary.main',
          }}
        >
          <VoteOutline sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Typography variant="h6" sx={{ marginBottom: 2.75 }}>
          {props.vsBattle.attributes?.title}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 6 }}>
          voice your opinion
        </Typography>
        <div>
          <Button
            variant="contained"
            sx={{ padding: (theme) => theme.spacing(1.75, 5.5) }}
            onClick={() => {
              props.handleVote(props.vsBattle.id!, 1);
            }}
          >
            {props.vsBattle.attributes?.option1}
          </Button>
          <Button
            variant="contained"
            sx={{
              padding: (theme) => theme.spacing(1.75, 5.5),
              marginLeft: '2em',
            }}
            onClick={() => {
              props.handleVote(props.vsBattle.id!, 2);
            }}
          >
            {props.vsBattle.attributes?.option2}
          </Button>
        </div>
      </CardContent>
      <DenseTable
        option1={props.vsBattle?.attributes?.option_1_voters?.data.length || 0}
        option2={props.vsBattle?.attributes?.option_2_voters?.data.length || 0}
      />
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ChevronDoubleDown color="primary" />
      </ExpandMore>
    </Card>
  );
};

export default BattleCard;
