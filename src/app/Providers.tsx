import { ReactNode } from "react";

import { Initializer, ModalsContainer } from "@/components";
import { FiltersContextProvider, ModalsHandlersProvider } from "@/contexts";
import { ReduxProvider } from "@/redux";

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ReduxProvider>
      <Initializer>
        <ModalsHandlersProvider>
          <ModalsContainer>
            <FiltersContextProvider>{children}</FiltersContextProvider>
          </ModalsContainer>
        </ModalsHandlersProvider>
      </Initializer>
    </ReduxProvider>
  );
};
