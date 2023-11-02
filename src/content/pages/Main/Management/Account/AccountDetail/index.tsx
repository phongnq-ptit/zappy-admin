import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { UserRole } from 'src/types/enums/UserRole';
import { User } from 'src/types/interfaces/User';

enum Tabs {
  SUMMARY = 'summary',
  EDIT = 'edit_infomation',
  MANAGE_PROFILE = 'manage_profile'
}

const account: User = {
  id: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
  username: 'parents-test',
  email: 'parents@doan.com',
  address: 'Sao hỏa',
  phone: '019827446',
  isActive: true,
  golds: 0,
  role: UserRole.PARENTS,
  provider: 1,
  profiles: [
    {
      id: 5,
      nickname: 'Bé Mập',
      avatar: null
    },
    {
      id: 7,
      nickname: 'Bé Mabu',
      avatar: 'a4dd-ef08-4d59_tt7.jpg'
    },
    {
      id: 8,
      nickname: 'Bé Goku',
      avatar: '345a-c0a6-47b9_tre_con_1.jpg'
    },
    {
      id: 9,
      nickname: 'Bé Vegeta',
      avatar: 'f302-a6bd-4cd5_tre_con_5.jpg'
    },
    {
      id: 10,
      nickname: 'Bé Goten',
      avatar:
        'https://storage.googleapis.com/cinema-pgv-store.appspot.com/684f-a873-4a4f_tt7.jpg?GoogleAccessId=firebase-adminsdk-kc8om%40cinema-pgv-store.iam.gserviceaccount.com&Expires=4102419600&Signature=QGqmkurgbvQhj5Vv5He3RuhLYovvclwx96ItNwidiyrrPQWebqo3IDi%2FUcgRDrK97A8eS70z7NyXCtjfUsfnl1Hx7DLIe2jHgVmJ0h5esWnaAQCZFQ%2BKCBCAgLGu4di21sZa5jMdUk8JNdLXTy4fkllrPeTHjwEU0NzS8%2B2k0Gyk00K9TED8djGmdwrYPlj46XfUt38pvnXkTYQGuGIjmv8GPUfvXT3yBUdVNBO3ofYnydwAhLOUSwpX3TaJjFPyrRA%2F4dx2XPV3XKV4pJYvlDVrA0p055MPB1oDOJXLhCzSnUfLTZ%2Bj07WUeHyXBtacEdfHUpZQTDahOLwB%2BU9kHQ%3D%3D'
    },
    {
      id: 6,
      nickname: 'Bé Bi 1',
      avatar: 'a6a6-b203-4793_logo.png'
    },
    {
      id: 11,
      nickname: 'Bé Bi 10',
      avatar:
        'https://storage.googleapis.com/upload-doan.appspot.com/69cd-e2c8-49eb_hinh_nen.jpg?GoogleAccessId=firebase-adminsdk-6lrh7%40upload-doan.iam.gserviceaccount.com&Expires=4102419600&Signature=DI%2FpdeT%2Bu08Z0h0EguynWWrEq49kRAtoS1CZNPZnq00PVcZ8pGVpxpL01Dmocl2DGLItLtDaMUSkLBKJwVg3lhsSq2YKoD7%2FO%2B3A4vxhaRTKsUj%2FmaCfQFac2FJ0vVKXJn2yWMn2v8qhVnv%2BQWkbgHuzZGyEnkKEG0gV0cB%2FaCZaZrlbOf%2BvRFsZbwKULDF%2F5DljesnqnSnhOuJKSRYe%2Bid5qLQwXpQ2TIFwycHpSLJF%2FaeL7tctSlBj0Ef%2FJcU0Mku6r6wxk7w7ga8FPL5kr9ZqB0CoYLBuOgv2d%2BPUl%2BV%2F98INwj3qXpORkDu6SpEjVx78ArLaZA49FDdRvslwkg%3D%3D'
    },
    {
      id: 12,
      nickname: 'Bé Bi 12',
      avatar:
        'https://storage.googleapis.com/upload-doan.appspot.com/profile/1e55-877d-4e8f_hinh_nen.jpg?GoogleAccessId=firebase-adminsdk-6lrh7%40upload-doan.iam.gserviceaccount.com&Expires=4102419600&Signature=BD%2ByLVjob81so4b87rThFNuK07Dct7L3JAcreEcERezhLexH82Zy3Gn1QJlHnSQMhPRJzObw4QmWhWUaKlblQ0EH0j3%2F2ZVQIt4a34JlqsXZolH9IbaFCLmNtpgfMB8OeVvjplRMia3%2FyS3rxcYMRlR2Td7DqoN0M45PhaDdqJRB1MUd5jBMYytrbL6SDHuy8y64Yn2JlIcKuR4yispDhUIHg95CBN9z%2FXh%2BcwjXkuccYHvnQCIHqe9ZZPziHP9BcvznxoI%2Fc7sNU3Q3gLwNLiGWwLrZSHa8TyLraIRPqfTHcCG7dN6w1ntT1%2B7lG8x775GPfU3%2FvTacXX%2B8eFG6xA%3D%3D'
    }
  ],
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY5ODg0ODI5NSwiZXhwIjoxNjk5NzEyMjk1fQ.nTDP5LmJyPCfOugDPXHaXw5ER_NLGa6RGpha_uIZHsw',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY5ODg0ODI5NSwiZXhwIjoxNjk5NDUzMDk1fQ.o6RzhlQKagQFuriRBpRARQ1E6UZo7jwStjN0dJ2Wrwk'
};

const AccountDetail = () => {
  const theme = useTheme();
  const [tabs, setTabs] = useState<string>(Tabs.SUMMARY);

  const handleChangeTabs = (event: React.SyntheticEvent, newValue: string) => {
    setTabs(newValue);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{`${account.username.toUpperCase()} | Zappy`}</title>
      </Helmet>
      <Grid
        container
        spacing={2}
        flexDirection="column"
        sx={{ width: '100%', my: 2 }}
      >
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom textAlign="center">
            {`Tài khoản ${account.username}`.toUpperCase()}&nbsp;
            <span
              style={{
                fontSize: '1.6rem',
                color: theme.colors.shadows.info,
                fontWeight: 400
              }}
            >{`#id:${account.id}`}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TabContext value={tabs}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                p: 1
              }}
            >
              <TabList
                onChange={handleChangeTabs}
                aria-label="lab API tabs example"
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Tab label="Tổng Quan" value={Tabs.SUMMARY} />
                <Tab label="Chỉnh Sửa Thông Tin" value={Tabs.EDIT} />
                <Tab label="Quản Lý Hồ Sơ" value={Tabs.MANAGE_PROFILE} />
              </TabList>
            </Box>
            <TabPanel value={Tabs.SUMMARY}>abc</TabPanel>
            <TabPanel value={Tabs.EDIT}>def</TabPanel>
            <TabPanel value={Tabs.MANAGE_PROFILE}>ghi</TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AccountDetail;
