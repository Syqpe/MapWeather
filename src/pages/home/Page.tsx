import { useMemo, FC } from "react";
import { useQuery } from "react-query";
import { Spin, Typography } from "antd";

import { IAPIError } from "@API/";
import { cn } from "@utils/";
import { AllBreeds, ResponseInterface } from "@localtypes/";
import { BreedRow, BreedRecord } from "./ui";

import "./Page.scss";

const { Title } = Typography;

const b = cn("home");

const Home: FC = function () {
    const { status, data } = useQuery<ResponseInterface<AllBreeds>, IAPIError>("/breeds/list/all", {
        staleTime: 60 * 1000 * 10, // 5min
    });

    const breedRecords = useMemo<Array<BreedRecord>>(() => {
        const allBreedsObj = data?.message instanceof Object ? data?.message : {};
        const allBreedsArr = Object.keys(allBreedsObj);

        return allBreedsArr.map((breed: string) => {
            const children: Array<{ breed: string; parentBreed: string }> = allBreedsObj[breed].map(
                (childBreed: string) => ({
                    breed: childBreed,
                    parentBreed: breed,
                }),
            );

            return {
                breed,
                children,
            } as BreedRecord;
        });
    }, [data?.message]);

    return status !== "success" ? (
        <Spin />
    ) : (
        <div className={b()}>
            <div className={b("inner")}>
                <div className={b("title")}>
                    <Title level={1}>Amazing breeds :)</Title>
                </div>
                <div className={b("content")}>
                    {breedRecords.map(breedRecord => (
                        <BreedRow key={breedRecord.breed} breedRecord={breedRecord} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export { Home };
