import React, { useEffect, useState } from'react'
import { Alert, KeyboardAvoidingView, StatusBar} from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import * as Yup from 'yup'

import{
    Container, 
    Header, 
    SubTitle, 
    Title,
    Form,
    Footer,
}from'./styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import {database} from '../../databases'

interface NavigationProps{
    navigate: (screen: string) => void
}



export function SignIn(){
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation<NavigationProps>()
    const {signIn} = useAuth()

    async function handleSignIn(){
        try{
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha é obrigatória')
            })
            await schema.validate({email, password})
            signIn({email,password})

        }catch(error){
            if( error instanceof Yup.ValidationError){
                Alert.alert('Opa', error.message)
            }else{
                Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
            }
        }
    }

    function handleNewAccount(){
        navigation.navigate('SignUpFirtsStep')
    }

   
    return (
        <KeyboardAvoidingView behavior='position' enabled> 
            <Container>
                <StatusBar barStyle='dark-content' backgroundColor="transparent" translucent/>
                <Header>
                    <Title>
                        Estamos{'\n'} 
                        quase lá
                    </Title>
                    <SubTitle>
                        Faça seu login para começar{'\n'}
                        uma experiência incrível
                    </SubTitle>
                </Header>
                <Form>
                    <Input
                        iconName='mail'
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <PasswordInput
                        iconName='lock'
                        placeholder='Senha'
                        onChangeText={setPassword}
                        value={password}
                    />
                </Form>


                <Footer>
                    <Button
                        title='Login'
                        onPress={handleSignIn}
                        enabled={true}
                        loading={false}
                        />
                    <Button
                        title='Criar a conta gratuita'
                        color={theme.colors.background_secondary}
                        onPress={handleNewAccount}
                        enabled={true}
                        loading={false}
                        light={true}
                        />
                </Footer>
            </Container>
        </KeyboardAvoidingView>
    );  
}