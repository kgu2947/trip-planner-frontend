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

export type Join = {
    userId : string
    , userPassword : string
    , email : string
    , addr : string
}

export type login = {
    userId : string
    , userPassword : string
}