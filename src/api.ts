// Using native fetch API (available in Node 18+ and all modern browsers)
import { parseOptions } from './utils';
import { ErrorResponse } from './types'; 

export class Api {
	protected baseurl: string = 'https://api.themoviedb.org';
	protected accessToken: string="";
	protected language: string;
  constructor(private apikey: string,private url: string="",private lang: string="en-US") {
    this.accessToken = apikey;
    if(url&&url!=""){
      this.baseurl = url;
    }
    this.language = lang;
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async get<T>(path: string, options?: Record<string, any>): Promise<T> {
    if(options==null ){
      options={language:this.language};
    }
    else if(!Object.keys(options).includes("language")){
      options["language"] = this.language;
    }
    const params = parseOptions(options);
    const response = await fetch(`${this.baseurl}/3${path}?${params}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (!response.ok) {
      return Promise.reject((await response.json()) as ErrorResponse);
    }

    return (await response.json()) as T;
  }
}
