import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import { useFormik } from 'formik'
import { object, ref, string } from 'yup'
import { Input } from '@/components/ui/Input'
import { ICarouselInstance } from 'react-native-reanimated-carousel/src/types'

const UpdateUser = () => {
  const refSurname = useRef<TextInput>(null);
  const refPassword = useRef<TextInput>(null);
  const refConfirmPassword = useRef<TextInput>(null);
  const {values, touched, errors, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      avatar: '',
      farmName: '',
      farmLocation: ''
    },
    validationSchema: object().shape({
      name: string(),
      surname: string(),
      email: string()
        .email("Invalid email address"),
    }),
    onSubmit: (values) => {
      //   TODO request
    }
  })

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Input
        value={values.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        error={touched.email && errors.email ? errors.email : ""}
        // inputStyle={styles.input}
        label="Email"
        keyboardType="email-address"
        onSubmitEditing={() => refPassword.current?.focus()}
      />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  }
})

export default UpdateUser