import axios from "axios";
import React, { useEffect } from "react";
import {  getDiagnosis, useStateValue } from "../state";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const DiagnosisDetails = ({ code }: { code: string }) => {
    const [{ diagnosis }, dispatch] = useStateValue();

    useEffect(() => {
        if (!diagnosis[code])
            void axios
                .get<Diagnosis>(`${apiBaseUrl}/diagnosis/${code}`)
                .then(
                    ({ data }) => dispatch(getDiagnosis(data))
                );
    }, []);

    if (!diagnosis[code])
        return <h1>loading...</h1>;

    return (
        <li>
            {code} {diagnosis[code].name}
        </li>
    );
};

export default DiagnosisDetails;
