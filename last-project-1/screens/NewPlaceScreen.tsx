import React, { useState, } from "react";
import { StyleSheet, View, Button,  } from "react-native";
import { NewPlaceScreenProps } from "../types";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikInputText from "../reusable/FormikInputText";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/places_actions";
import { PlacesThunkDispatch } from "../store/types";
import Place from "../models/Place";
import FormikPicker from "../reusable/FormikPicker";
import ImgPicker, { ImageProperties } from "../components/ImgPicker";

const styles = StyleSheet.create({
  form: {},
  titleStyle: {
    width: '25%'
  }
});

const validationSchema = Yup.object().shape({
  place: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

const NewPlaceScreen: React.FC<NewPlaceScreenProps> = (props) => {
  const [imageSrc, setImageSrc] = useState<ImageProperties | null>(null);
  const dispatch: PlacesThunkDispatch = useDispatch();
  const onSubmit: (values: { place: string; address: string }) => void = async (
    values
  ) => {
    const imageUri = imageSrc === null ? '' : imageSrc.uri;
    await dispatch(addPlace(values.place, values.address, imageUri));
    props.navigation.goBack();
  };
  const setImg = (src: ImageProperties) => {
    setImageSrc(src);
  };

  return (
    <Formik
      initialValues={{ place: "", address: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <View style={styles.form}>
          <FormikInputText
            direction="row"
            formik={formik}
            id="place"
            title="Name:"
            titleStyle={styles.titleStyle}
          />
          <FormikInputText
            direction="row"
            formik={formik}
            id="address"
            title="Address:"
            titleStyle={styles.titleStyle}
          />
          <ImgPicker setImageSrc={setImg} imageUri={imageSrc ? imageSrc.uri : ''} />
          <Button title="Submit" onPress={formik.submitForm} />
        </View>
      )}
    </Formik>
  );
};

export default NewPlaceScreen;
