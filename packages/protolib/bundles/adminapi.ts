import { UsersAPI } from './users/usersAPI'
import { EventsAPI } from './events/eventsAPI'
import { GroupsAPI } from './groups/groupsAPI'
import { ObjectsAPI } from './objects/objectsAPI'
import { PagesAPI } from './pages/pagesAPI'
import { KeysAPI } from './keys/keysAPI'
import { APIsAPI } from './apis/api'
import { DevicesAPI } from './devices/devices/devicesAPI'
import { DeviceSdksAPI } from './devices/deviceSdks/deviceSdksAPI'
import { DeviceCoresAPI } from './devices/devicecores/devicecoresAPI'
import { DeviceBoardsAPI } from './devices/deviceBoards/deviceBoardsAPI'
import { DeviceDefinitionsAPI } from './devices/deviceDefinitions/deviceDefinitionsAPI'
import { DeviceMessageRouter } from './devices/router/api'
import { DatabasesAPI } from './databases/databasesAPI'
import { WorkspacesAPI } from './workspaces/workspacesAPI'
import { ResourcesAPI } from './resources/resourcesAPI'
import { AiAssistantsAPI } from './aiAssistants/aiAssistantsAPI';
import { MasksAPI } from './visualui/masksAPI';
import { SignalingAPI } from './signalings/signalingsAPI';
import { LogsAPI } from './logs/logsAPI'
import { ServicesAPI } from './services/servicesAPI'

export default (app, context) => {
  UsersAPI(app, context)
  GroupsAPI(app, context)
  EventsAPI(app, context)
  ObjectsAPI(app, context)
  KeysAPI(app, context)
  PagesAPI(app, context)
  APIsAPI(app, context)
  DevicesAPI(app, context)
  DeviceSdksAPI(app, context)
  DeviceCoresAPI(app, context)
  DeviceBoardsAPI(app, context)
  DeviceDefinitionsAPI(app, context)
  DeviceMessageRouter(app, context)
  DatabasesAPI(app, context)
  WorkspacesAPI(app, context)
  ResourcesAPI(app, context)
  AiAssistantsAPI(app, context)
  MasksAPI(app, context)
  SignalingAPI(app, context)
  LogsAPI(app, context),
  ServicesAPI(app, context)
}