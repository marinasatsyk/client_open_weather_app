import { ReactNode } from "react";

export interface ProtectedRouteProps {
  clientToken: string | null;
  children: ReactNode;
  isRemeberme?: boolean;
}
