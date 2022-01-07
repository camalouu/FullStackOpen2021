import React from "react";
import { useStateValue } from "../state";

const DiagnosisDetails = ({ code }: { code: string }) => {
    const [{ diagnosis }] = useStateValue();

    if (!diagnosis[code])
        return <h1>loading...</h1>;

    return (
        <li>
            {code} {diagnosis[code].name}
        </li>
    );
};

export default DiagnosisDetails;
