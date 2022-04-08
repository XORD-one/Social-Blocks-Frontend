import { PaletteMode } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '..';
import { changeTheme } from '../../redux/actions/themeActions';

export const useThemeSwitch = (): [PaletteMode, () => void] => {
  const mode: PaletteMode = useAppSelector(state => {
    return state.themeReducer.theme;
  });

  const dispatch = useDispatch();

  const switchTheme = () => {
    dispatch(changeTheme(mode === 'light' ? 'dark' : 'light'));
  };

  return [mode, switchTheme];
};
