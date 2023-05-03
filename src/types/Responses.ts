import {dataViewFormats, fileTypes} from "@/types/enums";

export interface IGetGroupsResponse {
    fileType: fileTypes,
    dataViewFormat: dataViewFormats,
    structure: string[],
}