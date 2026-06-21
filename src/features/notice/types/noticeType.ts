export type Notice = {
    no : number
    , title : string
    , writer : string
    , reg_date : string
}

export type NoticeReq = {
    searchType : string
    , searchKeyword : string
    , page : number
}