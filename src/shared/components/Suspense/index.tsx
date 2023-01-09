import { Suspense as ReactSuspense, FC, ReactNode } from "react";
import { cn } from "@utils/";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import "./index.scss";

const b = cn("spin");

const antIcon = <LoadingOutlined style={{ fontSize: 74 }} spin />;

interface Props {
    children: ReactNode;
}

export const Suspense: FC<Props> = function ({ children }) {
    return (
        <ReactSuspense
            fallback={
                <div className={b()}>
                    <Spin indicator={antIcon} />
                </div>
            }
        >
            {children}
        </ReactSuspense>
    );
};
