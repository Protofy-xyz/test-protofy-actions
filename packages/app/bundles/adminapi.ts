import {UsersAPI} from 'protolib/adminpanel/bundles/users/usersAPI'
import {EventsAPI} from 'protolib/adminpanel/bundles/events/eventsAPI'
import {GroupsAPI} from 'protolib/adminpanel/bundles/groups/groupsAPI'
import {ObjectsAPI} from 'protolib/adminpanel/bundles/objects/objectsAPI'
import {PagesAPI} from 'protolib/adminpanel/bundles/pages/pagesAPI'
import { DeviceCoresAPI } from 'protolib/adminpanel/bundles/devices/devicecores/devicecoresAPI'

export default (app) => {
    UsersAPI(app)
    GroupsAPI(app)
    EventsAPI(app)
    ObjectsAPI(app)
    PagesAPI(app)
    DeviceCoresAPI(app)
}