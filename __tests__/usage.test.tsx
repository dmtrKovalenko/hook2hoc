import * as React from "react";

import { mount } from "enzyme";
import hook2hoc, { tuple } from "../src";

type Props = {
  someAnotherProp: string;
  input: {
    value: string | undefined;
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

class ClassComponent extends React.Component<Props> {
  render() {
    const { value, onChange } = this.props.input;
    return <input value={value} onChange={onChange} />;
  }
}

function useFormInput(defaultValue?: string, foo?: number) {
  const [value, setValue] = React.useState(defaultValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value)
  };
}

test("It should render hoc for explicit hook", () => {
  const SimpleComponent = () => <span> text </span>
  const HookedComponent = hook2hoc("state", React.useState)(SimpleComponent)

  const component = mount(<HookedComponent />)
  expect(component.find("stateHook(SimpleComponent)").length).toBe(1);
})

test("It should render hook as hoc", () => {
  const HookedClass = hook2hoc("input", useFormInput, ["124", 51])(ClassComponent);
  const component = mount(<HookedClass someAnotherProp="test" />);
  
  component.find("input").simulate("change", { target: { value: "51" } });
  expect(component.find("input").prop("value")).toBe("51");
});

test("It should work with dynamic props", () => {
  const HookedClass = hook2hoc("input", useFormInput)(ClassComponent, props =>
    tuple([props.someAnotherProp, 51])
  );

  const component = mount(<HookedClass someAnotherProp="test" />);
  expect(component.find("input").prop("value")).toBe("test");
});
