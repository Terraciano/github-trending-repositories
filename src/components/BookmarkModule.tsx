import { FunctionComponent } from "react";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconBookmark } from "@tabler/icons";

type StarCtaProps = {
  stars: number;
  isSaved: boolean;
  onClick: () => void;
};

export const BookmarkModule: FunctionComponent<StarCtaProps> = ({
  isSaved,
  stars,
  onClick,
}) => {
  return (
    <Group
      mb={20}
      sx={{
        marginTop: "auto",
        display: "flex",
        alignContent: "center",
        width: "100%",
      }}
    >
      <div>
        <Text>{stars}</Text>
        <Text size={"xs"}>Stars</Text>
      </div>
      <ActionIcon
        color={"bordeaux"}
        aria-label={isSaved ? "Unsave this repository" : "Save this repository"}
        onClick={onClick}
        variant={isSaved ? "filled" : "outline"}
        sx={{ marginLeft: "auto" }}
      >
        <IconBookmark />
      </ActionIcon>
    </Group>
  );
};
