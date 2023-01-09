import { useState, FC } from "react";
import { useQueryClient, useQuery } from "react-query";
import { Button, Spin, Typography } from "antd";

import { cn } from "@utils/";
import { ResponseInterface } from "@localtypes/*";
import { IAPIError } from "@API/*";

import "./index.scss";

const { Text } = Typography;

const b = cn("breedchildrow");

type BreedChildRecord = {
    breed: string;
    parentBreed: string;
};

interface Props {
    breedRecord: BreedChildRecord;
}

const BreedChildRow: FC<Props> = function ({ breedRecord }) {
    const queryClient = useQueryClient();

    const queryKeyPath = `/breed/${breedRecord.parentBreed}/${breedRecord.breed}/images/random/3`;
    const { isFetching, data, refetch } = useQuery<ResponseInterface<Array<string>>, IAPIError>(queryKeyPath, {
        enabled: false,
    });

    const [isShowed, setIsShowed] = useState<boolean>(false);

    return (
        <div className={b()}>
            <div className={b("inner")}>
                <div className={b("content")}>
                    <div className={b("breed")}>
                        <Text>
                            {breedRecord.parentBreed} - {breedRecord.breed}
                        </Text>
                    </div>
                    {data && Array.isArray(data?.message) ? (
                        <div className={b("images")}>
                            {data.message.map(srcImg => (
                                <img
                                    className={b("img")}
                                    key={srcImg}
                                    src={srcImg}
                                    alt={`The image of ${`${breedRecord.parentBreed} - ${breedRecord.breed}`} breed!`}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className={b("action")}>
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
                </div>
            </div>
        </div>
    );
};

export type { BreedChildRecord };
export { BreedChildRow };
