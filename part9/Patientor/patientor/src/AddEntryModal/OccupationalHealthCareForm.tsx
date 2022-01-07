import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";

interface FormProps {
    onSubmit: (values: Omit<OccupationalHealthcareEntry, 'id'>) => void;
    onCancel: () => void
}

const HealthCheckForm = ({ onSubmit, onCancel }: FormProps) => {

    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                type: "OccupationalHealthcare",
                diagnosisCodes: [''],
                employerName: '',
                sickLeave: {
                    startDate: '',
                    endDate: '',
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="EmployerName"
                            placeholder="EmployerName"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label="Sick Leave start date"
                            placeholder="Sick Leave start date"
                            name="sickLeave.startDate"
                            component={TextField}
                        />
                        <Field
                            label="Sick Leave end date"
                            placeholder="Sick Leave end date"
                            name="sickLeave.endDate"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik >
    );
};

export default HealthCheckForm;