export interface CatResponse {
  //  id: number;
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;

  image?: string;
  fact?: string;
//   next_page_url?: string;
}
[];
export interface CatImageResponse {
  height: number;
  id: string;
  url: string;
  width: string;
}
[];

export interface GetFactsResponse {
  fact: string;
  length: number;
}
