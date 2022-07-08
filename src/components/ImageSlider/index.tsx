import React, { useState, useRef } from'react'
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';
import{
    Container,
    ImageIndexes,
    CarImageWrapper,
    CarImage,
}from'./styles';

interface Props {
    imageUrl: {
        id: string;
        photo: string;
    }[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({imageUrl}: Props){
    const [imageIndex, setImageIndex] = useState(0)
    const indexChanged = useRef((info: ChangeImageProps)=>{
        const index = info.viewableItems[0].index!
        setImageIndex(index)
    })

    return (
        <Container>
            <ImageIndexes>
                {
                    imageUrl.map((item, index)=>(
                        <Bullet
                            key={String(item.id)}
                            active={index === imageIndex}
                        />
                    ))
                }
            </ImageIndexes>
                <FlatList
                    data={imageUrl}
                    keyExtractor={item=>item.id}
                    renderItem={({item})=> (
                        <CarImageWrapper>
                            <CarImage
                                source={{uri:item.photo}}
                                resizeMode="contain"
                            />
                        </CarImageWrapper>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={indexChanged.current}
                />
        </Container>
    );
}