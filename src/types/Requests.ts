import {dataViewFormats, fileTypes, type_out} from "@/types/enums";

export interface IGetGroupsRequest {
    fileType: fileTypes,
    type_out: type_out,
    dataViewFormat: dataViewFormats
}