import React, { FC } from "react";
import { household } from "../../../Common/household";
import EmojiSelector, { Avatars } from "./EmojiSelector";

type Props = {
    household: household;
};

const MemberEmojiSelector: FC<Props> = ({ household }: Props): React.ReactElement => {
    const existingAvatars: number[] = [];
    let avatars = Object.keys(Avatars).filter((key) => !isNaN(Number(key)));
    console.log("avatars", avatars);
    household.member.forEach((element) => {
        existingAvatars.push(element.emoji);
    });
    avatars = avatars.filter((val) => !existingAvatars.includes(Number(val)));

    return (
        <EmojiSelector
            avatarList={avatars}
            avatarSelect={(selected) => {
                console.log(selected);
            }}
        ></EmojiSelector>
    );
};

export default MemberEmojiSelector;
