import { FunctionComponent } from "react";
import {
  Button,
  Navbar,
  Text,
  Select,
  MediaQuery,
  Checkbox,
} from "@mantine/core";

type NavbarContentProps = {
  onClick: () => void;
  handleApplyFiltersCta: () => void;
  onSelectChange: (value: string | null) => void;
  languages: Array<string>;
  isHidden: boolean;
};

export const NavbarContent: FunctionComponent<NavbarContentProps> = ({
  onClick,
  languages,
  onSelectChange,
  isHidden,
  handleApplyFiltersCta,
}) => {
  return (
    <Navbar
      hidden={isHidden}
      p="xl"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 300 }}
      height={"100%"}
    >
      <Navbar.Section m={"xs"}>
        <Text size={"xl"} weight={"bold"}>
          Filters
        </Text>
      </Navbar.Section>
      <Navbar.Section m={"xs"}>
        <Select
          defaultValue={"All"}
          label="Available languages"
          data={languages}
          onChange={(value) => onSelectChange(value)}
        />
      </Navbar.Section>
      <Navbar.Section sx={{ display: "flex" }} m={"xs"}>
        <label style={{ display: "flex" }}>
          <Text mr={5}>Show saved results only</Text>
          <Checkbox onClick={onClick}></Checkbox>
        </label>
      </Navbar.Section>
      <Navbar.Section>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Button onClick={handleApplyFiltersCta} m={"sm"}>
            Apply Filters
          </Button>
        </MediaQuery>
      </Navbar.Section>
    </Navbar>
  );
};
