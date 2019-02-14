import React from "react";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function tuple<T1, T2, T3, T4, T5>(
  data: [T1, T2, T3, T4, T5]
): typeof data;
export function tuple<T1, T2, T3, T4>(data: [T1, T2, T3, T4]): typeof data;
export function tuple<T1, T2, T3>(data: [T1, T2, T3]): typeof data;
export function tuple<T1, T2>(data: [T1, T2]): typeof data;
export function tuple(data: Array<any>) {
  return data;
}

export const hook2hoc = <
  TResult,
  TArgs extends any[],
  TProp extends string,
  TComponentProps extends { [key in TProp]: TResult }
>(
  propName: TProp,
  useHook: (...args: TArgs) => TResult,
  defaultArgs?: TArgs
) => <TInnerProps extends TComponentProps>(
  Component: React.ComponentType<TInnerProps>,
  createArgsFromProps?: (props: Omit<TInnerProps, TProp>) => TArgs
) => {
  // HOC
  const withHook: React.SFC<Omit<TInnerProps, TProp>> = props => {
    let args: TArgs = createArgsFromProps
      ? createArgsFromProps(props)
      : defaultArgs || ([] as any);

    const result = useHook(...args);
    const innerProps = { [propName]: result } as TComponentProps;

    return <Component {...props as any} {...innerProps} />;
  };

  withHook.displayName = `${propName}Hook(${Component.displayName || Component.name})`;

  return withHook;
};
