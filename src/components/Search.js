import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import * as Animatable from 'react-native-animatable';
import { MyContext } from '../contextApi/ContextApi';
import Icons from 'react-native-vector-icons/AntDesign'

const Search = () => {
    const { searchTxt, setsearchTxt } = useContext(MyContext)

    const close=()=>{
        setsearchTxt(null)
    }
    return (
        <View className='flex items-center p-2'>
            <Animatable.View
                animation={"flipInY"}
                duration={3000}
                className='w-11/12 bg-white dark:bg-gray-100 flex-row items-center rounded-xl px-2'>
                <Icons name='search1' size={18} color={'gray'} />

                <TextInput
                    className='p-2 flex-1'
                    placeholder='Search Here'
                    onChangeText={txt => setsearchTxt(txt)}
                    value={searchTxt}
                />
                {searchTxt ? <TouchableOpacity onPress={close}>
                    <Icons name='close' size={18} color={'red'}/>
                </TouchableOpacity> : null}
            </Animatable.View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({})