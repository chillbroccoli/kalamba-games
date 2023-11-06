import { ClientRoutes } from "./routes";

export const navigation = [
  { name: "Home", href: ClientRoutes.HOME, protected: false },
  { name: "Editor", href: ClientRoutes.EDITOR, icon: "ion-compose", protected: true },
  { name: "Settings", href: ClientRoutes.SETTINGS, icon: "ion-gear-a", protected: true },
];
