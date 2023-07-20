import {StackActions} from '@react-navigation/native';
import {createRef} from 'react';

export const navigationRef = createRef<any>();

const navigate = (name: any, params?: object) => {
  if (navigationRef.current) {
    return navigationRef?.current?.navigate(name, {
      params,
    });
  }
  return null;
};

const push = (name: any, params?: object) => {
  if (navigationRef.current) {
    return navigationRef.current.dispatch(StackActions.push(name, params));
  }
  return null;
};

function goBack() {
  if (navigationRef.current && navigationRef?.current.canGoBack()) {
    navigationRef?.current?.goBack();
  }
  return null;
}

const popToTop = () =>
  navigationRef?.current?.dispatch(StackActions.popToTop());

const reset = (name: any, params?: object) => {
  if (navigationRef.current) {
    return navigationRef?.current?.reset({
      index: 0,
      routes: [
        {
          name,
          params,
        },
      ],
    });
  }
  return null;
};

const replace = (name: any, params?: object) => {
  if (navigationRef.current) {
    return navigationRef.current?.dispatch(StackActions.replace(name, params));
  }
  return null;
};

export {navigate, push, goBack, popToTop, reset, replace};
