import { FormikProps } from 'formik';
import { TextStyle, ViewStyle, PickerProps, } from 'react-native';

export type FormInputProps = {
  id: string;
  title?: string;
  formik: FormikProps<any>;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  direction?: "row" | "column";
};

export type NavHeaderButtonProps = {
  navigation: any;
  androidIconName: string;
  iosIconName: string;
  title: string;
  onPress?: (title: string) => {};
};

export type FormikPickerProps =  {
  pickerStyle?: ViewStyle;
  pickerContainerStyle?: ViewStyle;
  pickerItemStyle?: ViewStyle;
  titleStyle?: TextStyle;
  items: Array<{ label: string, value: string }>;
  formik: FormikProps<any>;
  id: string;
  title?: string;
  nativePickerProps?: PickerProps;
  mode?: 'dropdown' | 'dialog';
  enabled?: boolean;

};