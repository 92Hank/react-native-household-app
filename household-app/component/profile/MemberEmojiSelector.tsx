import React, { FC, useState } from "react";
import { household } from "../../../Common/household";
import EmojiSelector, { Avatars } from "../common/EmojiSelector";

type Props = {
    currentAvatar?: Avatars;
    household: household;
    newSelected: (avatarId: Avatars) => void;
};

const MemberEmojiSelector: FC<Props> = ({ currentAvatar, household, newSelected }: Props): React.ReactElement => {
    const [avatar, setAvatar] = useState<Avatars>();

    const existingAvatars: number[] = [];
    let avatars = Object.keys(Avatars).filter((key) => !isNaN(Number(key)));

    household.member.forEach((element) => {
        existingAvatars.push(element.emoji);
    });
    avatars = avatars.filter((val) => !existingAvatars.includes(Number(val)));

    if (currentAvatar) {
        avatars = [...avatars, String(currentAvatar)];
        console.log("avatars", avatars);
    }

    const avatarSelect = (avatar: Avatars) => {
        setAvatar(avatar);
        newSelected(avatar);
    };

    return <EmojiSelector selectedAvatars={avatar} avatarList={avatars} avatarSelect={avatarSelect}></EmojiSelector>;
};

export default MemberEmojiSelector;
