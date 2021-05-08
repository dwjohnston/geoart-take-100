import React from 'react';

export type DebugProps = {
    title?: string;
    item: unknown;
}

export const Debug = (props: DebugProps) => {
    const { item, title } = props;
    return <pre>
        {JSON.stringify(item, null, 2)}
    </pre>;
};
