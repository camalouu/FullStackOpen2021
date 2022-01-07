import React from "react";
import { Formik, Form, Field } from "formik";
import { Grid, Button } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

interface FormProps {
    onSubmit: (values: Omit<HospitalEntry, 'id'>) => void;
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
                type: "Hospital",
                diagnosisCodes: [],
                discharge: {
                    criteria: '',
                    date: ''
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";

                type FieldErrorType = Omit<HospitalEntry, 'id' | 'type' | 'diagnosisCodes'>;

                const errors: FieldErrorType = {
                    description: "",
                    date: "",
                    specialist: "",
                    discharge: {
                        criteria: "",
                        date: ""
                    }
                };

                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.discharge.criteria) {
                    errors.discharge.criteria = requiredError;
                }
                if (!values.discharge.date) {
                    errors.discharge.date = requiredError;
                }

                if (errors.description ||
                    errors.date ||
                    errors.specialist ||
                    errors.discharge.criteria ||
                    errors.discharge.date) {
                    return errors;
                }
                // isValid will be true when errors object is empty
                return {};
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
                            label="Discharge criteria"
                            placeholder="Discharge criteria"
                            name="discharge.criteria"
                            component={TextField}
                        />
                        <Field
                            label="Discharge date"
                            placeholder="Discharge date"
                            name="discharge.date"
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