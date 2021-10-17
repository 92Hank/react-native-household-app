import React, { FC } from 'react';
import { SafeAreaView, View } from "react-native";
import PieChart from '../../component/PieChart';
import { FeedStackScreenProps, MainRoutes } from '../../routes/routes';


type Props = FeedStackScreenProps<MainRoutes.ProfileScreen>;

const StatisticsScreen: FC<Props> = ({ navigation }: Props): React.ReactElement => {
    const data = [50, 10, 40, 95, -4, -24, 85, 91]

    return (
        <SafeAreaView>
            <View>
                <PieChart data={data} />
            </View>
        </SafeAreaView>
    )
};

export default StatisticsScreen;