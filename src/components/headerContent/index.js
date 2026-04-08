import React from "react";
import "./index.scss";
import { format } from "date-fns";
import { LuCalendar, LuBookOpen } from "react-icons/lu";

export const HeaderContent = ({
  title,
  subtitle,
  category,
  tags,
  icon,
  date,
}) => {
  return (
    <div className="headerContent">
      <div className="headerInnerContent">
        {icon && (
          <p role="img" aria-label="headerIcon" className="headerIcon">
            {icon}
          </p>
        )}
        <div className="headerDetails">
          {category && (
            <p className="headerDetail">
              <LuBookOpen size={16} color="var(--default-darker-white)" />
              {category}
            </p>
          )}
          {date && (
            <p className="headerDetail">
              <LuCalendar size={16} color="var(--default-darker-white)" />
              {format(new Date(date), "MMMM dd yyyy")}
            </p>
          )}
        </div>
        <p className="headerTitle">{title}</p>
        <p className="headerSubTitle">{subtitle}</p>
        <div className="headerTags">
          {tags &&
            tags.map((tag) => (
              <p key={tag} className="headerTag">
                #{tag}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};
