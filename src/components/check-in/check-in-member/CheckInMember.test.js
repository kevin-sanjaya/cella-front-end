import React from 'react';
import { wait, fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/react';
import store from "../../../redux/store";
import { Provider } from 'react-redux';
import CheckInMember from './CheckInMember';

const renderWithRedux = () => render(<Provider store={store}><CheckInMember /></Provider>);

const mockSearchMember = (getByPlaceholderText, getByText) => {
    const input = getByPlaceholderText('Masukan 12-Digit Nomor Identitas Member');
    fireEvent.change(input, { target: { value: '123456789012' }});
    getByText('Cari Member').click();
}

test('Search button should be disabled if member ID field is empty', () => {
    const { getByText, getByPlaceholderText } = renderWithRedux();
    const input = getByPlaceholderText('Masukan 12-Digit Nomor Identitas Member');
    expect(input).not.toHaveValue();
    expect(getByText('Cari Member')).toBeDisabled();
});

test('Successful member search should render member info component', async () => {
    const { getByPlaceholderText, getByText } = renderWithRedux();
    mockSearchMember(getByPlaceholderText, getByText);
    expect(getByText('Cari Member')).not.toBeDisabled();

    await wait(() => expect(getByText('Edo Bastian')).toBeInTheDocument());
});

test('Member info component should have complete data elements', async () => {
    const { getByPlaceholderText, getByText } = renderWithRedux();
    mockSearchMember(getByPlaceholderText, getByText);
    
    await wait(() => {
        expect(getByText('Nomor Identitas Member')).toBeInTheDocument();
        expect(getByText('Jenis Member')).toBeInTheDocument();
        expect(getByText('Member Berlaku Sampai')).toBeInTheDocument();
        expect(getByText('Tanggal Lahir')).toBeInTheDocument();
    });
});

