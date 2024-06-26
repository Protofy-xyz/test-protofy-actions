import { useMqttState, useSubscription } from 'mqtt-react-hooks';
import React, { useState } from "react";
import { XStack, YStack, Text, Paragraph, Button, Input, Spinner, Separator, Switch } from '@my/ui';
import { ElevatedArea, ContainerLarge, Tinted, Chip, useFetch } from 'protolib';
import { DeviceSubsystemMonitor, getPeripheralTopic } from 'protolib/bundles/devices/devices/devicesSchemas';

const Monitor = ({ deviceName, monitorData, subsystem }) => {
    const monitor = new DeviceSubsystemMonitor(deviceName, subsystem.name, monitorData)
    // Define the state hook outside of JSX mapping
    const [value, setValue] = useState<any>(undefined);
    //const value = 'test'
    const { message } = useSubscription(monitor.getEndpoint())
    const [result, loading, error] = useFetch(monitor.getValueAPIURL())
    const [scale, setScale] = useState(1);

    React.useEffect(() => {
        setValue(message?.message?.toString())
        setScale(1.15);
        setTimeout(() => {
            setScale(1);
        }, 200);
    }, [message])
    return (
        <XStack gap="$3">
            <Text flex={1} marginLeft={4} textAlign={"left"}>{monitor.getLabel()}: </Text>
            {(loading || (value === undefined && result?.value === undefined)) ? <Spinner color="$color7" /> : <Chip color={value === undefined ? 'gray' : '$color5'} text={`${value ?? result?.value} ${monitor.getUnits()}`} scale={scale} animation="bouncy" ></Chip>}
        </XStack>
    );
}

const Action = ({ deviceName, action, buttonAction }) => {
    const [value, setValue] = useState('');

    return (action.payload.value ?

        <Button
            key={action.name} // Make sure to provide a unique key for each Button
            onPress={() => { buttonAction(action) }}
            color="$color10"
            title={"Description: " + action.description}
            flex={1}
        >
            {action.label ?? action.name}
        </Button>

        : <XStack gap="$3">
            <Input
                value={value}
                onChange={async (e) => setValue(e.target.value)}
                width={80}
                placeholder="value"
                mr={8}
                flex={1}
            />
            <Button
                key={action.name} // Make sure to provide a unique key for each Button
                onPress={() => { buttonAction(action, value) }}
                color="$color10"
                title={"Description: " + action.description}
                flex={1}
            >
                {action.label ?? action.name}
            </Button>
        </XStack>);
}
const subsystem = ({ subsystem, deviceName }) => {
    const { client } = useMqttState();
    const eventGenerationFlag = false;

    const buttonAction = (action, value?) => {
        const sendValue = value != undefined ? value : action.payload.value
        if (action.connectionType == "mqtt") {
            console.log("MQTT Dev: ", action.payload)
            client.publish(getPeripheralTopic(deviceName, action.endpoint), action.payload.type == "json" ? JSON.stringify(sendValue) : sendValue.toString())
        }
    }

    // Map the actions to buttons and return them as JSX
    const actionButtons = subsystem.actions?.map((action, key) => {
        return <Action key={key} deviceName={deviceName} action={action} buttonAction={buttonAction} />
    });

    const monitorLabels = subsystem.monitors?.map((monitorData, key) => {
        return <Monitor key={key} deviceName={deviceName} monitorData={monitorData} subsystem={subsystem} />
    });

    return (
        <ContainerLarge position="relative" borderRadius="10px" mt="10px">
            <Tinted>
                <XStack alignItems="center" justifyContent="space-between">
                    <Paragraph textAlign='left' color={'$color10'}>{subsystem.name}</Paragraph>
                    {eventGenerationFlag?<Switch id={"pa"} size="$2" defaultChecked={subsystem.generateEvent}>
                        <Switch.Thumb animation="quick" />
                    </Switch>:null}
                </XStack>
                <YStack mb="10px" mt="10px" alignSelf='flex-start'>
                    {actionButtons?.length > 0 ? <XStack gap="$2" flexWrap='wrap' mt="10px" mb="10px">
                        {actionButtons}
                    </XStack> : null}
                    {monitorLabels?.length > 0 ? <XStack gap="$3" flexWrap='wrap' mt="10px" mb="10px">
                        {monitorLabels}
                    </XStack> : null}
                </YStack>
            </Tinted>
        </ContainerLarge>

    );
}

export default subsystem