import React from 'react';
import { shallow } from 'enzyme';
import { DefaultScreen } from './DefaultScreen';

describe('DefaultScreen ', () => {
  it('renders div with text Main Screen', () => {
    //When
    let wrapper = shallow(<DefaultScreen />);

    //Then
    expect(wrapper.find('div').props().children).toBe('Main Screen');
  });
});
