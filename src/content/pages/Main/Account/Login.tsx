import { Box, Container, Card, Button, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import FormInput from 'src/components/Input/FormInput';
import useUserApi from 'src/hooks/useUserApi';
import { UserLogin } from 'src/types/interfaces/User';
import { useContext, useState } from 'react';
import { GlobalContext } from 'src/contexts/GlobalContext';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { UserRole } from 'src/types/enums/UserRole';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;`
);

function Login() {
  const { handleSubmit, control } = useForm();
  const { login } = useUserApi();
  const { setGError, setLoginUser } = useContext(GlobalContext);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const loginLocal = localStorage.getItem('login');

  const submit = (data: UserLogin) => {
    setLoadingBtn(true);
    login(data)
      .then((response) => {
        if (response.message) {
          setGError({ isError: true, message: response.message });
          setLoadingBtn(false);
          return;
        }

        if (response.data.role !== UserRole.ADMIN) {
          setGError({
            isError: true,
            message:
              'Chỉ tài khoản Admin mới có thể vào trang quản trị hệ thống!'
          });
          setLoadingBtn(false);
          return;
        }

        localStorage.setItem(
          'login',
          JSON.stringify(_.pick(response.data, ['accessToken', 'refreshToken']))
        );
        localStorage.setItem(
          'user',
          JSON.stringify(_.omit(response.data, ['accessToken', 'refreshToken']))
        );
        setLoginUser(response.data);
        SuccessSnackbar('Đăng nhập thành công!');

        setTimeout(() => {
          setLoadingBtn(false);
          navigate('/overview');
        }, 2000);
      })
      .catch((e) => console.log(e));
  };

  return (
    <OverviewWrapper>
      <Helmet>
        <title>Đăng Nhập | Zappy</title>
      </Helmet>
      <Container maxWidth="lg">
        <Card sx={{ p: 5, mb: 4, mt: 18, borderRadius: 12 }}>
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Grid
              spacing={{ xs: 6, md: 10 }}
              justifyContent="center"
              alignItems="center"
              container
            >
              <Grid item xs={12} mx="auto">
                <Box sx={{ width: '100%' }}>
                  <img
                    src="/static/images/logo/ZappyLogo.svg"
                    alt="Zappy"
                    style={{ width: '200px' }}
                  />
                </Box>
                <TypographyH2 sx={{ my: 3 }} variant="h2">
                  Hệ Thống Quản Trị Ứng Dụng Zappy
                </TypographyH2>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit(submit)}>
                <Grid container spacing={2} flexDirection="column">
                  <Grid item xs={12}>
                    <FormInput
                      name="email"
                      label="Email"
                      control={control}
                      defaultValue={''}
                      rules={{
                        required: 'Email không được để trống!',
                        pattern: {
                          // prettier-ignore
                          value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                          message: 'Định dạng email không chính xác!'
                        }
                      }}
                      sx={{ width: '50%' }}
                      placeholder="Nhập email của bạn"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInput
                      name="password"
                      label="Password"
                      control={control}
                      defaultValue={''}
                      rules={{
                        required: 'Password không được để trống!'
                      }}
                      sx={{ width: '50%', fontSize: '1rem' }}
                      placeholder="Nhập password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      loading={loadingBtn}
                      variant="contained"
                      size="large"
                      color="secondary"
                      type="submit"
                    >
                      <span>Đăng Nhập</span>
                    </LoadingButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Container>
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Login;
