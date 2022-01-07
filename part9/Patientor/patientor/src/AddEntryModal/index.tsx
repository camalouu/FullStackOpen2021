import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { EntriesWithoutId } from '../types';
import AddEntryForm from './addEntryForm';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntriesWithoutId) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
    return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
            <Modal.Header>Add patient entry</Modal.Header>
            <Modal.Content>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;