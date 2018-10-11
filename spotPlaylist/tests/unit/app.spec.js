import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import App from '@/App'; //  same as '@/' == '../../src'

describe('App.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Counter);
    wrapper.find('button').trigger('click');
    wrapper.find('button').trigger('click');
    expect(wrapper.text()).to.include(2);
  });
});
