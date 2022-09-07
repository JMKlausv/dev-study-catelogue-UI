export interface Framework{
    id?:number;
    name:string;
    type:string;
    languageId?:number;
    language?:{id:number,name:string};

}