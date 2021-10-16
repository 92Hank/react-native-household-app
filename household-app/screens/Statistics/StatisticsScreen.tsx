import React, { FC } from 'react';
import { SafeAreaView, View } from "react-native";
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';

type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const StatisticsScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {



    return (
        <SafeAreaView>
            <View>


            </View>
        </SafeAreaView>
    )
};

export default StatisticsScreen;