import React, { useEffect } from "react";
import { THEME } from "../../constants";
import { getTheme, setTheme } from "../../utils";
import { setDarkTheme, setLightTheme } from "../../utils/theme";

import { LuSun, LuMoon } from "react-icons/lu";

import "./index.scss";

const Theme = ({ checked, setChecked, scrollTriggered }) => {
  const getNewTheme = (checked) => {
    return checked ? THEME.LIGHT : THEME.DARK;
  };

  const handleSwitch = (checked) => {
    const newTheme = getNewTheme(checked);
    setTheme(newTheme);
    setChecked(checked);

    if (checked) {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  };

  useEffect(() => {
    const defaultTheme = getTheme(THEME.LIGHT);
    const checked = defaultTheme === THEME.LIGHT;
    setChecked(checked);
    handleSwitch(checked);
  }, []);

  return (
    <div
      className="themeSwitch"
      data-light={checked}
      data-scroll={scrollTriggered}
      onClick={() => handleSwitch(!checked)}
    >
      {checked ? (
        <LuSun
          size={28}
          color={
            scrollTriggered ? "var(--default-black)" : "var(--default-white)"
          }
        />
      ) : (
        <LuMoon size={23} color="var(--default-white)" />
      )}
    </div>
  );
};

export default Theme;
