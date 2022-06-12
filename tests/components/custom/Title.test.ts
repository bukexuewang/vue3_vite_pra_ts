import { mount } from '@vue/test-utils';
import TitleVue from '@/components/custom/Title.vue';

describe('测试vue组件', () => {
  it('展示title组件，小属性的情况', async () => {
    const wrapper = mount(TitleVue, {
      props: {
        title: 'Hello world',
        type: 'small',
      },
    });

    // Assert the rendered text of the component
    // expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('p').text()).toBe('0');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('p').text()).toBe('1');
  });

  // it('展示title组件，大属性的情况', () => {
  //   const wrapper = mount(TitleVue, {
  //     props: {
  //       title: 'Hello world',
  //       type: 'large',
  //     },
  //   });

  //   // Assert the rendered text of the component
  //   expect(wrapper.html()).toMatchSnapshot();
  // });
});
