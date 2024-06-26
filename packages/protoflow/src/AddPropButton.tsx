import React, { useContext } from 'react';
import { generateId } from './lib/IdGenerator';
import { FlowStoreContext } from "./store/FlowsStore";
import Button from './Button';
import { getEmptyFieldData } from './utils';

type ComponentProps = {
    nodeData: any;
    id: any;
    type?: string;
    style?: React.CSSProperties;
    keyId?: any | null;
    label?: string | null;
};

export default ({ nodeData, id, type = 'Param', style = {}, keyId = null, label = null }: ComponentProps) => {
    const useFlowsStore = useContext(FlowStoreContext)
    const setNodeData = useFlowsStore(state => state.setNodeData)
    const typeMap = {
        'Attribute': 'attr',
        'Method': 'meth',
        'Case': 'case',
        'Element': 'element',
        'Component': 'element',
        'Import': 'import',
        'param': 'param',
        "Prop": "prop",
        "Child": "child",
        "Union": "union"
    };
    const typeName = typeMap[type] || 'param';

    keyId = keyId !== null ? keyId : typeName + '-' + generateId();
    const onAddParam = () => {
        if (['child', 'case', 'element', 'union'].includes(typeName)) {
            keyId = typeName + '-' + ((Object.keys(nodeData)?.filter(key => key.startsWith(`${typeName}-`)).length + 1) ?? 1)
        }

        setNodeData(id, { ...nodeData, [keyId]: getEmptyFieldData(keyId) })
    }

    return <Button onPress={onAddParam} label={label ?? `Add ${type}`} style={style} />
}