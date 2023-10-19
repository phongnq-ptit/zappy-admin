import { Box, Typography, Container, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Status404() {
  return (
    <>
      <Helmet>
        <title>404 - Không tìm thấy</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
              Trang bạn đang tìm kiếm không tồn tại!
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <Button href="/" variant="outlined">
                QUAY LẠI TRANG CHÍNH
              </Button>
            </Box>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
