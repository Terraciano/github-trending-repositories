import { FunctionComponent, useEffect, useState } from "react";
import { Text, Card, Badge, Group } from "@mantine/core";
import { Repository } from "../types/githubApi.types";
import { BookmarkModule } from "./BookmarkModule";
import { format } from "date-fns";
import { IconClock } from "@tabler/icons";

export const RepositoryCard: FunctionComponent<
  Repository & { onSave: (id: number) => void }
> = ({ description, stars, name, url, id, onSave, language, date }) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const savedRepos = localStorage.getItem("savedRepositories");
    if (!savedRepos) return;

    setIsSaved(JSON.parse(savedRepos).find((item: number) => item === id));
  }, [id]);

  return (
    <Card
      radius="md"
      shadow="sm"
      component={"li"}
      withBorder={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "10px 0",
        padding: "4px 8px",
        transition: "all 0.1s ease",
        minHeight: isMobile ? 200 : 300,
      }}
    >
      <Group>
        <Text
          size={"lg"}
          weight="bold"
          variant={"link"}
          component={"a"}
          href={url}
          target={"_blank"}
          rel={"noopener noreferrer"}
          sx={{
            wordBreak: "break-word",
          }}
        >
          {name}
        </Text>
      </Group>
      <Group position={"apart"} sx={{ paddingTop: "auto", height: "100%" }}>
        <Text sx={{ width: "100%" }}>{description}</Text>
        <BookmarkModule
          isSaved={isSaved}
          stars={stars}
          onClick={() => {
            setIsSaved(!isSaved);
            onSave(id);
          }}
        />
      </Group>
      <Group sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <IconClock size={20} />
          <Text size={"xs"} ml={5}>
            {format(new Date(date), "MMM do yyyy")}
          </Text>
        </div>
        <Badge
          p={"xs"}
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 90 }}
          sx={{ width: "auto", textAlign: "left" }}
        >
          {language || "Other"}
        </Badge>
      </Group>
    </Card>
  );
};
