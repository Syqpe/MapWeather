import { useState, FC } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Button, Spin, Typography } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { cn } from "@utils/";
import { ResponseInterface } from "@localtypes/*";
import { IAPIError } from "@API/*";
import { BreedChildRecord, BreedChildRow } from "../BreedChildRow";

import "./index.scss";

const { Text } = Typography;

const b = cn("breedrow");

type BreedRecord = {
    breed: string;
    children: Array<BreedChildRecord>;
};

interface Props {
    breedRecord: BreedRecord;
}

const BreedRow: FC<Props> = function ({ breedRecord }) {
    const queryClient = useQueryClient();

    const queryKeyPath = `/breed/${breedRecord.breed}/images/random/3`;
    const { isFetching, data, refetch } = useQuery<ResponseInterface<Array<string>>, IAPIError>(queryKeyPath, {
        enabled: false,
    });

    const [isShowed, setIsShowed] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className={b()}>
            <div className={b("inner")}>
                <div className={b("content", { images: !breedRecord.children.length })}>
                    <div className={b("breed")}>
                        <Text>{breedRecord.breed}</Text>
                    </div>

                    {!breedRecord.children.length && data && Array.isArray(data?.message) ? (
                        <div className={b("images")}>
                            {data.message.map(srcImg => (
                                <img
                                    className={b("img")}
                                    key={srcImg}
                                    src={srcImg}
                                    alt={`The image of ${breedRecord.breed} breed!`}
                                />
                            ))}
                        </div>
                    ) : null}

                    {breedRecord.children.length && isOpen ? (
                        <div className={b("children")}>
                            {breedRecord.children.map(breedChildRecord => (
                                <BreedChildRow key={breedChildRecord.breed} breedRecord={breedChildRecord} />
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className={b("action")}>
                    {!breedRecord.children.length ? (
                        <Button
                            type="primary"
                            onClick={() => {
                                setIsShowed(true);

                                if (isFetching) {
                                    queryClient.cancelQueries(queryKeyPath);
                                } else {
                                    refetch();
                                }
                            }}
                        >
                            {isFetching ? <Spin /> : isShowed ? "Refresh" : "Show"}
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={() => {
                                setIsOpen(!isOpen);
                            }}
                            style={{ width: "70px" }}
                        >
                            {isOpen ? <UpOutlined /> : <DownOutlined />}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export type { BreedRecord };
export { BreedRow };
