export type getNotice = {
    no : number
    , title : string
    , content : string
    , writer : string
    , reg_date : string
}

export type putNotice = {
    no : number
    , title : string
    , content : string
}

export type NoticeReq = {
    searchType : string
    , searchKeyword : string
    , page : number
}