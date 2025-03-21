import { subDomainList } from "./constant";
import React from "react";

interface AppInfo {
  subdomain?: string;
  app: React.FC;
  main: boolean;
}

export const getApps = (): React.FC => {
  const subdomain = getSubDomain(window.location.hostname);

  const mainApp = subDomainList.find((app: AppInfo) => app.main);
  if (!mainApp) {
    throw new Error("Main app is not defined in subDomainList");
  }

  if (subdomain === "") return mainApp.app;

  const apps = subDomainList.find(
    (app: AppInfo) => subdomain === app.subdomain
  );
  return apps ? apps.app : mainApp.app;
};

// url.localhost
// url.urlbestshort.com
export const getSubDomain = (location: string): string => {
  const locationParts = location.split(".");
  const isLocalhost = locationParts.slice(-1)[0] === "localhost";
  const sliceTill = isLocalhost ? -1 : -2;
  return locationParts.slice(0, sliceTill).join("");
};
