import React from 'react';

export type DebugProps = {
    label?: string;
    item: unknown;
}

export const Debug = (props: DebugProps) => {
    const { item, label } = props;
    return <>
        <p> {label}</p>
        <pre>
            {JSON.stringify(item, null, 2)}
        </pre>
    </>;
};
