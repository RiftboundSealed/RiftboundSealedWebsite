import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import './Footer.css';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" className="app-footer">
      <Container>
        <Typography variant="body2" className="app-footer__text">
          Riftbound Sealed was created under Riot Games' "Legal Jibber Jabber"
          policy using assets owned by Riot Games. Riot Games does not endorse
          or sponsor this project.
        </Typography>

        <Typography variant="body2" className="app-footer__text">
          Feedback / Questions: Reach out to @doowan on Discord • © {year}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
