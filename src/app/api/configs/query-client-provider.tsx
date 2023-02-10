/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ReactNode } from "react";
import {
    QueryClient,
    QueryClientProvider as RQQueryClientProvider,
} from "react-query";

import { fetch } from "../fetch";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: async ({ queryKey, signal }) => {
                const data = await fetch<{}>(
                    `${queryKey[0]}`,
                    {
                        signal,
                    },
                );

                return data;
            },
        },
    },
});

interface Props {
    children: ReactNode;
}

function QueryClientProvider({ children }: Props) {
    return (
        <RQQueryClientProvider client={queryClient}>
            {children}
        </RQQueryClientProvider>
    );
}

export { QueryClientProvider };
