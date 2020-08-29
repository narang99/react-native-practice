import React, { useCallback, useEffect } from "react";
import { PropTypes } from "prop-types";
import {
  StyleSheet,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ShopHeaderButton from "../../components/UI/ShopHeaderButton";
import { useDispatch } from "react-redux";
import Product from "../../models/product";
import { editProduct, createProduct } from "../../store/actions/products";
import ShopInput from "../../components/UI/ShopInput";
import useFormValidator from "../../hooks/useFormValidator";
import { getCurrentUserId } from "../../backend/firebase/helpers";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  textBeforeInput: {
    fontSize: 19,
    fontFamily: "open-sans-bold",
    marginRight: 5,
  },
  textInputBar: {},
  textInputBarContainer: {
    borderBottomWidth: 1,
    padding: 4,
  },
});

const EditProductScreen = (props) => {
  const product = props.navigation.getParam("product");
  const dispatch = useDispatch();
  const [formState, inputChangeHandler] = useFormValidator(
    {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      price: product ? product.price : "",
      description: product ? product.description : "",
    },
    {
      title: product ? true : false,
      imageUrl: product ? true : false,
      price: product ? true : false,
      description: product ? true : false,
    },
    product ? true : false
  );

  const { navigation } = props;
  const submitHandler = useCallback(() => {
    if (!formState.isFormValid) {
      Alert.alert("Invalid inputs", "Please fill valid inputs", [
        { text: "Okay", style: "default", onPress: () => {} },
      ]);
      return;
    }
    const { title, imageUrl, description, price } = formState.inputs;
    if (product) {
      //edit
      dispatch(
        editProduct(
          new Product(
            product.id,
            getCurrentUserId(),
            title,
            imageUrl,
            description,
            Number.parseFloat(price)
          )
        )
      );
    } else {
      //create
      dispatch(
        createProduct(
          new Product(
            null,
            getCurrentUserId(),
            title,
            imageUrl,
            description,
            Number.parseFloat(price)
          )
        )
      );
    }
    navigation.goBack();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, formState, product]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
    // not setting navigation as dependency here as it leads to inifinite loop, setParams changes navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitHandler]);

  const { title, imageUrl, description, price } = formState.valids;

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1 }}
      // keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.screen}>
          <ShopInput
            label="Title"
            initialValue={formState.inputs.title}
            initialValidity={title}
            onChangeText={inputChangeHandler}
            errorMessage="Please Enter Valid Title!!"
            id="title"
            textInputProps={{
              keyboardType: "default",
            }}
            required
          />

          {product === undefined && (
            <ShopInput
              label="Price"
              id="price"
              initialValue={formState.inputs.price}
              onChangeText={inputChangeHandler}
              errorMessage="Please enter valid Price!!"
              initialValidity={price}
              textInputProps={{
                keyboardType: "decimal-pad",
              }}
              decimal
              required
              min={0}
            />
          )}
          <ShopInput
            label="Image URL"
            initialValue={formState.inputs.imageUrl}
            initialValidity={imageUrl}
            onChangeText={inputChangeHandler}
            errorMessage="Please Enter Valid Image URL!!"
            id="imageUrl"
            textInputProps={{
              keyboardType: "default",
            }}
            required
          />
          <ShopInput
            label="description"
            initialValue={formState.inputs.description}
            initialValidity={description}
            onChangeText={inputChangeHandler}
            errorMessage="Please Enter Valid Description!!"
            id="description"
            textInputProps={{
              keyboardType: "default",
              multiline: true,
              numberOfLines: 4,
            }}
            required
            minLength={4}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.propTypes = {
  navigation: PropTypes.object,
};

EditProductScreen.defaultProps = {};

EditProductScreen.navigationOptions = (config) => {
  const product = config.navigation.getParam("product");
  const isAddAction = product === undefined || product === null;
  const submitHandler = config.navigation.getParam("submit");
  return {
    headerTitle: isAddAction ? "Add" : product.title,
    // eslint-disable-next-line react/display-name
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
        <Item
          iconSize={23}
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          title="SaveChanges"
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;
