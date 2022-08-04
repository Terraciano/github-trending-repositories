import { FunctionComponent, useState } from "react";
import {
  AppShell,
  Header,
  Text,
  ActionIcon,
  useMantineColorScheme,
  Burger,
  MediaQuery,
  useMantineTheme,
  Group,
} from "@mantine/core";
import { CardList } from "./CardList";
import { useGithubData } from "../services/useGithubData";
import { NavbarContent } from "./NavbarContent";
import { getSavedRepos } from "../utils/getSavedRepos";
import { getLanguages } from "../utils/getLanguages";
import { getFilteredResults } from "../utils/getFilteredResults";
import { IconMoonStars, IconSun } from "@tabler/icons";

export const AppWrapper: FunctionComponent = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { items, error } = useGithubData();
  const savedRepos = getSavedRepos(items);

  const [showSavedResults, setShowSavedResults] = useState<boolean>(false);

  const [language, setLanguage] = useState<string | null>(null);
  const [isNavigationHidden, setIsNavigationHidden] = useState(true);
  const [forceUpdate, setForceUpdate] = useState<boolean>(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      padding={"xl"}
      navbar={
        <NavbarContent
          handleApplyFiltersCta={() => setIsNavigationHidden(true)}
          isHidden={isNavigationHidden}
          onSelectChange={(language) => setLanguage(language)}
          languages={getLanguages(showSavedResults ? savedRepos : items)}
          onClick={() => setShowSavedResults(!showSavedResults)}
        />
      }
      header={
        <Header height={60} sx={{ display: "flex" }}>
          <Group
            sx={{ height: "100%", width: "100%" }}
            px={20}
            position="apart"
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={!isNavigationHidden}
                onClick={() => setIsNavigationHidden((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
            <Text>
              {showSavedResults
                ? "Saved Github Repositories"
                : "Most Popular Github Repositories"}
            </Text>
            <ActionIcon
              variant="outline"
              color={colorScheme === "dark" ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              ml={"auto"}
            >
              {colorScheme === "dark" ? (
                <IconSun size={18} />
              ) : (
                <IconMoonStars size={18} />
              )}
            </ActionIcon>
          </Group>
        </Header>
      }
    >
      {error ? (
        <Text weight={"bold"} size={"xl"}>
          {`Oops, there was an error with your request 😔`}
        </Text>
      ) : (
        <CardList
          onSave={() => setForceUpdate(!forceUpdate)}
          items={getFilteredResults(
            showSavedResults ? savedRepos : items,
            language
          )}
        />
      )}
    </AppShell>
  );
};
