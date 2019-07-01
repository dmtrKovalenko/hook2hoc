# hook2hoc
> Typesafe converter of React hooks to React hocs 🤓

[![npm version](https://img.shields.io/npm/v/hook2hoc.svg)](https://www.npmjs.com/package/hook2hoc)
[![bundlesize](https://badgen.net/bundlephobia/minzip/hook2hoc)](https://bundlephobia.com/result?p=hook2hoc@1.0.0)
[![codecov](https://codecov.io/gh/dmtrKovalenko/hook2hoc/branch/master/graph/badge.svg)](https://codecov.io/gh/dmtrKovalenko/hook2hoc)
[![travis](https://travis-ci.com/dmtrKovalenko/hook2hoc.svg?branch=master)](https://travis-ci.com/dmtrKovalenko/hook2hoc)

## What and why
Main purpose of this project is making integration of hooks much easier. It allowes primarily use hooks, and generate HOCs from on the flight.

This is an automate and type-safe converter of **React hooks** to ~~React HOCs~~. Just move your logic to hook, create a HOC for compatability and go. 

## Installation

```sh
npm install hook2hoc
```

## Usage 

The main purpose of this project is to easily reuse your custom hooks logic in class components.

```jsx
import { hook2hoc } from "hook2hoc"

function useFormInput(defaultValue) {
  const [value, setValue] = React.useState(defaultValue);
  return {
    value,
    onChange: e => setValue(e.target.value)
  };
}

class ClassComponent extends React.Component {
  ...
  
  render() {
    const { value, onChange } = this.props.formInput;
    return <input value={value} onChange={onChange} />;
  }
}

export default hook2hoc("formInput", useFormInput)(ClassComponent)
// or with default args
export default hook2hoc("formInput", useFormInput, ["initalValue"])(ClassComponent)
```

### Dynamic props

It is also possible to pass arguments to your hooks directly from the props. Just use function instead of array in last argument.

**!! If you need dynamyc props as arguments place it after component **
```jsx
hook2hoc("formInput", useFormInput)(ClassComponent, (props) => [props.someValueFromOutside])
```

### Type safety

This helper was created with static typing in mind. For typescript users it will infer the types properly. 
One thing is required for dynamic props

```typescript
import { hook2hoc, tuple } from "hook2hoc"

type Props = {
  someAnotherProp: string;
  formInput: {
    value: string | undefined;
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

function useFormInput(defaultValue: string, foo?: number) {
  const [value, setValue] = React.useState(defaultValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  };
}

class ClassComponent extends React.Component<Props> {
  render() {
    const { value, onChange } = this.props.input;
    return <input value={value} onChange={onChange} />;
  }
}

// tuple required for strict parameters type casting
const WithHook = hook2hoc(
  "formInput", useFormInput
)(ClassComponent, props => tuple(["initialValue"]))

<WithHook someAnotherProp="required as well" />
```
