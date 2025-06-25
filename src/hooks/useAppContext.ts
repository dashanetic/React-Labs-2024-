import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleTheme, setLanguage, navigateTo } from "../redux/slices/appSlice";
import {
  selectAppSettings,
  selectCurrentPage,
  selectTheme,
  selectLanguage,
} from "../redux/selectors";
import { PageType } from "../types/appContext";

export const useAppContext = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectAppSettings);
  const currentPage = useAppSelector(selectCurrentPage);
  const theme = useAppSelector(selectTheme);
  const language = useAppSelector(selectLanguage);

  const toggleThemeHandler = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const setLanguageHandler = useCallback(
    (newLanguage: string) => {
      dispatch(setLanguage(newLanguage));
    },
    [dispatch]
  );

  const navigateToHandler = useCallback(
    (page: PageType) => {
      dispatch(navigateTo(page));
    },
    [dispatch]
  );

  return {
    settings,
    currentPage,
    theme,
    language,
    toggleTheme: toggleThemeHandler,
    setLanguage: setLanguageHandler,
    navigateTo: navigateToHandler,
  };
};
