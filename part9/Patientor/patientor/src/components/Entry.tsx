import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import DiagnosisDetails from './DiagnosisDetails';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <Segment style={{ margin: '1em 0' }}>
            <h3>{entry.date} <Icon name='hospital' size='big' /></h3>
            <em>{entry.description}</em>
            <div>
                Discharge criteria: <br />
                <em>{entry.discharge.criteria}</em><br />
                Discharge date: <br />
                <em>{entry.discharge.date}</em><br />
            </div>
            <ul>
                {entry.diagnosisCodes?.map(code => <DiagnosisDetails code={code} key={code} />)}
            </ul>
        </Segment>
    );
};

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <Segment style={{ margin: '1em 0' }}>
            <h3>
                {entry.date} <Icon name='stethoscope' size='big' />
                <em>{entry.employerName}</em>
            </h3>
            <em>{entry.description}</em>
            <ul>
                {entry.diagnosisCodes?.map(code => <DiagnosisDetails code={code} key={code} />)}
            </ul>
        </Segment>
    );
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <Segment style={{ margin: '1em 0' }}>
            <h3>{entry.date} <Icon name='doctor' size='big' /></h3>
            <em>{entry.description}</em>
            <div>
                <Icon name="heart"
                    color={entry.healthCheckRating === 0 ? 'green' : 'red'}
                    size='large' />
            </div>
            <ul>
                {entry.diagnosisCodes?.map(code => <DiagnosisDetails code={code} key={code} />)}
            </ul>
        </Segment>
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const assertNever = (param: never) => {
    throw new Error("blabla assert error" + JSON.stringify(param));
};

export default EntryDetails;