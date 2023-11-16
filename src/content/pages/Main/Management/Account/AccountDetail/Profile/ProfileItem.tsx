import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  TextFieldProps,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IUpdateProfile, Profile } from 'src/types/interfaces/User';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { makeStyles } from '@mui/styles';
import { formatDate, getAge } from 'src/utils/Helper';
import Label from 'src/components/Label';
import { Controller, useForm } from 'react-hook-form';
import UploadImage from 'src/components/UploadFile/UploadImage';
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import useProfileApi from 'src/hooks/useProfileApi';
import { SuccessSnackbar } from 'src/utils/ShowSnackbar';
import { useAccountDetail } from '../store';
import { format } from 'date-fns';
import { useAccountStore } from '../../store';

const useStyles = makeStyles({
  avatar: {
    width: '100px',
    height: '100px',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
  },
  name: {
    fontSize: '1rem !important',
    textTransform: 'capitalize',
    fontWeight: '600 !important'
  },
  titleColor: {
    color: 'rgba(0,0,0,0.5)',
    textTransform: 'capitalize',
    marginBottom: '4px !important'
  },
  fontS1: {
    fontSize: '1rem'
  }
});

interface Props {
  profile: Profile;
}

const ProfileItem = (props: Props) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeAccordition = (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChangeAccordition}>
      <AccordionSummary
        expandIcon={expanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
        aria-controls="panel1bh-content"
        sx={{
          borderBottom: expanded && '1px solid rgba(0,0,0,0.1)',
          borderRadius: '5px 5px 0px 0px'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textTransform: 'capitalize',
            px: 1
          }}
        >
          {`Hồ sơ: ${props.profile.nickname}`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {edit ? (
          <Edit
            profile={props.profile}
            setLoadingBtn={setLoading}
            setEdit={setEdit}
          />
        ) : (
          <Info profile={props.profile} />
        )}
      </AccordionDetails>
      <AccordionActions>
        {edit && (
          <LoadingButton
            loading={loading}
            type="submit"
            form={`edit-profile-${props.profile.id}`}
            variant="outlined"
            color={loading ? 'secondary' : 'primary'}
            autoFocus
            sx={{ mb: 1 }}
          >
            <span>Lưu Thay Đổi</span>
          </LoadingButton>
        )}
        <Button
          variant="outlined"
          color={edit ? 'error' : 'secondary'}
          sx={{ mx: 2, mb: 1 }}
          onClick={() => setEdit(!edit)}
          disabled={loading}
        >
          {edit ? 'Hủy chỉnh sửa' : 'Chỉnh sửa hồ sơ'}
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

const Info = ({ profile }: { profile: Profile }) => {
  const classes = useStyles();
  const avatar = profile.avatar
    ? profile.avatar
    : '/static/images/avatars/ava_zappy.png';
  return (
    <Grid container spacing={2} px={1} py={2}>
      <Grid item xs={4}>
        <Grid container flexDirection="column" alignItems="center">
          <Avatar
            variant="square"
            alt={profile.nickname}
            src={avatar}
            className={classes.avatar}
            sx={{ width: 160, height: 160 }}
          />
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h5" className={classes.titleColor}>
              Tên hồ sơ:
            </Typography>
            <Typography variant="body1" className={classes.fontS1}>
              {profile.nickname}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className={classes.titleColor}>
              Tuổi:
            </Typography>
            <Typography variant="body1" className={classes.fontS1}>
              {getAge(new Date(profile.birthday)) + ' Tuổi'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className={classes.titleColor}>
              Ngày Sinh:
            </Typography>
            <Typography variant="body1" className={classes.fontS1}>
              {formatDate(new Date(profile.birthday))}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className={classes.titleColor}>
              Trạng Thái:
            </Typography>
            <Typography variant="body1" className={classes.fontS1}>
              <Label color={!profile.isLocked ? 'success' : 'error'}>
                {!profile.isLocked ? 'Đang hoạt động' : 'Đã Khóa'}
              </Label>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Edit = ({
  profile,
  setLoadingBtn,
  setEdit
}: {
  profile: Profile;
  setLoadingBtn: (value: boolean) => void;
  setEdit: (value: boolean) => void;
}) => {
  const { handleSubmit, control, reset } = useForm();
  const [fileUpload, setFileUpload] = useState<File>();
  const [isChangeAva, setIsChangeAva] = useState<boolean>(!profile.avatar);
  const { profiles, onChangeProfiles } = useAccountDetail();
  const { account, onChangeAccount } = useAccountStore();

  const { updateProfile } = useProfileApi();

  const save = (data: any) => {
    setLoadingBtn(true);

    if (isChangeAva && fileUpload) data.avatar = fileUpload;
    data.isLocked = Boolean(data.isLocked);
    data.birthday = format(data.birthday, 'yyyy-MM-dd');

    updateProfile(profile.id, data)
      .then((response) => {
        SuccessSnackbar(`Cập nhật thành công hồ sơ ${profile.nickname}`);
        const newProfiles = profiles.map((item) =>
          item.id !== profile.id ? item : { ...profile, ...response.data }
        );
        onChangeProfiles(newProfiles);
        onChangeAccount({ ...account, profiles: newProfiles });
        setIsChangeAva(false);
        setFileUpload(null);
        setEdit(false);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingBtn(false);
        }, 750);
      });
  };

  useEffect(() => {
    reset();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setFileUpload(undefined);
    }
    setIsChangeAva(event.target.checked);
  };

  return (
    <Grid container spacing={2} px={1} py={2}>
      <Grid item xs={12}>
        <form id={`edit-profile-${profile.id}`} onSubmit={handleSubmit(save)}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Grid
                container
                flexDirection="column"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <UploadImage
                    fileUpload={fileUpload}
                    urlImage={
                      profile.avatar && isChangeAva ? '' : profile.avatar
                    }
                    setFileUpload={setFileUpload}
                    notShowDelete={!isChangeAva}
                    style={{
                      height: '160px',
                      width: '160px'
                    }}
                  />
                </Grid>
                <Grid item>
                  {profile.avatar && (
                    <FormControlLabel
                      label="Thay đổi ảnh hồ sơ"
                      control={
                        <Checkbox
                          checked={isChangeAva}
                          onChange={handleChange}
                        />
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="nickname"
                    control={control}
                    defaultValue={profile.nickname}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <TextField
                        label={'Tên hồ sơ (nickname)'}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        fullWidth
                      />
                    )}
                    rules={{
                      required: 'Không được để trống!'
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="birthday"
                    control={control}
                    defaultValue={new Date(profile.birthday)}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <DatePicker
                        label="Ngày Sinh"
                        value={value}
                        onChange={onChange}
                        inputFormat="dd/MM/yyyy"
                        renderInput={(props: TextFieldProps) => (
                          <TextField
                            {...props}
                            error={!!error}
                            helperText={error?.message}
                            variant="outlined"
                          />
                        )}
                      />
                    )}
                    rules={{
                      required: 'Không được để trống!',
                      pattern: {
                        // prettier-ignore
                        value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                        message: 'Định dạng ngày tháng năm không chính xác!'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="select-label">Trạng Thái Hồ Sơ</InputLabel>
                    <Controller
                      name="isLocked"
                      control={control}
                      defaultValue={profile.isLocked ? 1 : 0}
                      rules={{ required: 'Trường này bắt buộc' }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error }
                      }) => (
                        <Select
                          labelId="select-label"
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          label="Trạng Thái Hồ Sơ"
                        >
                          <MenuItem value={0}>Hoạt Động</MenuItem>
                          <MenuItem value={1}>Khóa Hoạt Động</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ProfileItem;
