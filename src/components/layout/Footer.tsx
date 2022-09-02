import { FC } from 'react';

import { Stack, Typography, styled } from '@mui/material';

import Github from './Github';

const StyledFooter = styled('footer')(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  width: '100%',
  // textAlign: 'center',
  color: theme.palette.grey[500],
}));

const StyledLink = styled('a')({
  textDecoration: 'none',
  color: 'inherit',
});

type Props = {
  // children: string;
};

const Footer: FC<Props> = () => {
  return (
    <StyledFooter>
      <StyledLink href="https://github.com/spaenleh/pyodide-react-ts">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Typography>@spaenleh</Typography>
          <Github />
          <Typography>2022</Typography>
        </Stack>
      </StyledLink>
    </StyledFooter>
  );
};

export default Footer;
