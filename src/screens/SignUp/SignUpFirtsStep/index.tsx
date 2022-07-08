import { useNavigation } from '@react-navigation/native';
import React, { useState } from'react'
import { Alert, KeyboardAvoidingView } from 'react-native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import{
    Container, 
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle
}from'./styles';
import * as Yup from 'yup'

interface NavigationProps{
    navigate: (screen: string, {}) => void
    goBack: ()=> void
}

export function SignUpFirtsStep(){
    const navigation = useNavigation<NavigationProps>()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [driverLicense, setDriverLicense] = useState('0')

    function handleBack(){
        navigation.goBack()
    }

    async function handleNextStep(){
        try{
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatório'),
                email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
                name: Yup.string().required('Nome é obrigatório'),
            })

            const data = {name, email, driverLicense}
            await schema.validate(data)

            navigation.navigate('SignUpSecondStep', {user: data})
        }catch(error){
            if(error instanceof Yup.ValidationError){
                return Alert.alert('Opa', error.message)
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled> 
            <Container>
                <Header>
                    <BackButton onPress={handleBack}/>
                    <Steps>
                        <Bullet active/>
                        <Bullet/>
                    </Steps>
                </Header>
                <Title>
                    Crie sua{'\n'}
                    conta
                </Title>
                <SubTitle>
                    Faça seu cadastro de{'\n'}
                    forma rápida e fácil
                </SubTitle>
                <Form>
                    <FormTitle>1. Dados</FormTitle>
                    <Input
                        iconName='user'
                        placeholder='Nome'
                        onChangeText={setName}
                        value={name}
                    />
                    <Input
                        iconName='mail'
                        placeholder='E-mail'
                        keyboardType='email-address'
                        onChangeText={setEmail}
                        value={email}
                    />
                    <Input
                        iconName='credit-card'
                        placeholder='CNH'
                        keyboardType='numeric'
                        onChangeText={setDriverLicense}
                        value={driverLicense}
                    />
                </Form>
                <Button
                    title='Próximo'
                    onPress={handleNextStep}
                />
            </Container>
        </KeyboardAvoidingView>
    );
}