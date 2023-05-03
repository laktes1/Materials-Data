import {dataViewFormats, fileTypes} from "@/types/enums";

export interface IGetGroupsRequest {
    fileType: fileTypes,
    dataViewFormat: dataViewFormats
}