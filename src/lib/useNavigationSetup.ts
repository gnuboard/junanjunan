import { useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';


let navigationPromise: Promise<NavigateFunction>;

let resolveNavigation: (navigate: NavigateFunction) => void;

navigationPromise = new Promise((resolve) => {
  resolveNavigation = resolve;
});


export const setNavigation = (navigate: NavigateFunction) => {
  resolveNavigation(navigate);
};


export const getNavigation = async (): Promise<NavigateFunction> => {
  return navigationPromise;
};


export const useNavigationSetup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigation(navigate);
  }, [navigate]);
};