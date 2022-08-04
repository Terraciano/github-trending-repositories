import { FunctionComponent, useEffect, useState } from "react";
import { RepositoryCard } from "./RepositoryCard";
import { Center, Loader, SimpleGrid, Title } from "@mantine/core";
import { addOrRemove } from "../utils/addOrRemove";
import { Repository } from "../types/githubApi.types";

const storedResults = localStorage.getItem("savedRepositories");

type CardListProps = {
  items: Array<Repository> | undefined;
  onSave: () => void;
};

export const CardList: FunctionComponent<CardListProps> = ({
  items,
  onSave,
}) => {
  const [savedRepos, setSavedRepos] = useState<Array<number>>(
    storedResults ? JSON.parse(storedResults) : []
  );

  useEffect(() => {
    onSave();
  }, [savedRepos]);

  const handleStarClick = (value: number) => {
    if (!items) return;

    setSavedRepos((prevState) => {
      if (!prevState) return [value];
      return addOrRemove(
        !!prevState.find((option) => option === value),
        value,
        prevState
      );
    });
  };

  useEffect(() => {
    if (savedRepos)
      return localStorage.setItem(
        "savedRepositories",
        JSON.stringify(savedRepos)
      );
    return localStorage.setItem("savedRepositories", "[]");
  }, [savedRepos]);

  return (
    <>
      {!items ? (
        <Center sx={{ height: "100vh" }}>
          <Loader />
        </Center>
      ) : (
        <>
          {!!items.length ? (
            <SimpleGrid
              cols={4}
              spacing={"lg"}
              breakpoints={[
                { maxWidth: 980, cols: 3, spacing: "md" },
                { maxWidth: 755, cols: 2, spacing: "sm" },
                { maxWidth: 600, cols: 1, spacing: "sm" },
              ]}
            >
              {items.map((item) => (
                <RepositoryCard
                  date={item.date}
                  language={item.language}
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  url={item.url}
                  stars={item.stars}
                  onSave={handleStarClick}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Title>You haven't saved any repositories... yet</Title>
          )}
        </>
      )}
    </>
  );
};
