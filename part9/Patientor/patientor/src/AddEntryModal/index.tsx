import React from 'react';
import { Modal } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';
import AddEntryForm from './addEntryForm';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Omit<HealthCheckEntry, 'id'>) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit }: Props) => {
    return (
        <Modal open={modalOpen} onClose={onClose}>
            <Modal.Header>Add patient entry</Modal.Header>
            <Modal.Content>
                <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;