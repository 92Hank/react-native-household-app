import React, { FC, useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import HouseholdComponent from "../../component/householdComponents/household.component/household.component";
import UserListComponent from "../../component/taskFolder/UserListComponent";
import styles from "../Household/styles";
import ChangeMemberStatusModal from "../../component/householdComponents/changeMemberStatusModal/changeMemberStatusModal"
// import { FeedStackScreenProps, MainRoutes } from "../../routes/routes";
import { defineAnimation } from "react-native-reanimated";

// type Props = FeedStackScreenProps<MainRoutes.UsersInHouseHoldScreen>;

const UsersInHouseHoldScreen = ({
  navigation,
}: any): React.ReactElement =>{
  const [modalOpen, setModalOpen] = useState(false);
  const [member, setSetMember] = useState<fullMemberInfo>();


  const clickOnMember = (item: fullMemberInfo) => {
    console.log("click");
    setSetMember(item);
    setModalOpen(true);
    console.log("open");
  };


  const handleClose = () => {
    console.log("close");
    setModalOpen(false);
  };
    return (
      <View style={styles.container}>
        <View>
          <View>
            <FlatList
              data={members}
              keyExtractor={(item: any) => item.userId}
              renderItem={({ item }) => (
                <UserListComponent
                  key={item.userId}
                  member={item}
                  onPress={() => clickOnMember(item)}
                />
              )}
            />
          </View>
        </View>
        <ChangeMemberStatusModal
          isOpen={modalOpen}
          handleModalClose={handleClose}
          member={member as fullMemberInfo}
        />
      </View>
    );
}

export default UsersInHouseHoldScreen;

const members: fullMemberInfo[] = [
  {
    name: "foo",
    userId: "foo",
    emoji: 1,
    isPaused: false,
    isOwner: false,
    AcceptedStatus: "pending",
  },
  {
    name: "foo2",
    userId: "foo2",
    emoji: 1,
    isPaused: false,
    isOwner: false,
    AcceptedStatus: "accepted",
  },
  {
    name: "foo3",
    userId: "foo3",
    emoji: 1,
    isPaused: false,
    isOwner: true,
    AcceptedStatus: "accepted",
  },
];

interface fullMemberInfo {
  name: string;
  userId: string;
  emoji: number;
  isPaused: boolean;
  isOwner: boolean;
  AcceptedStatus: "accepted" | "pending" | "rejected";
}