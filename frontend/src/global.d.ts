import { type SM } from "@semcore/app-center-js-sdk";

declare global {
  interface Window {
    SM: SM;
  }
}
