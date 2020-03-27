import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import CheckInMember from './CheckInMember';
import store from "../../../redux/store";
import { wait, fireEvent } from '@testing-library/dom';

const setup = () => render(<Provider store={store}><CheckInMember /></Provider>);

test('Search button should be disabled if member ID field is empty', () => {
    const { getByText, getByTestId } = setup();
    const input = getByTestId('member-id-input');
    expect(input).not.toHaveValue();
    expect(getByText('Cari Member')).toBeDisabled();
});

test('Member search should render member info component', async () => {
    const { getByTestId, getByText } = setup();
    const input = getByTestId('member-id-input');
    fireEvent.change(input, { target: { value: '123' }});
    expect(getByText('Cari Member')).not.toBeDisabled();
    getByText('Cari Member').click();

    await wait(() =>
        expect(getByText('Edo Bastian')).toBeInTheDocument()
    );
});

